import lugiax from "@lugia/lugiax";
import { roleAuth, menu, getRoleById, roleMenu } from "@services/systemManage";
import { getUrlParams } from '@utils/urlFunction';
import { fromJS } from 'immutable';
import { go, goBack } from '@utils/cusRouter';
import { Modal, message } from '@lugia/lugia-web';
import { getMenuId } from '@utils';

let getMenu = (menus) => {
  return menus.map(item => {
    item.key = item.id;
    if (item.children && item.children.length > 0) {
      // 有子菜单
      getMenu(item.children);
    } else {
      delete item.children;
    }
    return item;
  });

};
const __LUGIAX_MODEL_DEFINE__ = "roleAuth";
// 给角色授予菜单
const state = {
  current: 1,
  pageSize: 10,
  total: 1000,
  table: [],
  columns: [
    {
      "key": "name",
      "title": "菜单名称",
      "dataIndex": "name",
      "width": 120,
      "align": "left",
      "showEllipsis": false
    },
    {
      "key": "id",
      "title": "菜单id",
      "dataIndex": "id",
      "width": 100,
      "align": "left",
      "showEllipsis": false
    },
    {
      "key": "path",
      "title": "路径",
      "dataIndex": "path",
      "width": 200,
      "align": "left",
      "showEllipsis": true
    },
    {
      "key": "type",
      "title": "菜单类型",
      "dataIndex": "type",
      "width": 100,
      "align": "left",
      "showEllipsis": true
    }
  ],
  totalText: "共计0条记录",
  selected: [],
  roleName: '', // 角色名称
  roleId: '' // 角色id
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      resetQuery(state) {
        return state;
      },
      add(state, param, { mutations }) {
        mutations.asyncSaveRecord(state);
        return state;
      },
      back(state) {
        goBack();
        return state;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        let [selectKeys = [], menus = []] = events;
        // selectKeys = [...new Set(getMenuId(menus, selectKeys))];
        return state.set("selected", selectKeys);
      }
    },
    async: {
      async deleteSelected(state) {
        const selected = state.get("selected").toJS();
        return state;
      },
      async onDelete(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        return state;
      },
      async onEdit(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        return state;
      },
      async query(state) {
        const { roleName, id } = getUrlParams(window.location.search);
        const newTotal = 100;
        const states = state;
        const param = {
          menuName: ''
        };
        let roleParam = {
          roleId: id
        };
        const data = await menu(param);
        let menuTree = data.data;
        let menus = getMenu(menuTree);

        const role = await getRoleById('GET', { id: id });
        const menuIds = [];
        const menuNames = [];
        if (role && role.data && role.data.list) {
          // 获取角色可以操作的菜单id
          role.data.list.forEach(e => {
            menuIds.push(e.roleId);
            menuNames.push(e.roleName);
          })
        }
        return states
          .set('table', fromJS(menus))
          .set('total', newTotal)
          .set('roleId', id)
          .set('roleName', decodeURI(roleName))
          .set("selected", menuIds);
      },
      async saveRecord(state) {
        let { roleName, selected } = state.toJS();
        let authParams = {
          menuIds: state.get('selected').join(','),
          roleId: state.get('roleId')
        };
        if (Array.isArray(selected) && selected.length === 0) {
          message.info('请先选择角色');
          return state;
        } else {
          Modal.confirm({
            title: '提示',
            content: `是否将选中的菜单授权于角色 ${decodeURIComponent(roleName)} 使用，是否确认？`,
            onOk: () => {
              // 授权
              roleAuth(authParams).then(data => {
                message.info(data.msg);
                goBack();
              });

            },
            okButtonProps: {
              type: 'danger'
            },
          });
          return state;
        }
      },
      async onChangePage(state, param) {
        const { events } = param;
        const [event] = events;
        const { current, pageSize, total } = event;
        state = state.set("current", current);
        state = state.set("pageSize", pageSize);
        state = state.set("selected", fromJS([]));
        return state;
      }
    }
  }
});
