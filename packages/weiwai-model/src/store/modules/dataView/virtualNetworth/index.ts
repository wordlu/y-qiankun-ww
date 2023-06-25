import { defineStore } from 'pinia'
import { virtualState } from '@services/types/dataShow/virtualNetworth'
import { downloadFile } from "../../../../utils/utils";

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceNetWorthControllerApi, ServiceComTreeConfigurationControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const netWorth = FactoryApi.createAPIInstance(ServiceNetWorthControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)

export const virtualStore = defineStore('virtual', {
  state: (): virtualState => ({
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
      { prop: 'customerCode', label: '客户代码', align: 'center', width: '96' },
      { prop: 'customerName', label: '客户名称', align: 'center', width: '243' },
      { prop: 'pfName', label: '资产计划产品名称', align: 'center', width: '243' },
      { prop: 'netValue', label: '虚拟净值', align: 'center' },
      { prop: 'assetValue', label: '资产净值', align: 'center' },
      { prop: 'bizDate', label: '净值日期', align: 'center' }
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

    checkTreeNode(data: any) {
      this.checkedTreeNode = data
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
    //表格查询
    async queryList() {
      if (!this.daterangeValue || this.checkedTreeNode.length == 0) {
        Message.warning('请选择日期和机构')
        return
      }
      this.loadingShow = true
      this.tabList = this.checkedTreeNode.filter((i: any) => i.children.length == 0)
      const tableData = await netWorth.netWorthGetListPost({
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
      const res = await netWorth.netWorthExportExcelPost(
        {
          startDate: this.daterangeValue[0],
          endDate: this.daterangeValue[1],
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize,
          pfId: this.tabActiveId == '0' ? this.tabList[0].pfId : this.tabActiveId
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
