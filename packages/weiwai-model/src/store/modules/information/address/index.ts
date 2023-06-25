import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { addressState } from '@services/types/dictionary'
import { MessageBox } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import {
  ServiceDictControllerApi,
  ServiceMasterDataManagementControllerApi,
  ServiceOrganControllerApi
} from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const organ = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)
const address = FactoryApi.createAPIInstance(ServiceOrganControllerApi)
export const addressStore = defineStore('addressStore', {
  state: (): addressState => ({
    // dialog框的表格column数据
    setOptions: {},
    // 外部表格的数据
    tableData: [],
    // dialog表格的数据
    tableDataTwo: [],
    // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    // 抽屉的显示
    addVisible: false,
    // 抽屉；中的数据
    addData: {
      orgId: '',
      orgName: '',
      contacts: '',
      tel: '',
      tel1: '',
      isValid: '',
      job: '',
      mail: '',
      memo: ''
    },
    // 控制是否禁用
    show: false,
    // 控分类代码和键值代码是否禁用
    showTwo: false,
    // 抽屉的名字
    title: '',
    // 是否有效的选项
    options: [],
    // dialog弹框的数据
    dialogVisible: false,
    formObject: {},
    DiaPageInfo: {
      total: 0,
      pageSize: 10,
      startPage: 1
    },
    orgName: '',
    formDataObject: {},
    loadingShow: true,
    dialogLoadingShow: false
  }),
  actions: {
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true
      const res = await address.usersAllPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },
    // 给初始值赋值的时候
    async init(formData?: any) {
      if (formData) {
        this.formDataObject = formData
      }
      const res = await address.usersQueryOrgNamePost()
      this.formDataObject.renderFrom[1].options = res.data.data
      return this.formDataObject
    },
    // 点击编辑的时候
    edit(row: any) {
      this.title = '编辑'
      this.show = true
      this.addVisible = true
      this.addData = { ...row }
      this.addData.isValid = String(this.addData.isValid)
    },
    async handleCommand(val: any, row: any) {
      console.log(val, row)
      const { orgId, orgName, tel1, validName } = row
      if (val === '添加人员') {
        this.title = '添加人员'
        this.addData.orgId = orgId
        this.addData.orgName = orgName
        this.addData.tel1 = tel1
        this.addData.validName = validName
        this.addVisible = true
        this.show = true
      } else {
        this.dialogVisible = true
        this.orgName = orgName
        this.classification(orgName)
      }
    },
    // 查看此分类的功能
    async classification(orgName: string) {
      this.dialogLoadingShow = true
      const res = await address.usersAllListPost({
        orgName,
        ...{ startPage: this.DiaPageInfo.startPage, pageSize: this.DiaPageInfo.pageSize }
      })
      this.tableDataTwo = res.data.data
      this.DiaPageInfo.total = res.data.totalCount
      this.dialogLoadingShow = false
    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    //抽屉打开的时候
    async onOpen() {
      const res = await dict.dicAllByClassIdPost({ classId: 'is_sta' })
      this.options = res.data.data
    },
    // 抽屉关闭的时候
    handleClose(ref: any) {
      ref.resetFields()
      this.addData = {
        orgId: '',
        orgName: '',
        contacts: '',
        tel: '',
        tel1: '',
        isValid: '',
        job: '',
        mail: '',
        memo: ''
      }
      this.show = false
      this.addVisible = false
      this.title = ''
      // 清除校验规则
    },
    // 点击保存的时候
    async save(ref: any) {
      ref.validate(async (value: any) => {
        if (value) {
          if (this.title === '编辑') {
            const res = await address.usersEditPost(this.addData)
            if (res.data.success) {
              Message.success('编辑成功')
            }
            this.handleClose(ref)
            this.inquire()
          } else {
            const res = await address.usersAddPost(this.addData)
            if (res.data.success) {
              Message.success('添加成功')
            }
            this.handleClose(ref)
            this.inquire()
            this.init()
          }
        }
      })
    },
    // 点击启用的时候
    async start(val: any) {
      if (val.length === 0) {
        return Message.warning('未选择任何数据')
      }
      let list = val.filter((item: any) => {
        return item.isValid === 1
      })
      if (list.length > 0) {
        Message.warning('所选数据已有启用状态')
      } else {
        const res = await address.usersStatePost({ state: 1, data: val })
        if (res.data.code === 'DM-A0001') {
          Message.success('启用成功')
        }
        this.inquire()
      }
    },
    // 点击禁用的时候
    async forbidden(val: any) {
      if (val.length === 0) {
        return Message.warning('未选择任何数据')
      }

      let list = val.filter((item: any) => {
        return item.isValid === 0
      })
      if (list.length > 0) {
        Message.warning('所选数据已有禁用状态')
      } else {
        const res = await address.usersStatePost({ state: 0, data: val })
        if (res.data.code === 'DM-A0001') {
          Message.success('禁用成功')
          this.inquire()
        }
      }
    },
    // 关闭dialog弹框的事件
    close() {
      this.orgName = ''
      this.DiaPageInfo = {
        total: 0,
        pageSize: 10,
        startPage: 1
      }
      this.dialogVisible = false
    },
    pageChange(val: any) {
      this.pageInfo.startPage = val
      this.inquire()
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    diaPageChange(val: any) {
      this.DiaPageInfo.startPage = val
      this.classification(this.orgName)
    },
    diaSizeChange(val: any) {
      this.DiaPageInfo.pageSize = val
      this.classification(this.orgName)
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
