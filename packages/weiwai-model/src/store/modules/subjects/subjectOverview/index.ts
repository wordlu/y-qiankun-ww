import { defineStore } from 'pinia'
import { FactoryApi } from '@services/factoryApi'
import { subjectOverviewState } from '@services/types/subjects/subjectOverview'
import { ServiceOrgSubjControllerApi, ServiceMasterDataManagementControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
import { formData, tableColumn, renderFrom,} from "./data";
const orgSubjQuery = FactoryApi.createAPIInstance(ServiceOrgSubjControllerApi)
const masterDataManagementQuery = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)

export const subjectOverviewStore = defineStore('subjectOverview', {
  state: (): subjectOverviewState => ({
    formData,
    tableData: [],
    renderFrom,
    tableColumn,
    setOptions: {},
    selectionData: [],
    visible: false,
    dropdownList: [],
    loadingShow: false,
    // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      pageCount: 1,
      startPage: 1,
    },
    event: null,
  }),
  actions: {
    reset(data: any) {
      this.pageInfo = {
        total: 0,
        pageSize: 20,
        pageCount: 1,
        startPage: 1,
      }
      this.inquire()
    },
    // 当前页发生变化触发的事件
    pageChange(val:any) {
      console.log(val)
      this.pageInfo.startPage = val
      this.inquire(this.event.$refs.form.$refs.myForm.model)
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire(this.event.$refs.form.$refs.myForm.model)
    },
    // 点击查询的时候
    async inquire(val?: any) {
      this.loadingShow = true
      const res = await orgSubjQuery.orgSubjGetSubjListPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      this.tableData = data
      this.pageInfo.total = totalCount
      this.loadingShow = false
    },
    async getSelectData(event) {
      this.event = event
      this.loadingShow = true
      const res = await masterDataManagementQuery.masterDataManagementQueryOrgPost()
      const { data } = res.data
      formData.renderFrom.forEach((item: any) => {
        if (item.key === 'orgId') {
          item.options = data
        }
      })
      this.loadingShow = false
    }
  }
})
