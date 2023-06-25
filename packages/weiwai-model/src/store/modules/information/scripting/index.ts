import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { scriptingState } from '@services/types/dictionary'
import { MessageBox } from 'element-ui'
//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceDictControllerApi, ServiceWorkflowControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const scr = FactoryApi.createAPIInstance(ServiceWorkflowControllerApi)
export const scriptingStore = defineStore('scriptingStore', {
  state: (): scriptingState => ({
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
      wfMode: '',
      wfName: '',
      wfId: '',
      maxRuntime: null,
      wfDatatype: '',
      wfAttr: '',
      wfDesc: ''
    },
    // 控制是否禁用
    show: false,
    // 抽屉的名字
    title: '',
    formObject: {},
    // 工作流类型option
    optionOne: [],
    // 上级步骤option
    optionTwo: [],
    // 业务属性option
    optionThree: [],
    loadingShow: false
  }),
  actions: {
    // 点击查询的时候
    async inquire(val?: any) {
      if (val) {
        this.formObject = val
      }
      this.loadingShow = true

      const res = await scr.workflowQueryPost({
        ...this.formObject,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      this.loadingShow = false
    },
    // 初始值赋值
    init(formData: any) {
      formData.renderFrom.forEach(async (item: any) => {
        switch (item.key) {
          case 'wfName':
            item.options = await this.getChineseFN('wfName')
            break
          case 'wfId':
            item.options = await this.getChineseFN('wfId')
            break
          case 'sta':
            item.options = await this.getDictionariesFN('is_sta')
            break
          case 'wfDatatype':
            item.options = await this.getChineseFN('wfDatatype')
            break
          case 'wfAttr':
            item.options = await this.getDictionariesFN('wf_attr')
            break
          default:
            break
        }
      })
      return formData
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
    // 点击编辑的时候
    edit(row: any) {
      this.title = '编辑'
      this.addVisible = true
      this.addData = { ...row }
    },
    // 抽屉关闭的时候
    handleClose(form: any) {
      form.resetFields()
      this.show = false
      this.addVisible = false
      this.addData = {
        wfMode: '',
        wfName: '',
        wfId: '',
        maxRuntime: null,
        wfDatatype: '',
        wfAttr: '',
        wfDesc: ''
      }
    },
    // 点击保存的时候
    save(form: any, formData?: any) {
      form.validate(async (value: any) => {
        if (value) {
          this.addData.maxRuntime = Number(this.addData.maxRuntime)
          if (this.title === '新增') {
            const res = await scr.workflowAddPost(this.addData)
            if (res.data.code === 'DM-A0001') {
              Message.success('添加成功')
              this.inquire()
              this.handleClose(form)
              this.init(formData)
            } else if (res.data.code === 'A0102') {
              return Message.warning(res.data.message)
            }
          } else {
            const res = await scr.workflowEditPost(this.addData)
            if (res.data.code === 'DM-A0001') {
              Message.success('编辑成功')
              this.inquire()
              this.handleClose(form)
              this.init(formData)
            }
          }
        }
      })
    },
    async handleCommand(val: any, data: any) {
      if (data.length === 0) {
        return Message.warning('未选择任何数据')
      }
      if (val === '启用') {
        let list = data.filter((item: any) => {
          return item.sta === 0
        })
        if (list.length < 1) {
          Message.warning('所选数据均为启用状态，没有要启用的数据。')
        } else {
          MessageBox.confirm('确定要启用所选的数据么?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'globalMessageDel'
          })
            .then(async () => {
              const res = await scr.workflowStatePost({ state: 1, data: list })
              if (res.data.code === 'DM-A0001') {
                Message.success(`已启用${list.length}条工作流`)
                this.inquire()
              }
            })
            .catch(() => {
              Message({
                type: 'warning',
                message: '已取消启用'
              })
            })
        }
      } else if (val === '禁用') {
        let list = data.filter((item: any) => {
          return item.sta === 1
        })
        if (list.length < 1) {
          Message.warning('所选数据均为禁用状态，没有要禁用的数据。')
        } else {
          MessageBox.confirm('请确认当前工作流是否在运行状态后，再进行禁用操作?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'globalMessageDel'
          })
            .then(async () => {
              const res = await scr.workflowStatePost({ state: 0, data: list })
              if (res.data.code === 'DM-A0001') {
                Message.success(`已禁用${list.length}条工作流`)
                this.inquire()
              }
            })
            .catch(() => {
              Message({
                type: 'warning',
                message: '已取消禁用'
              })
            })
        }
      } else {
        let list = data.filter((item: any) => {
          return item.sta === 1
        })
        if (list.length >= 1) {
          Message.warning('所选选项其中有启用状态,不可以删除')
        } else {
          MessageBox.confirm('你确定要删除么?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'globalMessageDel'
          })
            .then(async () => {
              console.log(list)

              const res = await scr.workflowDeletePost({ data })
              if (res.data.code === 'DM-A0001') {
                Message.success(`已删除${data.length}条工作流`)
                this.inquire()
              }
            })
            .catch(() => {
              Message({
                type: 'warning',
                message: '已取消删除'
              })
            })
        }
      }
    },
    sizeChange(val: number) {
      this.pageInfo.pageSize = val
      this.inquire()
    },
    pageChange(val: number) {
      this.pageInfo.startPage = val
      this.inquire()
    },
    // 获取状态和业务属性的字典值
    async getDictionariesFN(val: string) {
      const res = await dict.dicAllByClassIdPost({ classId: val })
      return res.data.data
    },
    // 获取工作流中文名和上级步骤
    async getChineseFN(val: string) {
      const res = await scr.workflowQueryWfPost()
      if (val === 'wfDatatype') {
        return res.data.data
      } else if (val === 'wfId') {
        return res.data.data.map((item: any) => {
          item.keyId = item.name
          item.keyName = item.name
          return item
        })
      } else {
        return res.data.data.map((item: any) => {
          item.keyId = item.keyName
          return item
        })
      }
    },
    // 抽屉打开的时候获取下拉框值
    async open() {
      this.optionOne = await this.getDictionariesFN('wf_mode')
      this.optionTwo = await this.getChineseFN('wfDatatype')
      this.optionThree = await this.getDictionariesFN('wf_attr')
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
