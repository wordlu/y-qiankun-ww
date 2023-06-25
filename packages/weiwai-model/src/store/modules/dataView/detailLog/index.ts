import { defineStore } from 'pinia'
import { detailLogState } from '@services/types/dataShow/detailLog'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceTaskeLogControllerApi, ServiceDictControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const tasklog = FactoryApi.createAPIInstance(ServiceTaskeLogControllerApi)
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
export const renderFrom: any = [
  {
    type: "Input",
    label: "产品代码",
    key: "pfId",
    rowId: 1,
    span: 6,
  },
  {
    label: "业务日期:",
    key: "bizDate",
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  {
    label: "任务状态:",
    key: "state",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    multiple: false,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 6,
  },
  {
    type: "Input",
    label: "任务名称",
    key: "detailId",
    rowId: 1,
    span: 6,
  },
  {
    type: "Buttons",
    rowId: 2,
    children: [
      {
        label: "查询",
        btnShow: 82103,
        size: "small",
        btnType: "primary",
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("inquire", val.initData);
        },
      },
      {
        label: "重置",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          val.initData = initData(renderFrom)
          _this.$emit('reset')
        },
      },
    ],
  },
];

export const initData = (ary: any) => {
  const data: any = {};
  ary.forEach((element: any) => {
    if (!["Buttons", "Button"].includes(element.type)) {
      data[element.key] = element.initValue || "";
    }
  });
  return data;
};

export const formData: any = {
  initData: initData(renderFrom),
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom,
};

export const tableColumn: any = [
  { prop: "pfId", label: "产品代码", align: "center"},
  { prop: "detailId", label: "任务名称", align: "center"},
  { prop: "bizDate", label: "业务日期", align: "center"},
  { prop: "remarks", label: "校验信息", align: "center"},
  { prop: "stateName", label: "任务状态", align: "center"},
  { prop: "timeMark", label: "执行时间", align: "center"},
]


export const detailLogStore = defineStore('detailLog', {
  state: (): detailLogState => ({
    tableColumn: tableColumn,
    tableData: [],
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    formData: formData,
    loadingShow: false,
    formObject: {}
  }),
  actions: {
    async initForm(formData: any) {
      const result = await dict.dicAllByClassIdPost({ classId: 'LOG_STATE' })
      formData.renderFrom[2].options = result.data.data
      return formData
    },

    async inquire(val?: any) {
      this.loadingShow = true
      this.formObject = { ...val }
      const res = await tasklog.taskLogGetListPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })

      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },

    pageChange(val: any) {
      this.pageInfo.startPage = val
      this.inquire(this.formObject)
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire(this.formObject)
    },
    clear() {
      this.$reset()
    },

    reset(data: any) {
      this.clear()
      this.inquire()
    }
  }
})
