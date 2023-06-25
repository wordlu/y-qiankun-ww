import lugiax from "@lugia/lugiax";
import { message } from '@lugia/lugia-web';
import { goBack } from '@utils/cusRouter';
import { updateUserPassword } from '@services/systemManage';

const __LUGIAX_MODEL_DEFINE__ = "userManageInitPsd";
const state = {
  form: {
    confirmPassword: '', // 确认密码
    newpassword: '', // 新密码
    userId: '' // 用户id
  },
  initForm: {
    confirmPassword: '', // 确认密码
    newpassword: '', // 新密码
    userId: '' // 用户id
  },
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        state = state.set('form', state.get('initFrom'));
        // console.info("doReset", param);
        return state;
      }
    },
    async: {
      async getRecord(state, param) {
        // console.info("getRecord", param, param.id);
        return state
          .setIn(["form", "userId"], param.id)
          .setIn(["initFrom", "userId"], param.id);
      },
      async addRecord(state) {
        // console.info("addRecord");
        return state;
      },
      /**
       * 重置密码
       * @param {*} state 
       */
      async saveRecord(state) {
        let params = state.get('form').toJS();
        updateUserPassword(params).then(data => {
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
