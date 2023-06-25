import lugiax from "@lugia/lugiax";
import { fromJS } from "immutable";
import {timeRange,subtractTime,pageSizeOptions,assignDateValidate,getStartYearDate} from "../utils"
import FormColumnUtils from "@/utils/models/column"
import AssignDate from "../components/AssignDate"
import Buttons from "../components/Buttons"
import {getOperateLog } from "@services/systemManage";

const __LUGIAX_MODEL_DEFINE__ = "operationLog";
const state = {
  type2Component: {
    assignDate: AssignDate,
    buttons: Buttons
  },
  form:{
    value: {
      assignDate: "",
      userName:"",
      operatingEvent:"",
      state:"-1"
    },
    data: {
      assignDate: timeRange,
      userName:"",
      operatingEvent:"",
      state:[
        { value: "-1", text: "全部" },
        { value: "0", text: "成功" },
        { value: "1", text: "失败" }
      ]
    },
    validate: {},
    disabled: {}
  },
  columns:[
    {
      label: "",
      id: "assignDate",
      type: "assignDate",
      required: false,
      field: "form.value.assignDate",
      validateField:"form.validate.assignDate",
      props: {
        type: "ssf",
        selectData: timeRange,
        valueField: "value",
        displayField: "text",
        selectValue: "assignDate",
        rangePickerValue: [getStartYearDate(), subtractTime("0", "days")],
        disabledDatePicker: false
      }
    },
    {
      label: "用户名：",
      id: "userName",
      type: "input",
      required: false,
      field: "form.value.userName",
      props: {}
    },
    {
      label: "操作事件：",
      id: "operatingEvent",
      type: "input",
      required: false,
      field: "form.value.operatingEvent",
      props: {}
    },
    {
      label: "状态：",
      id: "state",
      type: "select",
      required: false,
      dataField: "form.data.state",
      field: "form.value.state",
      props: {
        canClear: false,
      }
    },
    {
      id: "seat",
      type: "",
      label: "",
      field: "",
      dataField: "",
      required: false,
      props: {}
    },
    {
      id: "buttons",
      type: "buttons",
      label: "",
      field: "",
      dataField: "",
      required: false,
      props: {
        justifyContent: "flex-end",
        data: [
          {
            title: "查询",
            eventsName: "asyncOnSearch",
            type: "primary"
          },
          {
            title: "重置",
            eventsName: "onClear"
          }
        ],
        onHandle: [
          {
            eventsName: "onClick",
            mutations: "formOnHandle"
          }
        ]
      }
    }
  ],
  grid:[
    {
      col: [
        {
          id: "assignDate",
          labelSpan: 0,
          areaSpan: 24,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "userName",
          labelSpan: 6,
          areaSpan: 18,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "operatingEvent",
          labelSpan: 6,
          areaSpan: 18,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "state",
          labelSpan: 6,
          areaSpan: 18,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },

        {
          id: "seat",
          labelSpan: 24,
          areaSpan: 0,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "seat",
          labelSpan: 24,
          areaSpan: 0,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "seat",
          labelSpan: 24,
          areaSpan: 0,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        },
        {
          id: "buttons",
          labelSpan: 0,
          areaSpan: 24,
          props: { span: 5.7, offset: 0.3 },
          themeConfig: {}
        }
      ],
      props: {
        gutter: [0, 20],
        type: "flex",
        justify: "start"
      }
    },
    
  ],
  table:{
    columns:[
      {
        title: "操作时间",
        dataIndex: "operateTime",
        fontSize: 14,
        key: "operateTime",
        align: "center",
        ellipsis: true,
        style: {
          background: '#F3F5F7'
        },
      },
      {
        title: "用户名",
        dataIndex: "userName",
        fontSize: 14,
        key: "userName",
        align: "center",
        ellipsis: true,
        
      },
      {
        title: "登录账号",
        dataIndex: "loginName",
        fontSize: 14,
        key: "loginName",
        align: "center",
        ellipsis: true,
      },
      {
        title: "登录IP",
        dataIndex: "ip",
        fontSize: 14,
        key: "ip",
        align: "center",
        ellipsis: true,
      },{
        title: "角色",
        dataIndex: "roleName",
        titleAlign: "center",
        fontSize: 14,
        key: "roleName",
        align: "center",
        ellipsis: true,
      },{
        title: "操作模块",
        dataIndex: "operatingModule",
        titleAlign: "center",
        fontSize: 14,
        key: "operatingModule",
        align: "center",
        ellipsis: true,
      },{
        title: "操作事件",
        dataIndex: "operatingEvent",
        titleAlign: "center",
        fontSize: 14,
        key: "operatingEvent",
        align: "center",
        ellipsis: true,
      },{
        title: "详细信息",
        dataIndex: "information",
        titleAlign: "center",
        fontSize: 14,
        key: "information",
        align: "center",
        ellipsis: true,
      },{
        title: "状态",
        dataIndex: "displayState",
        titleAlign: "center",
        fontSize: 14,
        key: "displayState",
        align: "center",
        ellipsis: true,
        renderTextColor:{
          isRender: true,
          rule: [
            {
              reg: /成功/,
              color: "#3DBF64"
            },
            {
              reg: /失败/,
              color: "#D43838"
            }
          ]
        }
      }
    ],
    total:0,
    list:[],
    pageNum:1,
    pageSize:10,
    scroll:{
    },
    size:"smallest",
    tableHeaderTheme:{
      height: 32,
      background: {
        color: "#f3f5f7"
      },
      font: {
        color: "rgba(60, 68, 85, 0.75)",
        size: 14,
        weight: 400
      }
    },
    pageSizeOptions
  },
  breadcrumb:[{
    title:"系统管理"
  },{
    title:"日志管理"
  },{
    title:"操作日志"
  }]
};

const model = lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      onPageNumChange(state,params,{mutations}) {
        const {events:[{current,pageSize}]} = params

        mutations.asyncOnSearch({pageNum:current,pageSize})

      },
      onClear(state,params,{mutations,getState}){
        return state.setIn(["form","value"],fromJS({
          assignDate: "",
          userName:"",
          operatingEvent:"",
          state:"-1"
        })).setIn(["form","validate"],fromJS({}))
      },
      formOnHandle(state, params, { mutations, getState }) {
        const { events: [{ eventsName }] } = params;

        mutations[eventsName] && mutations[eventsName]()
      },
      setState(state,params){
        return params;
      }
    },
    async: {
      async init(state,params,{mutations,getState}){
        const column = state.get("columns").toJS()
        const { column: columnResult } = FormColumnUtils(model, { column })
        await mutations.asyncOnSearch()
        return getState().set("columns",fromJS(columnResult))
      },

      async onSearch(state,params,{mutations,getState}){
        const {assignDate:{rangePickerValue},operatingEvent,state:myState,userName}= state.getIn(["form","value"]).toJS()
        const result = assignDateValidate(rangePickerValue || [getStartYearDate(), subtractTime("0", "days")])
        
        mutations.setState(
          state.setIn(["form", "validate", "assignDate"], fromJS(result))
        )
        
        if (result.validateStatus === "error") {
          return getState();
        }
        const [beginDate, endDate] = rangePickerValue|| [getStartYearDate(), subtractTime("0", "days")];
        const {pageNum,pageSize} = params || {pageNum:1,pageSize:getState().getIn(["table","pageSize"])};
        const {status,data} = await getOperateLog({
          endTime: endDate,
          operatingEvent,
          pageNum,
          pageSize,
          startTime: beginDate,
          state: myState=="-1"?"":myState,
          userName
        });

        if(status == 200){
          const {list,total} = data
          if(list && Array.isArray(list)){
            list.forEach(item=>{
              const {state,stateDesc} = item
              item.displayState = state==0?"成功":`失败（${stateDesc}）`
            })
          }
          return getState().setIn(["table","list"],fromJS(list||[]))
          .setIn(["table","total"],total)
          .setIn(["table","pageNum"],pageNum)
          .setIn(["table","pageSize"],pageSize)
        }

      }
    }
  }
});

export default model