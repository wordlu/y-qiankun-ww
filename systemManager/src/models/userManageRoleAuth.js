import lugiax from "@lugia/lugiax";
import { fromJS } from "immutable";
import { go, goBack } from '@utils/cusRouter';
import { getUrlParams } from '@utils/urlFunction';
import { rolePageList, userMenu, getUserById } from "@services/systemManage";
import { Modal, message } from '@lugia/lugia-web';
import { pageSizeOption, dataAuthOption } from "../enums/common";

const __LUGIAX_MODEL_DEFINE__ = "userManageRoleAuth";
// 用户授予角色
const state = {
  current: 1,
  pageSize: 10,
  total: 1000,
  table: [
    {
      createTime: '',
      delFlag: '',
      roleCode: '',
      roleDesc: '',
      roleId: 1,
      roleName: '',
      updateTime: ''
    }
  ],
  columns: [
    {
      "key": "roleCode",
      "title": "角色code",
      "dataIndex": "roleCode",
      "width": 100,
      "align": "left",
      "showEllipsis": false
    },
    {
      "key": "roleName",
      "title": "角色名称",
      "dataIndex": "roleName",
      "width": 120,
      "align": "left",
      "showEllipsis": false
    },
    {
      "key": "roleType",
      "title": "角色类型",
      "dataIndex": "roleType",
      "width": 80,
      "align": "left",
      "showEllipsis": true
    },
    {
      "key": "roleDesc",
      "title": "角色描述",
      "dataIndex": "roleDesc",
      "width": 200,
      "align": "left",
      "showEllipsis": true
    },
  ],
  totalText: "共计0条记录",
  selected: [],
  username: '',
  roleName: '', // 查询参数--角色名称
  roleType: '', // 查询参数--角色类型
  dataAuthOption, // 角色类型
  selectedRole: '',
  operation: [],
  storedRoleList: [], // 角色列表
  pagination: {
    total: 10,
    pageNum: 1,
    pageSize: 15
  },
  pageSizeOption
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      resetQuery(state) {
        state = state.set('roleName', '')
          .set('roleType', '')
        return state;
      },
      add(state) {
        return state;
      },
      onSelected(state, param) {
        const { events = [] } = param;
        const [seleckKeys = [], roles = []] = events;
        let storedRoleList = state.get('storedRoleList');
        let selectedList = [];
        // roles.forEach(element => {
        //   selectedList.push(element.roleName);
        // });
        seleckKeys.forEach(item => {
          storedRoleList.forEach(roleItem => {
            if (roleItem.roleId === item) {
              selectedList.push(roleItem.roleName);
            }
          })
        })
        return state.set("selected", seleckKeys)
          .set("selectedRole", selectedList.join(','))
      }
    },
    async: {
      async getRecord(state) {
      },
      async deleteSelected(state) {
        const selected = state.get("selected").toJS();
        console.info("删除", selected);
        return state;
      },
      async onDelete(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        console.info("删除", key);
        return state;
      },
      async onEdit(state, param) {
        const { id } = getUrlParams(window.location.search);
        const selected = state.get('selected');
        let roleIds = [];
        selected.forEach(item => {
          roleIds.push(item.roleId);
        });
        let params = {
          roleIds: roleIds.join(','),
          userId: id
        };
        await userMenu(params);
        console.info("授权", params);
        return state;
      },
      async onView(state, param) {
        const { events = [] } = param;
        const [text, record] = events;
        const { key } = record;
        console.info("查看", key);
        return state;
      },
      async query(state, param, { mutations, getState }) {
        let newState = getState();
        const { pageNum } = param;
        newState = newState.setIn(["pagination", "pageNum"], pageNum ? pageNum : 1);
        newState = await mutations.asyncQueryData(newState);
      },
      async cancel(state) {
        go({ 'url': '/systemManage/userManage' });
        return state;
      },
      async auth(state) {
        const { id } = getUrlParams(window.location.search);
        const selected = state.get('selected');
        const selectedRole = state.get('selectedRole');
        const username = state.get('username');
        if (selected && selected.length === 0) {
          message.info('请先选择角色');
          return state;
        }
        let params = {
          roleIds: selected.join(','),
          userId: id
        };
        Modal.confirm({
          title: '提示',
          content: `是否将角色${selectedRole}授权于${decodeURIComponent(username)}使用，是否确认？`,
          onOk: () => {
            // 授权
            userMenu(params).then(data => {
              message.info(data.msg);
              console.info("授权", params);
              goBack();
            });

          },
          okButtonProps: {
            type: 'danger'
          },
        });

        return state;
      },
      async queryData(state, newState) {
        const { username, id } = getUrlParams(window.location.search)
        const roles = newState.get('selectedRole');
        const { pageSize, pageNum, total } = newState.get('pagination').toJS()
        const { roleName, roleType } = state.toJS();
        const params = {
          roleName: roleName.replace(/\s*/g, '') || '',
          roleType,
          pageNum,
          pageSize,
        }
        const storedRoleList = newState.get("storedRoleList");
        const { data } = await rolePageList(params);
        let table = data.rows;
        newState = newState.set('table', fromJS(table.map(item => {
          item.roleType = item.roleType === 0 ? "功能权限" : "数据权限";
          item.key = item.roleId;
          storedRoleList.push({ roleId: item.roleId, roleName: item.roleName, roleType: item.roleType }); // 初始化存储用户列表
          return item;
        }))).set('username', username)
          .set("selectedRole", roles);
        const user = await getUserById({ id: id });
        const roleIds = [];
        const roleNames = [];
        if (user && user.data) {
          if (user.data.roleList && user.data.roleList.length > 0) {
            user.data.roleList.forEach(i => {
              roleIds.push(i.roleId);
              roleNames.push(i.roleName);
            })
          }
          // 更新存储的用户列表
          let newStoredRoleList = []; // 盛放去重后数据的新数组
          for (let item1 of storedRoleList) {  // 循环json数组对象的内容
            let flag = true;  // 建立标记，判断数据是否重复，true为不重复
            for (let item2 of newStoredRoleList) {  // 循环新数组的内容
              if (item1.roleId == item2.roleId) { // 让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
                flag = false;
              }
            }
            if (flag) { // 判断是否重复
              newStoredRoleList.push(item1); // 不重复的放入新数组。  新数组的内容会继续进行上边的循环。
            }
          }
          return newState.set("storedRoleList", newStoredRoleList)
            .set("selected", roleIds)
            .setIn(["pagination", "total"], data.total)
            .set("selectedRole", roleNames.join(','))
            .set("storedRoleList", storedRoleList)
        }
      },
      // 分页
      async onShowSizeChange(state, param, { mutations, getState }) {
        let newState = getState();
        const { events: [pageNum, pageSize] } = param;
        newState = newState.setIn(["pagination", "pageNum"], 1).setIn(["pagination", "pageSize"], pageSize);
        newState = await mutations.asyncQueryData(newState);
        return newState;
      },
      //点击分页触发 
      async onChangePage(state, param, { mutations, getState }) {
        let newState = getState();
        const { events: [paginationInfo] } = param;
        const { current, pageSize, total } = paginationInfo;
        if (current) {
          newState = newState
            .setIn(["pagination", "pageSize"], pageSize)
            .setIn(["pagination", "pageNum"], current)
          newState = await mutations.asyncQueryData(newState);
        }
        return newState;
      }
    }
  }
});
