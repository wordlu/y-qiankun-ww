import { defineStore } from 'pinia'
import { FactoryApi } from '@services/factoryApi'
import { subjectInvestState } from '@services/types/subjects/subjectInvest'
import { ServiceOrgSubjTypeControllerApi, ServiceDictControllerApi, ServiceMasterDataManagementControllerApi } from '@services/weiwai'
import { Message, MessageBox } from 'element-ui'
import { formData, tableColumn, renderFrom } from "./data";
import { specialExportFN } from '@weiwai/weiwai-service/services/exportApi/subject/subjectInvest'
import { downloadFile } from "../../../../utils/utils";

const orgSubjTypeQuery = FactoryApi.createAPIInstance(ServiceOrgSubjTypeControllerApi)
const dictQuery = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const masterDataManagementQuery = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)

export const subjectInvestStore = defineStore('subjectInvest', {
  state: (): subjectInvestState => ({
    formData,
    tableData: [],
    renderFrom,
    tableColumn,
    setOptions: {},
    selectionData: [],
    visible: false,
    drawerTitle: '',
    dropdownListAll: [
      { name: "审核", value: "审核" },
      { name: "反审核", value: "反审核" },
      { name: "删除", value: "删除" },
    ],
    loadingShow: false,
    addData: {
      "orgId": "",
      "subjSystem": "",
      "cSubjCode": "",
      "cSubjName": "",
      "subjCode": "",
      "subjName": "",
      "assetType": "",
      "remarke": ""
    },
    rules: {
      orgId: [
        { required: true, message: '请选择机构名称', trigger: 'change' }
      ],
      subjSystem: [
        { required: true, message: '请选择科目体系', trigger: 'change' }
      ],
      cSubjCode: [
        { required: true, message: '请选择科目代码', trigger: 'change' }
      ],
    },
    orgIdArr: [], //机构名称
    subjSystemArr: [], //科目体系
    cSubjCodeArr: [], //科目代码
    assetTypeArr: [], //投资类别
    addModal: null,
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
      const res = await orgSubjTypeQuery.orgSubjTypeSearchPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      this.tableData = data
      this.pageInfo.total = totalCount
      this.loadingShow = false
    },
    async searchCSubjCode(val) {
      if (this.addData.orgId !== '' && this.addData.subjSystem !== '') {
        const res = await orgSubjTypeQuery.orgSubjTypeCodeListPost({
          "orgId": this.addData.orgId,
          "subjSystem": this.addData.subjSystem
        })
        const { data } = res.data
        this.cSubjCodeArr = data
      }
    },
    cSubjCodeArrVisibleChange(val) {
      if (!val) return;
      // if (this.addData.orgId === '' || this.addData.subjSystem === '') {
      //   Message.warning('请先选择结构名称和科目体系！')
      // }
      console.log('请先选择结构名称和科目体系！')
    },
    handleSelectionCSubjCode(val) {
      const item = this.cSubjCodeArr.filter(it => it.keyId === val)[0]
      if (item) {
        this.addData.cSubjName = item.depName
      }
    },
    handleSelectionSubjCode(val) {
      const item = this.cSubjCodeArr.filter(it => it.keyId === val)[0]
      if (item) {
        this.addData.subjName = item.depName
      }
    },
    async getSelectData(event) {
      this.event = event
      //投资类型
      const invest_type_res = dictQuery.dicAllByClassIdPost({"classId": "invest_type"})
      const is_check_res = dictQuery.dicAllByClassIdPost({"classId": "is_check"})
      const orgList_res = masterDataManagementQuery.masterDataManagementQueryOrgPost()
      const KM_TX_R_res = dictQuery.dicAllByClassIdPost({"classId": "KM_TX_R"})
      const promiseAll = Promise.all([invest_type_res, is_check_res, orgList_res, KM_TX_R_res]);
      promiseAll.then((res) => {
        const invest_type = res[0]
        const is_check = res[1]
        const orgList = res[2]
        const KM_TX_R = res[3]
        this.orgIdArr = orgList.data.data
        this.subjSystemArr = KM_TX_R.data.data
        this.assetTypeArr = invest_type.data.data
        formData.renderFrom.forEach((item: any) => {
          if (item.key === 'assetType') {
            item.options = invest_type.data.data
          } else if (item.key === 'cChecked') {
            item.options = is_check.data.data
          } else if (item.key === 'orgId') {
            item.options = orgList.data.data
          }
        })
      });
    },
    getDropdownList(val:string) {
      let dropdownList = [
        { name: "查看", value: "查看" },
        { name: "编辑", value: "编辑" },
        { name: "删除", value: "删除" },
      ]
      if (val === '映射') {
        dropdownList.push({ name: "忽略", value: "忽略" })
        return dropdownList
      }
      dropdownList.push({ name: "映射", value: "映射" })
      return dropdownList
    },
    async exportData(ref: any) {
      // const res = await specialExportFN({
      //   ...ref.$refs.myForm.model,
      //   startPage: this.pageInfo.startPage,
      //   pageSize: this.pageInfo.pageSize
      // })
      const res = await orgSubjTypeQuery.orgSubjTypeExportExcelPost(
        {
          ...ref.$refs.myForm.model,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )
      downloadFile(res)
    },
    add(addModal) {
      this.drawerTitle = '新增'
      this.visible = true
      this.cSubjCodeArr = []
      if (addModal) {
        this.addModal = addModal
      }
    },
    async del(data:any) {
      let idsArr = []
      if (data instanceof Array) {
        idsArr = data.map(it => it.id)
      } else {
        idsArr = [data.id]
      }
      MessageBox.confirm('确定要删除内容么?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(async () => {
        const res = await orgSubjTypeQuery.orgSubjTypeBatchDeletePost({
          "ids": idsArr
        })
        const { code, message } = res.data
        if (code === 'DM-A0001') {
          Message.success('删除成功!')
          this.inquire()
        } else {
          Message.error(message)
        }
      }).catch(() => {
        console.log('已取消删除')
      });
    },
    async submitForm() {
      let res = null
      if (this.drawerTitle === '新增') {
        res = await orgSubjTypeQuery.orgSubjTypeSubjSavePost({
          ...this.addData
        })
      } else {
        res = await orgSubjTypeQuery.orgSubjTypeEditPost({
          ...this.addData
        })
      }
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success(`${this.drawerTitle}成功`)
        this.handleClose()
        this.inquire()
      } else {
        Message.error(message)
      }
    },
    // 抽屉关闭的时候
    handleClose() {
      this.addData = {
        "orgId": "",
        "subjSystem": "",
        "cSubjCode": "",
        "cSubjName": "",
        "subjCode": "",
        "subjName": "",
        "assetType": "",
        "remarke": ""
      }
      this.visible = false
      if (this.addModal) {
        this.addModal.resetFields()
      }
    },
    // 表格多选
    handleSelectionChange(data:any) {
      this.selectionData = data
      console.log(this.selectionData)
    },
    // 控制当前是否禁用 返回值false禁用 true不禁用
    selectable(value:any) {
      return !value.disabled;
    },
    async handleStatus(data:any) {
      let idsArr = [], checked = 0
      if (data instanceof Array) {
        idsArr = data.map(it => {
          return {id: it.id}
        })
        checked = Number(data[0].cChecked) === 1 ? 0 : 1
      } else {
        idsArr = [{id: data.id}]
        checked = Number(data.cChecked) === 1 ? 0 : 1
      }
      const res = await orgSubjTypeQuery.orgSubjTypeBatchAuditPost({
        "checked": checked,
        "data": idsArr
      })
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        Message.error(message)
      }
    },
    async showAdd(row:any, type: string) {
      this.drawerTitle = type
      const res = await orgSubjTypeQuery.orgSubjTypeOrgSubjTypeViewPost({
        id: row.id
      })
      const { data } = res.data
      this.showAddDrawer(data, type)
    },
    async ignoreMapping(row, val) {
      const isValid = val === '忽略' ? 0 : 1
      const res = await orgSubjTypeQuery.orgSubjTypeIgnoreMappingPost({
        "id": row.id,
        "valid": isValid
      })
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        Message.error(message)
      }
    },
    showAddDrawer(data:any, type: string) {
      this.addData = data
      this.visible = true
      if (type === '编辑') {
        this.searchCSubjCode()
      }
    },
    handleCommandAll(val:string, data:any) {
      if (!data || data.length === 0) {
        Message.warning('请先选择需要批量处理的数据！')
        return false;
      }
      if (val === '审核') {
        const num = data.filter(it => Number(it.cChecked) === 1)[0]
        if (num) {
          Message.warning('选中数据中包括已审核状态的数据')
          return;
        }
        this.handleStatus(data)
      } else if (val === '反审核') {
        const num = data.filter(it => Number(it.cChecked) === 0)[0]
        if (num) {
          Message.warning('选中数据中包括未审核状态的数据')
          return;
        }
        this.handleStatus(data)
      } else if (val === '删除') {
        const num = data.filter(it => Number(it.cChecked) === 1)[0]
        if (num) {
          Message.warning('选中数据中包括已审核状态的数据')
          return;
        }
        this.del(data)
      }
    },
    handleCommand(val:string, row: object) {
      if (val === '编辑' || val === '查看') {
        this.drawerTitle = val
        this.showAdd(row, val)
      } else if (val === '删除') {
        this.del(row)
      } else if (val === '映射' || val === '忽略') {
        this.ignoreMapping(row, val)
        console.log(row, val)
      }
    },
  }
})
