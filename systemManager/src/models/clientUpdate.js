import lugiax from "@lugia/lugiax";
import CM from './clientManage';
import { fromJS } from 'immutable';
import { message } from '@lugia/lugia-web';
import { go, goBack } from '@utils/cusRouter';
import { clientInsert, clientEdit, clientGetGrantType, clientViewDetail } from '@services/systemManage';
import { getUrlParams } from '@utils/urlFunction';
const __LUGIAX_MODEL_DEFINE__ = "clientUpdate";
const state = {
  form: {
    accessTokenValidity: 7200,
    additionalInformation: '', // 备注
    authorities: '',
    authorizedGrantTypes: ['refresh_token'], // 初始化授权类型
    autoapprove: '',
    clientId: '', // 终端id
    clientSecret: '', // 秘钥
    refreshTokenValidity: 72000,
    resourceIds: '',
    scope: 'all', // 授权范围
    webServerRedirectUri: '' // 回调地址 授权码模式时，必填
  },
  initForm: {
    accessTokenValidity: 7200,
    additionalInformation: '',
    authorities: '',
    authorizedGrantTypes: ['refresh_token'],
    autoapprove: '',
    clientId: '',
    clientSecret: '',
    refreshTokenValidity: 72000,
    resourceIds: '',
    scope: 'all',
    webServerRedirectUri: ''
  },
  grantTypes: [], // 授权类型
  callBackDisabled: true,  // 控制回调地址的修改与否
  clientSecretState: false, // 控制秘钥修改与否
  clientIdState: false, // 控制终端code修改与否
  grantTypesOption: {
    mutliple: true
  }
};
export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      doReset(state, param) {
        let states = state;
        states = states.set('form', state.get('initForm'));
        return states;
      },
      onSelectGrantTypes(state, param) {
        const { events } = param;
        const [item = {}] = events;
        // newValue
        state = state.setIn(['form', 'authorizedGrantTypes'], item.newValue);
        // 只有选择“授权码模式(authorization_code)”时"回调地址"可以输入，其它情况都是disable
        state = JSON.stringify(item.newValue).indexOf('authorization_code') !== -1 ? state.set('callBackDisabled', false) : state.set('callBackDisabled', true).setIn(['form', 'webServerRedirectUri'], '');
        return state;
      },
      back(state) {
        // go({url:'/systemManage/clientManage'});
        goBack();
      },
      reset(state) {
        const { form, initForm } = state.toJS();
        let resetForm = {
          accessTokenValidity: 7200,
          additionalInformation: '', // 备注
          authorities: '',
          authorizedGrantTypes: ['refresh_token'], // 初始化授权类型
          autoapprove: '',
          clientId: '', // 终端id
          clientSecret: '', // 秘钥
          refreshTokenValidity: 72000,
          resourceIds: '',
          scope: 'all', // 授权范围
          webServerRedirectUri: '' // 回调地址 授权码模式时，必填
        };
        return state.set('form', fromJS(resetForm)).set('initForm', fromJS(resetForm))
          .set('callBackDisabled', false).set('clientSecretState', false).set('clientIdState', false);
      }
    },
    async: {
      async getRecord(state) {
        const { form } = state.toJS();
        const grantType = await clientGetGrantType();
        const grantTypeData = grantType.data;
        const {  id } = getUrlParams(window.location.search);
        let typeList = [];
        for (const key in grantTypeData) {
          if (grantTypeData.hasOwnProperty(key)) {
            const value = grantTypeData[key];
            typeList.push({ value: key, text: value });
          }
        }
        let clientIdState = false; // 控制终端code修改与否
        if (id) {
          clientIdState = true; // 终端code不能修改
          const { data } = await clientViewDetail({ clientId: decodeURI(id) });
          // 接口返回是数组，应该是对象，要改
          let detail = data;
          if (detail) {
            detail.authorizedGrantTypes = detail.authorizedGrantTypes.split(',');
            state = JSON.stringify(detail.authorizedGrantTypes).indexOf('authorization_code') !== -1 ? state.set('callBackDisabled', false) : state.set('callBackDisabled', true).setIn(['form', 'webServerRedirectUri'], '');
          }
          state = state.set('form', fromJS(detail))
            .set('initForm', fromJS(detail))
            .set('clientSecretState', true)
            .set('clientIdState', clientIdState);
        }
        return state.set('grantTypes', typeList);
      },
      async addRecord(state) {
        console.info("addRecord");
        return state;
      },
      async saveRecord(state, param) {
        let flag = getUrlParams(window.location.search).state;
        let params = state.get('form').toJS();
        if (Array.isArray(params.authorizedGrantTypes)) {
          params.authorizedGrantTypes = params.authorizedGrantTypes.join(',');
        }
        console.log(params);
        if (flag === 'add') {
          // 新增
          clientInsert(params).then(data => {
            message.info(data.msg);
            if (data.code === 200) {
              go({ url: '/systemManage/clientManage' });
            }
          }).catch(err => {
            message.info(err.msg);
          });
        } else {
          // 编辑
          clientEdit(params).then(data => {
            message.info(data.msg);
            if (data.code === 200) {
              go({ url: '/systemManage/clientManage' });
            }
          }).catch(err => {
            alert(err.msg);
            message.info(err.msg);
          });
        }
        return state;
      }
    }
  }
});
