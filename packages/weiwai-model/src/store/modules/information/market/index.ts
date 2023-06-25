import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { marketState } from '@services/types/dictionary'
//test
import { FactoryApi } from '@services/factoryApi'
import { formatSelectOption, downloadFile } from '../../../../utils/utils'
import {
  ServiceDictControllerApi,
  ServiceSpecialStrategyControllerApi,
  ServiceMasterDataManagementControllerApi,
  ServiceComTreeConfigurationControllerApi,
  ServiceDataExportControllerApi
} from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)
const expo = FactoryApi.createAPIInstance(ServiceDataExportControllerApi)
import { exportExcelFN } from '@weiwai/weiwai-service/services/exportApi/market'

export const marketStore = defineStore('marketState', {
  state: (): marketState => ({
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
    setOptions: {},
    // 选中的组合数据
    checkedTreeNode: [],
    tabList: [],
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    formObject: {},
    loadingShow: false,
    treeLoading: false
  }),
  actions: {
    receiveList(data: any) {},

    pageChange(val: any) {
      this.pageInfo.startPage = val
      this.inquire()
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    checkTreeNode(data: any) {
      this.checkedTreeNode = data
    },

    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true
      const res = await expo.dataExportGetListPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },
    // 增量导出
    async increment(ref: any) {
      // checkedTreeNode 当前树形组件选中的值
      if (this.checkedTreeNode.length === 0) {
        Message.warning('请选择左侧树')
      } else {
        ref.$refs.myForm.validate(async (value: boolean) => {
          if (value) {
            let data = this.checkedTreeNode
              .filter((item: any) => {
                return item.children.length === 0
              })
              .map((item: any) => {
                return item.id
              })
            const res = await expo.dataExportExportExcelPost(
              {
                ...ref.$refs.myForm.model,
                data,
                exprortType: 1
              },
              { responseType: 'blob' }
            )
            // const res =  await exportExcelFN({ ...ref.$refs.myForm.model, data, exprortType: 0 })
            downloadFile(res)
          }
        })
      }
    },
    // 全量导出
    full(ref: any) {
      if (this.checkedTreeNode.length === 0) {
        Message.warning('请选择左侧树')
      } else {
        ref.$refs.myForm.validate(async (value: boolean) => {
          if (value) {
            let data = this.checkedTreeNode
              .filter((item: any) => {
                return item.children.length === 0
              })
              .map((item: any) => {
                return item.id
              })
            const res = await expo.dataExportExportExcelPost(
              {
                ...ref.$refs.myForm.model,
                data,
                exprortType: 0
              },
              { responseType: 'blob' }
            )
            // const res =  await exportExcelFN({ ...ref.$refs.myForm.model, data, exprortType: 0 })
            downloadFile(res)
          }
        })
      }
    },

    // 获取options的数据
    async getOptionsFN() {
      const res = await tree.comTreeConfigurationTreeListPost()
      this.options = res.data.data
    },
    // 获取树形的数据
    async getTreeFN() {
      this.treeLoading = true
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
      this.treeLoading = false
    },
    async init(formData: any) {
      formData.renderFrom[2].options = await this.getDicFN('ex_dataType')
      formData.renderFrom[3].options = await this.getDicFN('fileExportType')
    },
    // 获取字典值
    async getDicFN(classId: string) {
      const res = await dict.dicAllByClassIdPost({ classId })
      return res.data.data
    },
    clear() {
      this.$reset()
    }
  }
})
