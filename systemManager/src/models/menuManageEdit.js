import lugiax from '@lugia/lugiax';
import { getMenuById } from '@services/systemManage';
import { go, goBack } from '@utils/cusRouter';
import { message } from '@lugia/lugia-web';
import { fromJS } from 'immutable';
import { getUrlParams } from '@utils/urlFunction';
const __LUGIAX_MODEL_DEFINE__ = 'menuManageEdit';
const state = {
  form: {
    name: '',
    parentId: '',
    path: '',
    sort: 0,
    type: ''
  },
  initFrom: {
    name: '',
    parentId: '',
    path: '',
    sort: 0,
    type: ''
  },
  menuParams: {
    'createTime': '',
    'delFlag': '',
    'icon': '',
    'keepAlive': '',
    'menuId': 0,
    'name': '',
    'parentId': 0,
    'path': '',
    'permission': '',
    'sort': 0,
    'type': '',
    'updateTime': ''
  },
  typeOptions: [
    {
      value: '0',
      text: '菜单'
    },
    {
      value: '1',
      text: '按钮'
    }
  ],
  parentIdField: {
    displayField: 'text',
    valueField: 'value',
    translateTreeData: true
  },
  parentIdOptions: [
    {
      value: '-1',
      text: '-1'
    },
    {
      value: '-2',
      text: '-2'
    },
    {
      value: '1000',
      text: '权限管理'
    },
    {
      value: '2000',
      text: '系统管理'
    }
  ]
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        state = state.set('form', state.get('initFrom'));
        console.info("doReset", param);
        return state;
      },
      back(state) {
        goBack();
        return state;
      },
      onSelectParentId(state, param) {
        const { events } = param;
        const [ids = [], name, ] = events;
        const [ id ] = ids;
        // 获取到的parentId是字符串
        // console.log(id, Array.isArray(id));
        state = state.setIn(['form', 'parentId'], id);
        return state;
      }
    },
    async: {
      async getRecord(state, { id }, { getState }) {
        if (!id) return;
        let newState = getState();
        const { data } = await getMenuById('GET', { menuId: id });
        newState = newState
          .set('form', fromJS(data))
          .set('initFrom', fromJS(data));
        return newState;
      },
      async addRecord(state) {
        console.info('addRecord');
        return state;
      },
      async saveRecord(state, param, { getState }) {
        let newState = getState();
        let params = newState.get('form').toJS();
        let type = getUrlParams(window.location.search).state;
        // 获取到的parentId是数组？？
        for (const key in params) {
          if (params.hasOwnProperty(key) && key === 'parentId') {
            params[key] = params[key].join('');
          }
        }
        if (type === 'add') {
          getMenuById('POST', params).then(data => {
            message.info(data.msg);
            if (data.code === 200) {
              goBack();
            }
          });
        } else {
          getMenuById('PUT', params).then(data => {
            message.info(data.msg);
            if (data.code === 200) {
              goBack();
            }
          });
        }

        return state;
      }
    }
  }
});
