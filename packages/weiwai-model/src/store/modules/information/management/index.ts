import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { managementState } from '@services/types/dictionary'
// import { formatSelectOption, downloadFile } from ''
import { formatSelectOption, downloadFile } from '../../../../utils/utils'

//test
import { FactoryApi } from '@services/factoryApi'
import {
  ServiceDictControllerApi,
  ServiceSpecialStrategyControllerApi,
  ServiceMasterDataManagementControllerApi
} from '@services/weiwai'
import { Message } from 'element-ui'
import { specialExportFN } from '@weiwai/weiwai-service/services/exportApi/management'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const mana = FactoryApi.createAPIInstance(ServiceSpecialStrategyControllerApi)
const mast = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)

// 编辑需要修改接口  导出还没做
export const managementStore = defineStore('management', {
  state: (): managementState => ({
    setOptions: {},
    tableData: [],
    // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    // 抽屉的显示
    addVisible: false,
    // 抽屉中的数据
    addData: {
      pfName: '',
      pfId: '',
      mngrId: '',
      trustmngrId: '',
      posState: '',
      assetType: '',
      chgDate: '',
      endDate: '',
      investMgr: '',
      investDepName: '',
      investWay: '',
      orgId: '',
      marketCode: '',
      marketCode2: '',
      investDep: null // 投资部门转换的keyId值后端需要的
    },
    // 控制是否禁用
    show: false,
    // 抽屉的名字
    title: '',
    // 工作流类型option
    optionOne: [],
    // 上级步骤option
    optionTwo: [],
    // 业务属性option
    optionThree: [],
    optionFour: [],
    optionFive: [],
    optionSix: [],
    optionSeven: [],
    formData1: {
      tableData: []
    },
    // tab绑定的值
    activeName: 'info',
    // 展示字段列选中的数据
    fieldList: [],
    // 展示指标选中的数据
    targetList: [],
    fieldData: [1, 2, 3, 4, 5],
    targetData: [1, 2, 3, 4, 5],
    // 点击编辑的时候控制组合代码是否禁用
    editData: false,
    formObject: {},
    loadingShow: false
  }),
  actions: {
    init(formData: any) {
      formData.renderFrom.forEach(async (item: any) => {
        switch (item.key) {
          case 'mngrId':
            item.options = await this.getInvestmentFN()
            break
          case 'assetType':
            item.options = await this.getDictionariesFN('Asset_Type')
            break
          case 'cChecked':
            item.options = await this.getDictionariesFN('is_check')
            break
          case 'posState':
            item.options = await this.getDictionariesFN('position_status')
            break
          default:
            break
        }
      })
    },
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true

      const res = await mana.specialStrategyGetSpecialListPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },
    // 点击查看的时候
    examine(row: any) {
      this.title = '查看'
      this.show = true
      this.addVisible = true
      this.addData = { ...row }
      this.getTableDataFN(row.id)
      // this.tableColumnList.forEach(item => {
      //   item.disabled = true
      // })
    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    // 点击反审核的时候
    async edit(row: any) {
      const { id, pfId } = row
      const res = await mana.specialStrategySpecialCheckPost({ id, pfId, cChecked: 0 })
      if (res.data.code === 'DM-A0000') {
        Message.success('反审核成功')
        this.inquire()
      } else {
        Message.warning(res.data.message)
      }
    },
    // 抽屉关闭的时候
    handleClose(ref: any, refTwo: any) {
      ref.resetFields()
      refTwo.clearhandleClickRow()
      this.activeName = 'info'
      this.show = false
      this.addVisible = false
      this.editData = false
      this.addData = {
        pfName: '',
        pfId: '',
        mngrId: '',
        trustmngrId: '',
        posState: '',
        assetType: '',
        chgDate: '',
        endDate: '',
        investMgr: '',
        investDepName: '',
        investWay: '',
        orgId: '',
        marketCode: '',
        marketCode2: '',
        investDep: null
      }
      this.fieldList = []
      this.targetList = []
      this.formData1.tableData = []
      // this.tableColumnList.forEach(item => {
      //   item.disabled = false
      // })
    },
    // 点击保存的时候
    save(ref: any, refTwo: any) {
      ref.validate(async (value: any) => {
        if (value) {
          let length = this.formData1.tableData.filter((item: any) => {
            return item.extFieldValue.length >= 50
          })
          let lengthTwo = this.formData1.tableData.filter((item: any) => {
            return item.extFieldNote.length >= 200
          })
          if (length.length > 0) {
            return Message.warning('扩展值：最大长度为50个字符')
          }
          if (lengthTwo.length > 0) {
            return Message.warning('备注：最大长度200个字符')
          }
          if (this.title === '编辑') {
            delete this.addData.createPrsn
            delete this.addData.mdfyPrsn
            delete this.addData.checkName
            const res = await mana.specialStrategySpecialUpdatePost({
              ...this.addData,
              infoExts: this.formData1.tableData
            })
            if (res.data.code === 'DM-A0001') {
              Message.success('编辑成功')
            }
            this.handleClose(ref, refTwo)
            this.inquire()
          } else {
            const res = await mana.specialStrategySpecialStrategySavePost({
              ...this.addData,
              infoExts: this.formData1.tableData
            })
            if (res.data.code === 'DM-A0001') {
              Message.success('添加成功')
            } else if (res.data.code === 'A0102') {
              return Message.warning(res.data.message)
            }
            this.handleClose(ref, refTwo)
            this.inquire()
          }
        }
      })
    },
    onDelete(row: any, index: any) {
      this.formData1.tableData.splice(row.index, 1)
    },
    // tab栏切换的时候
    handleClick(val: any) {
      // this.activeName=val.label
      console.log(this.activeName)
    },
    // 点击更多的时候
    async handleCommand(value: any, row: any) {
      if (value === '编辑') {
        this.title = '编辑'
        this.addVisible = true
        this.addData = { ...row }
        this.editData = true
        this.getTableDataFN(row.id)
      } else {
        const { id, pfId } = row
        const res = await mana.specialStrategySpecialCheckPost({ id, pfId, cChecked: 1 })
        if (res.data.code === 'DM-A0000') {
          Message.success('审核成功')
          this.inquire()
        } else {
          Message.warning(res.data.message)
        }
      }
    },
    // 抽屉打开的时候
    async open(list: any) {
      this.optionOne = await this.getInvestmentFN()
      this.optionTwo = await this.getTrusteeFN()
      this.optionThree = await this.getDictionariesFN('position_status')
      this.optionFour = await this.getDictionariesFN('Asset_Type')
      this.optionFive = await this.getManagerFN()
      this.optionSix = await this.getDictionariesFN('ZG_WAY')
      this.optionSeven = await this.getIstitutionFN()
      list[0].options = formatSelectOption(await this.getDictionariesFN('PF_EXT'), {
        label: 'keyName',
        value: 'keyId'
      })
      let data = await this.getDictionariesFN('PF_EXT')
      list[0].dict = data.map((item: any) => {
        item.code = item.keyId
        item.value = item.keyName
        return item
      })
    },
    // 点击导出的时候
    async derive(ref: any) {
      // const res = await specialExportFN({
      //   ...ref.$refs.myForm.model,
      //   startPage: this.pageInfo.startPage,
      //   pageSize: this.pageInfo.pageSize
      // })
      const res = await mana.specialStrategySpecialExportPost(
        {
          ...ref.$refs.myForm.model,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )
      downloadFile(res)
    },
    // 获取字典值
    async getDictionariesFN(val: string) {
      const res = await dict.dicAllByClassIdPost({ classId: val })
      return res.data.data
    },
    // 获取投资管理人
    async getInvestmentFN() {
      const res = await mast.masterDataManagementQueryOrgPost()
      return res.data.data
    },
    // 获取托管人
    async getTrusteeFN() {
      const res = await mana.specialStrategyTrustmngrListPost()
      return res.data.data
    },
    // 获取投资经理
    async getManagerFN() {
      const res = await mana.specialStrategyInvestMgrListPost()
      return res.data.data
    },
    // 获取投顾机构
    async getIstitutionFN() {
      const res = await mana.specialStrategyGetOrgListPost()
      return res.data.data
    },
    sizeChange(val: number) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    pageChange(val: number) {
      this.pageInfo.startPage = val
      this.inquire()
    },
    // 获取抽屉表格数据
    async getTableDataFN(id: string) {
      const res = await mana.specialStrategySpecialInfoPost({ id })
      this.formData1.tableData = res.data.data[0].infoExts
    },
    // 数据发生变化获取投资部门
    async getsection() {
      const res = await this.getManagerFN()
      return res
    },
    clear() {
      this.$reset()
    },
    reset() {
      this.clear()
      this.inquire()
    }
  }
})
