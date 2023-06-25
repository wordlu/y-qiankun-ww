import { defineStore } from 'pinia'
import { stepDimensionState } from '@services/types/dataShow/stepDimension'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceSourceAnalysisStepControllerApi,ServiceMailControllerApi, ServiceDictControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const stepDimension = FactoryApi.createAPIInstance(ServiceSourceAnalysisStepControllerApi)
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const comApi = FactoryApi.createAPIInstance(ServiceMailControllerApi)
export const renderFrom: any = [
  {
    label: "任务开始日期:",
    key: "beginDate",
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  {
    label: "任务结束日期:",
    key: "endDate",
    type: "DatePicker",
    rowId: 1,
    span: 6,
  },
  {
    label: "机构:",
    key: "orgId",
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
    type: "Buttons",
    rowId: 2,
    children: [
      {
        label: "查询",
        btnShow: 82103,
        size: "small",
        btnType: "primary",
        onClick: (_: any, val: any, _this: any) => {
          let flag = true
          _this.$refs.myForm.validate((valid: any) => {
            if (!valid) {
              flag=false
            }
          })
          if (flag) {
          _this.$emit('inquire', val.initData)
          }
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
;

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
export const currentColumn: any = [
  { prop: "pfName", label: "流程步骤", width: '170'},
]

export const tableColumn: any = [
  { prop: "pfName", label: "流程步骤",  width: '170'},
]

export const tableColumn1: any = [

  { prop: "processNm", label: "策略专户", align: "center", width: '290' },
  { prop: "bizDate", label: "估值日期", align: "center"},
  { prop: "state", label: "处理状态", align: "center"},
]

export const tableColumn2: any = [
  { prop: "checkName", label: "校验项及日志", align: "center",width: '105' },
  { prop: "timeMark", label: "时间", align: "center", width: '181' },
  { prop: "remarks", label: "信息描述", multiLine: true },
]



export const stepDimensionStore = defineStore('stepDimension', {
  state: (): stepDimensionState => ({
    date: '',
    currentColumn: currentColumn,
    tableColumn: tableColumn,
    tableColumn1: tableColumn1,
    tableColumn2: tableColumn2,
    selectionData: [],
    tableData: [],
    currentData: [],
    tableData1: [],
    tableData2: [],
    loadingShow: false,
    loadingShow1: false,
    loadingShow2: false,
    tabActiveId: 'tr_jjhzgzb',
    tabList: [
      { value: '估值文件', name: 'tr_jjhzgzb' },
      { value: '净值文件', name: 'tr_virtl_net_value' },
      { value: '穿透报告', name: 'tr_penetrate_report' }
    ],
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    tabActiveId1: '',
    tabList1: [
      { value: '时效内未收到', name: '0' },
      { value: '锁表后收到', name: '1' }
    ],
    formData: formData,
    orgId: '',
    timeObject: {}
  }),
  actions: {
    async initForm(formData: any) {
      const result = await comApi.mailOrgListPost()
      formData.renderFrom[2].options = result.data.data
      return formData
    },

    trigger(val?: any) {
      this.orgId = val.orgId
    },

    async inquire(val?: any) {
      console.log(222);
      
      this.loadingShow = true
      this.tableData = []
      this.tableData1 = []
      this.tableData2 = []
      const res = await stepDimension.sourceAnalysis2SearchPost({
        wfType: this.tabActiveId,
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data[0].data
      if (res.data.data[0].day) {
        const days = res.data.data[0].day.reduce((prev, item) => {
          if (
            item === 'pfName' ||
            item === 'pfId' ||
            item === 'bizDate' ||
            item === 'endTime' ||
            item === 'agingRate' ||
            item === 'delayDay'
          )
            return prev
          prev.push({
            prop: item,
            label: item,
            tooltip: true,
            statusShow1: true,
            dict: [
              { code: '0', value: '未处理' },
              { code: '1', value: '处理中' },
              { code: '2', value: '异常' },
              { code: '3', value: '已完成' }
            ]
          })
          return prev
        }, [])

        this.tableColumn = [...this.currentColumn, ...days]
      } else {
        this.tableColumn = this.currentColumn
      }
      if (this.tableColumn.length == 2) {
        this.tableColumn.push({
          label: '操作',
          btnShow: true,
          width: 120,
          fixed: 'right'
        })
      }
      this.loadingShow = false
    },

    async handleCurrentChange(row, column) {
      this.loadingShow1 = true
      this.loadingShow2 = true
      const table1 = await stepDimension.sourceAnalysis2ProcessStatusPost({
        pfId: row.pfId,
        bizDate: column.label,
        wfType: this.tabActiveId,
        orgId: this.orgId
      })
      const table2 = await stepDimension.sourceAnalysis2DetailInfoPost({
        pfId: row.pfId,
        bizDate: column.label,
        wfType: this.tabActiveId
      })
      this.tableData1 = table1.data
      this.tableData2 = table2.data
      this.loadingShow1 = false
      this.loadingShow2 = false
    },

    async handleStatusCurrentChange(row, column) {
      this.loadingShow2 = true
      const table2 = await stepDimension.sourceAnalysis2DetailInfopfPost({
        pfId: row.pfId,
        bizDate: row.bizDate,
        wfId: row.wfId
      })
      this.tableData2 = table2.data
      this.loadingShow2 = false
    },

    handleSelectionChange(data: any) {
      this.selectionData = data
    },

    async execute(row) {
      const parmas = {
        data: this.selectionData,
        row: row
      }
      const res = await stepDimension.sourceAnalysis2ExcutePost(parmas)
      if (res.data.code == 'DM-A0001') {
        Message.success(res.data.message)
      }
    },

    selectable(value: any) {
      return !value.disabled
    },

    reset(data: any) {
      console.log(22222);
      
      this.inquire()
    },
    onStartDateChange(val: any) {
      this.timeObject[val.code] = val.name
    }
  }
})
