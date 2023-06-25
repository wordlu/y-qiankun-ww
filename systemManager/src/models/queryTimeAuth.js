import lugiax from '@lugia/lugiax';
import { fromJS } from 'immutable';
import { getPeriod, setPeriod } from "@services/systemManage";
import { getUrlParams } from '@utils/urlFunction';
import { message } from '@lugia/lugia-web';
import { dwFormValidate } from "@ysstech-data/validate-business";
import { go } from "@utils/cusRouter"
import dataAuthV2Model from "./dataAuthV2";
import _ from "lodash";

let roleIdTemp = ""
const __LUGIAX_MODEL_DEFINE__ = 'queryTimeAuth';
const state = {
  form: {
    value: {
      startTime: "",
      endTime: "",
    },
    validate: {
      startTime: { help: "" },
      endTime: { help: "" },
    },
    disabled: {}
  },
  columns: [
    {
      label: "起始日期：",
      id: "startTime",
      type: "datePicker",
      required: true,
      field: "form.value.startTime",
      validateField: "form.validate.startTime",
      validator: [{ type: "date", help: "请输入正确的日期时间!" }],
      props: {
      }
    },
    {
      label: "截止日期：",
      id: "endTime",
      type: "datePicker",
      required: true,
      field: "form.value.endTime",
      validateField: "form.validate.endTime",
      validator: [{ type: "date", help: "请输入正确的日期时间!" }],
      props: {}
    }

  ],
  validateRules: [
    {
      type: "date",
      validate(val) {
        return val ? /^\d{4}-\d{1,2}-\d{1,2}/.test(val) : true;
      }
    }
  ],
  button: [
    {
      title: "保存",
      eventsName: "asyncOnSubmit",
      type: "primary"
    },
    {
      title: "取消",
      eventsName: "onCancle",
    }
  ],
  changeField: "startTime",
  templateValue: {
    startTime: "",
    endTime: "",
  }
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      onBtnClick(state, param, { mutations }) {
        const { events: [{ eventsName }] } = param
        mutations[eventsName] && mutations[eventsName]()
      },
      onCancle(state, param) {
        go({ url: "/systemManage/roleManage" })
      },
      onFormItemChange(state, param, { mutations, getState }) {
        const { events: [{ col: { id }, event: { newValue } }] } = param;
        const { templateValue, form: { value } } = getState().toJS();
        dataAuthV2Model.mutations.initIsEdit(!_.isEqual(templateValue[id], newValue));
        return state.set("changeField", id)
      },
    },
    inTime: {
      async setFormValue(params, handle) {
        handle.updateModel(handle.getState().setIn(["form", "value"], fromJS(params)));
      }
    },
    async: {
      async init(state, param, { mutations, getState }) {
        const { roleId } = getUrlParams();
        roleIdTemp = roleId
        dataAuthV2Model.mutations.initIsEdit();
        const { status, data } = await getPeriod({ roleId });
        if (status == 200) {
          return getState().setIn(["form", "value"], fromJS(data)).set("templateValue", fromJS(data))
        }
      },
      async onSubmit(state, param, { mutations, getState }) {
        const result = await dwFormValidate({
          mutations,
          param: {
            columnPath: "columns",
            dataPath: "form.value"
          }
        });
        if (result) {
          const params = getState().getIn(["form", "value"]).toJS()
          const { startTime, endTime } = params;
          const changeField = getState().get("changeField")
          if (endTime < startTime) {
            return state.setIn(["form", "validate", changeField], fromJS({ validateStatus: "error", help: "截止时间不能大于开始时间！" }))
          }
          const { status } = await setPeriod(
            {
              ...params,
              roleId:roleIdTemp
            }
          )
          if (status !== 200) {
            message.info("保存失败")
          } else {
            dataAuthV2Model.mutations.initIsEdit();
            message.info("数据保存成功")
          }
        }
      }
    }
  }
});
