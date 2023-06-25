import lugiax from "@lugia/lugiax";
import { message } from '@lugia/lugia-web';
import { goBack } from '@utils/cusRouter';
import { updateClientSecret } from '@services/systemManage';

const __LUGIAX_MODEL_DEFINE__ = "clientManageInitCs";
const state = {
  form: {
    confirmPassword: '', // 确认秘钥
    newpassword: '', // 新秘钥
    clientId: '' // 用户id
  },
  initForm: {
    confirmPassword: '', // 确认秘钥
    newpassword: '', // 新秘钥
    clientId: '' // 用户id
  },
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        state = state.set('form', state.get('initFrom'));
        return state;
      }
    },
    async: {
      async getRecord(state, param) {
        const { initForm } = state.toJS()
        return state
          .setIn(["form", "confirmPassword"], initForm.confirmPassword)
          .setIn(["form", "newpassword"], initForm.newpassword)
          .setIn(["form", "clientId"], decodeURIComponent(param?.id))
          .setIn(["initFrom", "clientId"], decodeURIComponent(param?.id));
      },
      async addRecord(state) {
        return state;
      },
      /**
       * 设置秘钥
       * @param {*} state 
       */
      async saveRecord(state) {
        let params = state.get('form').toJS();
        updateClientSecret(params).then(data => {
          message.info(data.msg);
          if (data.code === 200) {
            goBack();
          }
        }).catch(err => {
          message.info(err.msg);
        });
        return state;
      }
    }
  }
});
