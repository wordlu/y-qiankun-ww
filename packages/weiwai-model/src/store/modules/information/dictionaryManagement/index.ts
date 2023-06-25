import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { dictionaryState } from '@services/types/dictionary'
import { renderFrom, initData, formData } from './data'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceDictControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)

export const dictionaryStore = defineStore('dictionary', {
  state: (): dictionaryState => ({
    multipleSelection: [],
    setOptions: {}, // 外部表格的数据
    tableData: [], // dialog表格的数据
    tableDataTwo: [], // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    }, // 抽屉的显示
    addVisible: false, // 抽屉；中的数据
    addData: {
      classId: '',
      dicClassName: '',
      classEname: '',
      keyId: '',
      keyName: '',
      keyEname: '',
      state: null,
      memo: ''
    }, // 控制是否禁用
    show: false, // 控分类代码和键值代码是否禁用
    showTwo: false, // 抽屉的名字
    title: '', // dialog弹框的数据

    dialogVisible: false, // 是否有效的选项
    options: [], // 获取当前表格的数据
    row: {},
    pageInfoDia: {
      total: 0,
      pageSize: 10,
      startPage: 1
    },
    formObject: {},
    height: '',
    loadingShow: false,
    dialogLoadingShow: false
  }),
  actions: {
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true

      const res = await dict.dicAllPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      this.tableData = data
      this.pageInfo.total = totalCount
      this.loadingShow = false
    }, // 给初始值赋值的时候
    init(formData: any) {
      formData.renderFrom.forEach(async (item: any) => {
        if (item.key === 'classId') {
          item.options = await this.getSelectData({ field: 'class_id' })
        } else if (item.key === 'dicClassName') {
          item.options = await this.getSelectData({ field: 'class_name' })
        } else if (item.key === 'classEname')
          item.options = await this.getSelectData({ field: 'class_ename' })
      })
      return formData
    }, // 获取下拉框的值
    async getSelectData(params: any) {
      const res = await dict.dicFindCloumPost(params)
      let list = res.data.data.map((item: any) => {
        return { keyName: item, keyId: item }
      })
      return list
    }, // 点击编辑的时候
    edit(row: any) {
      this.title = '编辑'
      this.showTwo = true
      this.addVisible = true
      this.addData = { ...row }
      this.addData.state = String(this.addData.state)
    },
    handleCommand(val: any, row: any) {
      const { classId, dicClassName, classEname, stateName } = row
      if (val === '添加子项') {
        this.title = '添加子项'
        this.addVisible = true
        this.addData.classId = classId
        this.addData.dicClassName = dicClassName
        this.addData.classEname = classEname
        this.addData.stateName = stateName
        this.show = true
      } else {
        this.dialogVisible = true
        this.row = { ...row }
        // this.getDiaTableList()
      }
    }, // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    }, // 抽屉关闭的时候
    handleClose(ref: any) {
      ref.resetFields()
      ;(this.addData = {
        classId: '',
        dicClassName: '',
        classEname: '',
        keyId: '',
        keyName: '',
        keyEname: '',
        state: null,
        memo: ''
      }),
        (this.showTwo = false)
      this.show = false
      this.addVisible = false
    },
    handleSelectionChange() {}, // 点击保存的时候掉接口
    async save(ref: any) {
      ref.validate(async (value: any) => {
        if (value) {
          if (this.title === '编辑') {
            const res = await dict.dicEditPost(this.addData)
            console.log(res)
            if (res.data.code === 'DM-A0001') {
              Message.success('编辑成功')
            }
          } else {
            const res = await dict.dicAddPost(this.addData)
            if (res.data.code === 'DM-A0001') {
              Message.success('添加成功')
            }
          }
          this.handleClose(ref)
          this.inquire()
        }
      })
    }, // 点击启用的时候
    async start(val: any) {
      if (val.length === 0) {
        return Message.warning('未选择任何数据')
      }

      let list = val.filter((item: any) => {
        return item.state === 1
      })
      if (list.length > 0) {
        Message.warning('所选数据已有启用状态')
      } else {
        const res = await dict.dicStatePost({ state: 1, data: val })
        if (res.data.code === 'DM-A0001') {
          Message.success('启用成功')
        }
        this.inquire()
      }
    }, // 点击禁用的时候
    async forbidden(val: any) {
      if (val.length === 0) {
        return Message.warning('未选择任何数据')
      }
      let list = val.filter((item: any) => {
        return item.state === 0
      })
      if (list.length > 0) {
        Message.warning('所选数据已有禁用状态')
      } else {
        const res = await dict.dicStatePost({ state: 0, data: val })
        if (res.data.code === 'DM-A0001') {
          Message.success('禁用成功')
        }
        this.inquire()
      }
    }, // 关闭dialog弹框的事件
    close() {
      this.dialogVisible = false
      this.pageInfoDia = {
        pageSize: 10,
        startPage: 1,
        total: 0
      }
      console.log(this.pageInfoDia)
    }, // pagesize发生变化的时候
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    pageChange(val: any) {
      this.pageInfo.startPage = val
      this.inquire()
    }, // dialog框的count变化
    pageChangeDia(val: any) {
      this.pageInfoDia.startPage = val
      this.getDiaTableList()
    },
    sizeChangeDia(val: any) {
      this.pageInfoDia.pageSize = val
      this.getDiaTableList()
    }, // 获取dialog框中表格的数据
    async getDiaTableList() {
      this.dialogLoadingShow = true
      const res = await dict.dicAllListPost({
        startPage: this.pageInfoDia.startPage,
        pageSize: this.pageInfoDia.pageSize,
        classId: this.row.classId
      })
      this.tableDataTwo = res.data.data
      this.pageInfoDia.total = res.data.totalCount
      this.dialogLoadingShow = false
    },
    async open() {
      const res = await dict.dicAllByClassIdPost({ classId: 'is_sta' })
      this.options = res.data.data
    },
    dialogOpen() {
      this.getDiaTableList()
    },
    clear() {
      this.$reset()
    },
    // 点击重置的时候
    reset() {
      this.clear()
      this.inquire()
    }
  }
})
