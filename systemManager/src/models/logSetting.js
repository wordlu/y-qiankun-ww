import lugiax from "@lugia/lugiax";
import { fromJS } from 'immutable';
import { message } from '@lugia/lugia-web';
import {getConfig,setConfig } from "@services/systemManage";

const __LUGIAX_MODEL_DEFINE__ = "logSetting";
const state = {
  form:{
    value: {
      log: "1",
    },
    data:{
      log:[
        { text: "开启", value: "1" },
        { text: "关闭", value: "0" }
      ]
    },
    validate: {
    },
    disabled: {}
  },
  columns:[
    {
      label: "日志记录：",
      id: "log",
      type: "radioGroup",
      required: true,
      field: "form.value.log",
      dataField: "form.data.log",
      validateField:"form.validate.log",
      props: {
      }
    }
  ],
  grid:[
    {
      col: [
        {
          id: "log",
          labelSpan: 8,
          areaSpan: 16,
          props: { span: 21, offset: 3 },
          themeConfig: {}
        },
      ],
      props: {
        gutter: [0, 20],
        type: "flex",
        justify: "start"
      }
    },
    
  ],
  button:[
    {
      title: "确定",
      eventsName: "asyncOnSubmit",
      type:"primary"
    },
    {
      title: "恢复默认",
      eventsName: "onCancle",
    }    
  ],
  breadcrumb:[
    {
      title:"系统管理"
    },{
      title:"系统设置"
    },{
      title:"登录设置"
    }
  ],
  logId:1,
  title:"日志记录设置"
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      onBtnClick(state,param,{mutations}){
        const {events:[{eventsName}]} = param
        mutations[eventsName] && mutations[eventsName]()
      },
      onCancle(state,param,{mutations}){
        mutations.asyncInit()
      }
    },
    async: {
      async init(state, param, { mutations,getState}) {
        const {data,status} = await getConfig()
        if(status == 200 && Array.isArray(data)){
          const {list,typeExplain = "日志记录设置"}  = data.find(item =>item.typeCode == "log")||{}
          if(list && Array.isArray(list)){
            const {value,id} = list.find(item => item.code == "record")|| {}
            return getState().setIn(["form","value","log"],value).set("logId",id).set("title",typeExplain)
          }
        }
      },
      async onSubmit(state, param, { mutations,getState }) {
        const id = getState().get("logId")
        const log = getState().getIn(["form","value","log"])
        const {status} = await setConfig({
          "list": [
            {
              id,
              "value": log
            }
          ]
        })
        if(status!==200){
          message.info("保存失败")
        }else{
          message.info("数据保存成功")
        }
      }
    }
  }
});
