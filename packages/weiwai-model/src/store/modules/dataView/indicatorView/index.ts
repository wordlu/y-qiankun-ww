import { defineStore } from 'pinia'
import { indicatorState } from '@services/types/dataShow/indicatorView'
import { downloadFile } from "../../../../utils/utils";
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceIndexViewControllerApi, ServiceComTreeConfigurationControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const indicator = FactoryApi.createAPIInstance(ServiceIndexViewControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)

export const indicatorStore = defineStore('indicator', {
  state: (): indicatorState => ({
    treeList: [],
    hasParent: false,
    checkedKeys: [],
    expandedKeys: [],
    resetScroll: false,
    showCheck: true,
    tableData: [],
    daterangeValue: '',
    options: [],
    selectVal: '1',
    activeName: '',
    checkedTreeNode: [],
    tabActiveId: '0',
    tabFileName: '',
    tabList: [],
    defaultProps: {
      label: 'name',
      children: 'children'
    },
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    tableColumn: [
      { prop: 'pfId', label: '策略专户代码', align: 'center', width: '110' },
      { prop: 'dbiz', label: '估值日期', align: 'center', width: '96' },
      { prop: 'paidCapital', label: '实收资本', align: 'center', width: '96' },
      { prop: 'totalAssets', label: '资产合计', align: 'center', width: '96' },
      { prop: 'totalLiabi', label: '负债合计', align: 'center', width: '96' },
      { prop: 'assetValue', label: '资产净值', align: 'center', width: '96' },
      { prop: 'avgNav', label: '单位净值', align: 'center', width: '96' },
      { prop: 'accNet', label: '累计单位净值', align: 'center', width: '110' },
      { prop: 'tenSouYield', label: '每万份收益', align: 'center', width: '96' },
      { prop: 'sevenAnnuYield', label: '七日年化收益率', align: 'center', width: '120' },
      { prop: 'todayAnnuYield', label: '本日年化收益率', align: 'center', width: '120' },
      { prop: 'yield', label: '本日收益', align: 'center', width: '96' },
      { prop: 'deviation', label: '偏离度', align: 'center', width: '96' },
      { prop: 'deviationAmt', label: '偏离金额', align: 'center', width: '96' },
      { prop: 'totalAssetsCb', label: '资产合计（成本）', align: 'center', width: '130' },
      { prop: 'totalLiabiCb', label: '负债合计（成本）', align: 'center', width: '130' },
      { prop: 'assetValueCb', label: '资产净值（成本）', align: 'center', width: '130' },
      { prop: 'totalAssetsCbY', label: '资产合计（原币成本）', align: 'center', width: '160' },
      { prop: 'totalLiabiCbY', label: '负债合计（原币成本）', align: 'center', width: '160' },
      { prop: 'assetValueCbY', label: '资产净值（原币成本）', align: 'center', width: '160' },
      { prop: 'totalAssetsY', label: '资产合计（原币）', align: 'center', width: '130' },
      { prop: 'totalLiabiY', label: '负债合计（原币）', align: 'center', width: '130' },
      { prop: 'assetValueY', label: '资产净值（原币）', align: 'center', width: '130' }
    ],
    loadingShow: false
  }),
  actions: {
    // 给初始值赋值的时候
    async init() {
      const options = await tree.comTreeConfigurationTreeListPost()
      const { data } = options.data
      this.options = data
      this.getTreeFN()
    },

    // 获取树形的数据
    async getTreeFN() {
      let pfTag = null
      if (this.options.length > 0) {
        let list = this.options.filter((item: any) => {
          return item.code === this.selectVal
        })
        pfTag = list[0].tag
      } else {
        pfTag = 'MNGR_ID'
      }
      const res = await tree.comTreeConfigurationProductTreePost({
        treeId: this.selectVal,
        pfTag: pfTag
      })
      this.treeList = res.data.data
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data
    },

    //表格查询
    async queryList() {
      if (!this.daterangeValue || this.checkedTreeNode.length == 0) {
        Message.warning('请选择日期和机构')
        return
      }
      this.loadingShow = true
      this.tabList = this.checkedTreeNode.filter((i: any) => i.children.length == 0)
      this.tabFileName = !this.tabFileName ? this.tabList[0].name : this.tabFileName
      const tableData = await indicator.indexViewGetListPost({
        startDate: this.daterangeValue[0],
        endDate: this.daterangeValue[1],
        startPage: this.pageInfo.startPage,
        pageSize: this.pageInfo.pageSize,
        pfId: this.tabActiveId == '0' ? this.tabList[0].pfId : this.tabActiveId
      })
      this.tableData = tableData.data.data
      this.pageInfo.total = tableData.data.totalCount
      this.loadingShow = false
    },

    handleClick(tab?: any) {
      this.tabActiveId = tab.$attrs.value.pfId
      this.tabFileName = this.tabList[tab.index].name
      this.queryList()
    },

    pageChange(val: any) {
      console.log(val)
      this.pageInfo.startPage = val
      this.queryList()
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.queryList()
    },

    async export() {
      if (this.tableData.length == 0) {
        Message.warning('暂时没有可导出的数据')
        return
      }
      const res = await indicator.indexViewExportExcelPost(
        {
          startDate: this.daterangeValue[0],
          endDate: this.daterangeValue[1],
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize,
          pfId: this.tabActiveId == '0' ? this.tabList[0].pfId : this.tabActiveId,
          fileName: this.tabFileName
        },
        { responseType: 'blob' }
      )

      downloadFile(res)
    },
    clear() {
      this.$reset()
    }
  }
})
