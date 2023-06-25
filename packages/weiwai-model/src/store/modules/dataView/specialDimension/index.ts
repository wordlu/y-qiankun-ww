import { defineStore } from 'pinia'
import { specialDimensionState } from '@services/types/dataShow/specialDimension'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceSourceAnalysisControllerApi,ServiceSourceAnalysisStepControllerApi, ServiceDictControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const specialDimension = FactoryApi.createAPIInstance(ServiceSourceAnalysisControllerApi)
const stepDimension = FactoryApi.createAPIInstance(ServiceSourceAnalysisStepControllerApi)
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
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
    label: "组合属性:",
    key: "code",
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
    label: "组合属性内容:",
    clearable: true,
    key: "value",
    rowId: 1,
    span: 6,
    placeholder: '请输入组合属性内容'
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
              flag = false
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
  { prop: "pfName", label: "策略专户",  width: '290' },
  { prop: "endTime", label: "截止时间", align: "center" },

]

export const tableColumn: any = [
 
  { prop: "pfName", label: "策略专户",  width: '290' },
  { prop: "bizDate", label: "截止时间", align: "center" },
]

export const tableColumn1: any = [
  { prop: "processNm", label: "流程步骤", align: "center", },
  { prop: "bizDate", label: "估值日期", align: "center" },
  { prop: "state", label: "处理状态", align: "center" },
  {
    label: '操作',btnShow: true, width: 120, fixed: 'right'
  },
]

export const tableColumn2: any = [
  { prop: "checkName", label: "校验项及日志", align: "center", width: '105' },
  { prop: "timeMark", label: "时间", align: "center", width: '181' },
  { prop: "remarks", label: "信息描述",  multiLine: true},
]



export const specialDimensionStore = defineStore('specialDimension', {
  state: (): specialDimensionState => ({
    date: '',
    currentColumn: currentColumn,
    tableColumn: tableColumn,
    tableColumn1: tableColumn1,
    tableColumn2: tableColumn2,
    loadingShow: false,
    loadingShow1: false,
    loadingShow2: false,
    tableData: [],
    currentData: [],
    tableData1: [],
    tableData2: [],
    tabActiveId: 'tr_jjhzgzb',
    selectionData: [],
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
    timeObject: {}
  }),
  actions: {
    async initForm(formData: any) {
      const result = await dict.dicAllByClassIdPost({ classId: '90011' })
      formData.renderFrom[2].options = result.data.data
      return formData
    },

    async inquire(val?: any) {
      this.loadingShow = true
      this.tableData = []
      this.tableData1 = []
      this.tableData2 = []
      const res = await specialDimension.sourceAnalysisSearchPost({
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
      this.loadingShow = false
    },

    async handleCurrentChange(row, column) {
      this.loadingShow1 = true
      this.loadingShow2 = true
      const table1 = await specialDimension.sourceAnalysisProcessStatusPost({
        pfId: row.pfId,
        bizDate: column.label,
        wfType: this.tabActiveId
      })
      const table2 = await specialDimension.sourceAnalysisDetailInfoPost({
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

    async execute(row: any) {
      const parmas = {
        data: this.selectionData,
        row: row
      }
      const res = await specialDimension.sourceAnalysis2Excute2Post(parmas)
      if (res.data.code == 'DM-A0001') {
        Message.success(res.data.message)
      }
    },

    async confirm(row: any) {
      const res = await specialDimension.sourceAnalysisConfirmPost(row)
      if (res.data.code == 'DM-A0001') {
        Message.success(res.data.message)
      }
    },

    reset(data: any) {
      this.inquire()
    },
    onStartDateChange(val:any){
    this.timeObject[val.code]=val.name      
    }
  }
})
