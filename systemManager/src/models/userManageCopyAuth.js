import lugiax from '@lugia/lugiax';
import { message } from '@lugia/lugia-web';
import { go, goBack } from '@utils/cusRouter';
import { getUrlParams } from '@utils/urlFunction';
const __LUGIAX_MODEL_DEFINE__ = 'userManageCopyAuth';
const state = {
  dict: [
    {
      'id': '164bd999e2934fec8da7f8ddb13106ae',
      'userName': 'admin_admin'
    },
    {
      'id': 'f4e4b5123d6c4b65a3f137e80f2f159f',
      'userName': 'role_role'
    },
    {
      'id': '32d3a2bfa1d848618b60094307bed255',
      'userName': 'test_test'
    }
  ],
  form: {
    fromUser: '',
    toUser: '',
    authType: ''
  },
  initForm: {
    fromUser: '',
    toUser: '',
    authType: ''
  },
  userList: [
    // {
    //   value: '164bd999e2934fec8da7f8ddb13106ae',
    //   text: 'admin_admin'
    // },
    // {
    //   value: 'f4e4b5123d6c4b65a3f137e80f2f159f',
    //   text: 'role_role'
    // },
    // {
    //   value: '32d3a2bfa1d848618b60094307bed255',
    //   text: 'test_test'
    // }
  ],
  roleType: [
    {
      value: '1',
      text: '功能角色'
    }
  ],
  urlParams: {
    id: '',
    username: ''
  }
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        return state.set('form', state.get('initForm'));
      },
      goBack() {
        goBack();
      }
    },
    async: {
      async getRecord(state, param) {
        const { username, id } = getUrlParams(window.location.search);
        let dict = state.get('dict');
        let ul = [];
        dict.forEach((element) => {
          let e = element.toJS();
          ul.push({
            value: e.id,
            text: e.userName
          })
        });
        console.info(username);
        return state.set('userList', ul).setIn(['urlParams', 'id'], id).setIn(['urlParams', 'username'], username);
      },
      async addRecord(state) {
        console.info('addRecord');
        return state;
      },
      async saveRecord(state) {
        // 复制
        message['success']('复制成功', 2);
        goBack();
        console.info('saveRecord');
        return state;
      }
    }
  }
});
