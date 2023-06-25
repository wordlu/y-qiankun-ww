import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { organizationState } from '@services/types/dictionary'
import { MessageBox } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import {
  ServiceDictControllerApi,
  ServiceMasterDataManagementControllerApi
} from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const organ = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)
import { formatSelectOption, downloadFile } from '@model/utils/utils'

export const organizationStore = defineStore('organizationStore', {
  state: (): organizationState => ({
    formData1: {
      tableData: []
    },
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
      orgName: '',
      orgSname: '',
      orgCode: '',
      note1: '',
      note2: ''
    },
    // 控制是否禁用
    show: false,
    // 控制机构简称是否禁用
    creditshow: false,
    // 抽屉的名字
    title: '',
    row: {},
    formObject: {},
    isEdit: true,
    editShow: true,
    loadingShow: false
  }),
  actions: {
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true
      const res = await organ.masterDataManagementGetOrgListPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },
    // 给初始值赋值的时候
    async init(formData: any) {
      const res = await dict.dicAllByClassIdPost({ classId: 'is_check' })
      formData.renderFrom[1].options = res.data.data
      return formData
    },
    // 给弹框中的表格下拉框赋值
    async initTable(tableColumnList: any) {
      const res = await dict.dicAllByClassIdPost({ classId: 'ORG_EXT' })
      tableColumnList[0].options = formatSelectOption(res.data.data, {
        label: 'keyName',
        value: 'keyId'
      })
      return tableColumnList
    },
    // 点击查看的时候
    async examine(row: any) {
      this.isEdit = false
      this.title = '查看'
      this.show = true
      this.addVisible = true
      this.addData = { ...row }
      const res = await organ.masterDataManagementOrgListViewPost({ id: row.id })
      this.formData1.tableData = res.data.data[0].infoExts
    },
    // 点击反审核的时候
    async unaudit(row: any) {
      const res = await organ.masterDataManagementCheckStatePost({ id: row.id, cChecked: 0 })
      if (res.data.code === 'DM-A0001') {
        Message.success('反审核成功')
      } else {
        return Message.warning(res.data.message)
      }
      this.inquire()
    },
    // 点击编辑的时候
    async edit(row: any) {
      this.title = '编辑'
      this.creditshow = true
      this.addVisible = true
      this.addData = { ...row }
      const res = await organ.masterDataManagementOrgListViewPost({ id: row.id })
      this.formData1.tableData = res.data.data[0].infoExts
    },
    async handleCommand(val: any, row: any) {
      console.log(val, row)
      if (val === '查看') {
        this.examine(row)
      } else if (val === '删除') {
        MessageBox.confirm('确定要删除内容么?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'globalMessageDel'
        })
          .then(async () => {
            const res = await organ.masterDataManagementDeletePost({ id: row.id })
            if (res.data.success) {
              Message({
                type: 'success',
                message: '删除成功!'
              })
            }
            this.inquire()
          })
          .catch(() => {
            Message({
              type: 'warning',
              message: '已取消删除'
            })
          })
      } else {
        const res = await organ.masterDataManagementCheckStatePost({ id: row.id, cChecked: 1 })
        if (res.data.code === 'DM-A0001') {
          Message.success('审核成功')
        } else {
          return Message.warning(res.data.message)
        }
        this.inquire()
      }
    },
    // 抽屉打开的时候
    open() {},
    // 点击新增的时候
    async add() {
      this.title = '新增'
      this.addVisible = true
    },
    // 抽屉关闭的时候
    handleClose(ref: any, refTwo: any) {
      refTwo.clearhandleClickRow()
      ref.resetFields()
      this.show = false
      this.addVisible = false
      this.creditshow = false
      this.formData1.tableData = []
      this.addData = {
        orgName: '',
        orgSname: '',
        orgCode: '',
        note1: '',
        note2: ''
      }
      this.isEdit = true
    },
    handleSelectionChange() {},
    // 删除的时候
    onDelete(row: any, index: any) {
      this.formData1.tableData.splice(row.index, 1)
    },
    // 点击保存的时候
    async save(ref: any, refTwo: any) {
      ref.validate(async (value: any) => {
        if (value) {
          let length = this.formData1.tableData.filter((item: any) => {
            return item.extendVal.length > 50
          })
          let lengthTwo = this.formData1.tableData.filter((item: any) => {
            return item.remarks.length > 200
          })
          if (length.length > 0) {
            return Message.warning('扩展值：最大长度为50个字符')
          }
          if (lengthTwo.length > 0) {
            return Message.warning('备注：最大长度200个字符')
          }
          if (this.title === '编辑') {
            delete this.addData.infoExts
            delete this.addData.createPrsn
            delete this.addData.checkName
            delete this.addData.mdfyPrsn
            const res = await organ.masterDataManagementEditPost({
              ...this.addData,
              infoExts: this.formData1.tableData
            })
            if (res.data.code === 'DM-A0001') {
              Message.success('编辑成功')
            }
          } else {
            const res = await organ.masterDataManagementAddPost({
              ...this.addData,
              infoExts: this.formData1.tableData
            })
            if (res.data.code === 'DM-A0001') {
              Message.success('添加成功')
            } else {
              return Message.warning(res.data.message)
            }
          }
          this.handleClose(ref, refTwo)
          this.inquire()
        }
      })
    },
    // 当前页发生变化的时候
    pageChange(val: any) {
      this.pageInfo.startPage = val
      this.inquire()
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
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
