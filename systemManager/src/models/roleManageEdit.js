import lugiax from "@lugia/lugiax";
import { go, goBack } from '@utils/cusRouter';
import { message } from '@lugia/lugia-web';
import { fromJS } from 'immutable';
import { getUrlParams } from '@utils/urlFunction';
import RM from "./roleManage";
import { addRole, getRoleById, menu } from "@services/systemManage";
import {   dataAuthOption } from "../enums/common";
import Validator from "@ysstech-data/data-web/dist/form/validator";
import { changeValidateStatus, createValidateForm } from "@ysstech-data/data-web/dist/form/utils";
import { getDynamicField } from "@ysstech-data/data-web/dist/utils";
const globalValidator = new Validator();
const validateForm = createValidateForm(globalValidator);
globalValidator.registerValidate([
  {
    type: "validateRoleCode",
    validate(val) {
      return val ? (/^[0-9a-zA-Z_]{1,50}$/.test(val)) : true;
    }
  }
]);
const __LUGIAX_MODEL_DEFINE__ = "roleManageEdit";
const state = {
  columns: [
    {
      "required": true,
      "type": "input",
      "label": "角色编码",
      "id": "roleCode",
      "field": "form.value.roleCode",
      "validateField": "form.validate.roleCode",
      "validator": [{ type: "validateRoleCode", help: "格式错误，仅支持长度不超过50的数字、字母、下划线组合" }]
    },
    {
      "required": true,
      "type": "input",
      "label": "角色名称",
      "id": "roleName",
      "field": "form.value.roleName",
      "validateField": "form.validate.roleName"
    },
    {
      "required": true,
      "type": "select",
      "label": "角色类型",
      "id": "roleType",
      "field": "form.value.roleType",
      "validateField": "form.validate.roleType",
      "dataField": "form.data.roleType",
    },
    {
      "type": "input",
      "label": "角色描述",
      "id": "roleDesc",
      "field": "form.value.roleDesc",
      "validateField": "form.validate.roleDesc"
    },

  ],
  form: {
    value: {
      roleId: Number(''),
      roleCode: '',
      roleDesc: '',
      roleName: '',
      roleType:'',
    },
    valueBack: {},
    data: {
      roleType:dataAuthOption
    },
    validate: {}
  },
  routes : [
    {
      "title": "系统管理"
    },
    {
      "title": "角色管理"
    },
     {
       "title": "角色管理编辑"
     }
   ],
  preData:{},
};
let model;
model = lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      closePage(state, param, { mutations, getState }) {
        const newState = getState();
        const formValidateField = getDynamicField("form.validate");
        const formValueField = getDynamicField('form.value');
        return newState.setIn(formValueField, fromJS({}))
          .setIn(formValidateField, fromJS({}))
      },
      doReset(state, param, { mutations, getState }) {
        const preData = state.get('preData');
        const formValueBack = getDynamicField("form.valueBack");
        const formValueField = getDynamicField('form.value');
        const type = getUrlParams(window.location.search).state
        if(type === 'add'){
          state = state.setIn(formValueField, formValueBack);
        }else{
          state = state.setIn(formValueField, fromJS(preData))
        }
        return state;
      },
      doCancel(){
        goBack();
      },
      changeValidateStatus,
    },
    async: {
      async getRecord(state, { id }, { getState, mutations }) {
        

        const { state: pageState } = getUrlParams();
        if(pageState === 'add'){
          const formValueField = getDynamicField('form.value');
          state = state.setIn(formValueField, fromJS({}));
          return state;
        }
        let states = state;
        try {
          if (!id) return;
          let rowData = RM.getState().get('table').toJS().find(item => item.roleId == id);
          if (rowData) {
            const formValue = {
              ...rowData,
            }
            const formValueField = getDynamicField('form.value');
            const valueBackField = getDynamicField("form.valueBack");
            states = state
              .setIn(formValueField,fromJS(formValue))
              .set(valueBackField, fromJS(formValue))
              .set('preData', fromJS(formValue))
          }
          
          return states;
        } catch (e) {
          console.error(e);
          return states
        }
      },
      async addRecord(state) {
        console.info("addRecord");
        let flag = getUrlParams(window.location.search).state;
        console.info("saveRecord", flag, state.get('form').toJS(), flag);
        let params = state.getIn('value').toJS();
        params['key'] = undefined;
        addRole('PUT', params).then(data => {
          message.info(data.msg,2);
          goBack();
        });
        return state;
      },
      async saveRecord(state) {
        let flag = getUrlParams(window.location.search).state;
        let params = state.get('form').toJS();
        let formValue = state.get('form').toJS();
       
        if (flag === 'add') {
          // 新增
          addRole('POST', params.value).then(data => {
            if (data.status === 200) {
              message.info(data.message,2);
              goBack();
            }else{
              message.info(data.message,2);
            }
          });
        } else {
          // 编辑
          const { roleType } = params.value;
          switch(roleType){
          case '功能权限' :
            params.value.roleType = 0;
            break;
          case '数据权限' :
            params.value.roleType = 1;
            break;
          defualt:
            break;
          }
        
          addRole('PUT', params.value).then(data => {
            if (data.status === 200) {
              message.info(data.message,2);
              goBack();
            }else{
              message.info(data.message,2);
            }
          });
        }
        return state;
      }
    }
  }
});


model.validateForm = async (param) => {
  const {
    mutations: { changeValidateStatus }
  } = model;

  validateForm(param, changeValidateStatus);
};
export default model;