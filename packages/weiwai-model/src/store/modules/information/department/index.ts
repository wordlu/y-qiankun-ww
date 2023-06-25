import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { departmentState } from '@services/types/dictionary'
import { MessageBox } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceDictControllerApi, ServiceInterestOrgControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const dep = FactoryApi.createAPIInstance(ServiceInterestOrgControllerApi)
export const departmentStore = defineStore('departmentStore', {
  state: (): departmentState => ({
    setOptions: {},
    tableData: [],
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    // 抽屉的显示
    addVisible: false,
    // 抽屉中的数据
    addData: {
      orgId: '',
      orgName: '',
      remark1: '',
      remark2: ''
    },
    // 控制是否禁用
    show: false,
    // 抽屉的名字
    title: '',
    formObject: {},
    loadingShow: false
  }),
  actions: {
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true
      const res = await dep.interestOrgGetInterestOrgListPost({
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
    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    // 抽屉关闭的时候
    handleClose(form: any) {
      form.resetFields()
      this.show = false
      this.addVisible = false
      this.addData = {
        orgId: '',
        orgName: '',
        remark1: '',
        remark2: ''
      }
    },
    // 点击保存的时候
    save(form: any) {
      form.validate(async (value: any) => {
        if (value) {
          const res = await dep.interestOrgInterestOrgSavePost(this.addData)
          if (res.data.code === 'DM-A0001') {
            Message.success('添加成功')
          }
          this.inquire()
          this.handleClose(form)
        }
      })
    },
    sizeChange(val: number) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    pageChange(val: number) {
      this.pageInfo.startPage = val
      this.inquire()
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
