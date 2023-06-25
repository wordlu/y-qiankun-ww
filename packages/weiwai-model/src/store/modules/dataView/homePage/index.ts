import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { homePageState } from '@services/types/dataShow/homepage'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceNetWorthControllerApi, ServiceBatchProcessingControllerApi } from '@services/weiwai'
const netWorth = FactoryApi.createAPIInstance(ServiceNetWorthControllerApi)
const homepage = FactoryApi.createAPIInstance(ServiceBatchProcessingControllerApi)
export const renderFrom: any = [
  {
    type: 'Input',
    key: 'remarks',
    clearable: true,
    rowId: 1,
    span: 6,
    placeholder: '详情模糊查询'
  },
  {
    type: 'Buttons',
    rowId: 2,
    span: 16,
    children: [
      {
        label: '查询',
        btnShow: 82103,
        size: 'small',
        btnType: 'primary',
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit('inquire', val.initData)
        }
      },
      {
        label: '重置',
        size: 'small',
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          val.initData = initData(renderFrom)
          _this.$emit('reset')
        }
      }
    ]
  }
]

export const initData = (ary: any) => {
  const data: any = {}
  ary.forEach((element: any) => {
    if (!['Buttons', 'Button'].includes(element.type)) {
      data[element.key] = element.initValue || ''
    }
  })
  return data
}

export const formData: any = {
  initData: initData(renderFrom),
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom
}

export const tableColumn: any = [
  { prop: 'orgName', label: '机构名称', tooltip: true },
  { prop: 'pfName', label: '产品名称', tooltip: true },
  { prop: 'pfId', label: '产品代码', tooltip: true },
  { prop: 'bizDate', label: '业务日期', tooltip: true },
  { prop: 'state', label: '处理状态', tooltip: true },
  { prop: 'prescription', label: '时效', tooltip: true }
]

export const tableColumn1: any = [
  { prop: 'orgName', label: '机构名称', tooltip: true },
  { prop: 'pfName', label: '产品名称', tooltip: true },
  { prop: 'pfId', label: '产品代码', tooltip: true },
  { prop: 'delayDays', label: '延迟天数', tooltip: true },
  { prop: 'prescription', label: '时效', tooltip: true },
  { prop: 'valuationDate', label: '估值日期', tooltip: true }
]

export const tableColumn2: any = [
  { prop: 'processNm', label: '流程步骤', tooltip: true },
  { prop: 'bizDate', label: '估值日期', tooltip: true },
  { prop: 'state', label: '处理状态', tooltip: true }
]

export const tableColumn3: any = [
  { prop: 'date', label: '执行时间', tooltip: true },
  { prop: 'decs', label: '问题描述', tooltip: true },
  { prop: 'states', label: '状态', tooltip: true },
  { prop: 'remarks', label: '详情介绍', tooltip: true },
  {
    label: '操作',
    btnShow: true,
    align: 'center',
    width: 119,
    fixed: 'right'
  }
]
export const tableColumn4: any = [{ prop: 'remarks', label: '详情', tooltip: true }]

export const homePageStore = defineStore('homePage', {
  state: (): homePageState => ({
    date: '',
    tableColumn: tableColumn,
    tableColumn1: tableColumn1,
    tableColumn2: tableColumn2,
    tableColumn3: tableColumn3,
    tableColumn4: tableColumn4,
    tableData: [],
    currentData: [],
    tableData1: [],
    tableData2: [],
    tableData3: [],
    tableData4: [],
    num1: 0,
    num2: 0,
    num3: 0,
    num4: 0,
    num5: 0,
    tabActiveId: 'tr_jjhzgzb',
    tabList: [
      { value: '估值文件', name: 'tr_jjhzgzb' },
      { value: '净值文件', name: 'tr_virtl_net_value' },
      { value: '穿透报告', name: 'tr_penetrate_report' }
    ],
    pie: {
      chartColumn: null,
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 22
        },
        color: ['#3371FF', '#6FD13F', '#FF4B33', '#FFB233', '#30BDB3'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['35%', '60%'],
            avoidLabelOverlap: false,
            // silent: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ],
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          style: {
            text: '',
            textAlign: 'center',
            fill: '#333',
            width: 30,
            height: 30,
            fontSize: 16
          }
        }
      }
    },
    bar: {
      chartColumn: null,
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          data: ['完成', '未完成'],
          right: '10%',
          top: '5%',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 40
          // orient:
        },
        xAxis: {
          type: 'category',
          data: [],
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        grid: {
          bottom: 30
        },
        color: ['#3371FF', '#FFB233'],
        series: [
          {
            type: 'line',
            markLine: {
              data: [
                {
                  type: 'average'
                }
              ],
              silent: true
            }
          }
        ]
      }
    },
    pie1: {
      chartColumn: null,
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center',
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8
        },
        color: ['#3371FF', '#6FD13F', '#FFB233'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['35%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: []
          }
        ]
      }
    },
    pageInfo: {
      total: 100,
      pageSize: 10,
      startPage: 1
    },
    tabActiveId1: '0',
    tabList1: [
      { value: '时效内未收到', name: '0' },
      { value: '锁表后收到', name: '1' }
    ],
    dialogVisible: false,
    formData: formData,
    exeNo: '',
    loadingShow: true
  }),
  actions: {
    // 给初始值赋值的时候
    async init() {
      //标题
      const nums = await homepage.indexGetTitleMessagePost({
        date: this.date
      })
      this.loadingShow = true
      this.num1 = nums.data.data[0].组合数量
      this.num2 = nums.data.data[0].策略当前专户数量
      this.num3 = nums.data.data[0].估值新增组合数量
      this.num4 = nums.data.data[0].估值减少组合数量
      this.num5 = nums.data.data[0].当日未生成估值任务组合
      //未完成明细列表
      const table = await homepage.batchMonitoringGetIncompleteDetailsPost({
        type: this.tabActiveId,
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize
      })
      //时效内未收取源文件
      const table1 = await homepage.batchMonitoringGetSourceFileOvertimePost({
        type: this.tabActiveId,
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize
      })

      //锁表后收到源文件
      const table2 = await homepage.batchMonitoringGetSourceFileLockTablePost({
        type: this.tabActiveId,
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize
      })

      //脚本执行详情
      const table3 = await homepage.indexGetExecuteSituationPost({
        date: this.date,
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize
      })
      this.tableData = table.data.data
      this.tableData1 = table1.data.data
      this.tableData2 = table2.data.data
      this.tableData3 = table3.data.data
      this.currentData = this.tabActiveId1 == '0' ? this.tableData1 : this.tableData2

      this.loadingShow = false
    },

    async initChartData() {
      //批量处理监控饼状图
      const pie = await homepage.batchMonitoringGetEachartsForBPost({
        type: this.tabActiveId
      })
      this.pie.option.series[0].data = pie.data.data[0].echarts
      this.pie.option.graphic.style.text = '今日批量' + '\n\n' + pie.data.data[0].totals + '个组合'
      this.pie.chartColumn.setOption(this.pie.option)

      //批量处理监控柱状图
      const bar = await homepage.batchMonitoringGetEachartsForZPost({
        type: this.tabActiveId
      })
      this.bar.option.series = bar.data.data[0].echarts
      this.bar.option.series.forEach(i => {
        i.type = 'bar'
        i.stack = 'one'
        i.barWidth = 30
      })
      console.log(this.bar.option.series)

      // this.bar.option.series[1].data = [0,0,0] //**************假数据为了展示后续删除
      // this.bar.option.series[0].data = [1, 3,2]
      // console.log(bar.data.data[0].echarts[1])

      this.bar.option.series[1].data = bar.data.data[0].echarts[1].data
      this.bar.option.series[0].data = bar.data.data[0].echarts[0].data
      this.bar.option.xAxis.data = bar.data.data[0].list
      this.bar.chartColumn.setOption(this.bar.option)
      //监控总览饼状图
      const pie1 = await homepage.indexGetDataExceptionPost({
        date: this.date
      })
      this.pie1.option.series[0].data = pie1.data.data[0].echarts
      this.pie1.chartColumn.setOption(this.pie1.option)
    },

    lockHandleClick() {
      this.currentData = []
      this.currentData = this.tabActiveId1 == '0' ? this.tableData1 : this.tableData2
    },

    async detail(row: any) {
      this.exeNo = row.exeNo
      this.dialogVisible = true
      const res = await homepage.indexGetExecuteDetailsPost({
        exeNo: this.exeNo,
        date: this.date,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData4 = res.data.data
    },

    async inquire(val: any) {
      const res = await homepage.indexGetExecuteDetailsPost({
        exeNo: this.exeNo,
        date: this.date,
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData4 = res.data.data
    },

    reset(data: any) {
      this.inquire()
    },

    async lockRefresh() {
      if (this.tabActiveId1 == '0') {
        //时效内未收取源文件
        const table1 = await homepage.batchMonitoringGetSourceFileOvertimePost({
          type: this.tabActiveId,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        })
        this.tableData1 = table1.data.data
        this.currentData = this.tableData1
      } else {
        //锁表后收到源文件
        const table2 = await homepage.batchMonitoringGetSourceFileLockTablePost({
          type: this.tabActiveId,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        })
        this.tableData2 = table2.data.data
        this.currentData = this.tableData2
      }
    },

    async scriptOperationRefresh() {
      //脚本执行详情
      const table3 = await homepage.indexGetExecuteSituationPost({
        date: this.date,
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize
      })
      this.tableData3 = table3.data.data
    },

    // 获取当前系统时间
    currentDate() {
      let year = new Date().getFullYear() // 年
      let month = new Date().getMonth() + 1 // 月
      let day = new Date().getDate() // 日
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      let currentDate = year + month + day
      return currentDate
    }
  }
})
