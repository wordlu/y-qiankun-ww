import { defineStore } from 'pinia'
import { FactoryApi } from '@services/factoryApi'
import { subjectAssetState } from '@services/types/subjects/subjectAsset'
import { ServiceOutAssetMappingControllerApi, ServiceDictControllerApi, ServiceMasterDataManagementControllerApi, ServiceDataSrcAgingControllerApi, } from '@services/weiwai'
import { Message, MessageBox } from 'element-ui'
import { formData, tableColumn, renderFrom, tableColumnList } from "./data";
import { specialExportFN } from '@weiwai/weiwai-service/services/exportApi/subject/subjectAsset'
import { downloadFile } from "../../../../utils/utils";

const outAssetQuery = FactoryApi.createAPIInstance(ServiceOutAssetMappingControllerApi)
const dictQuery = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const masterDataManagementQuery = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)
const dataSrcAgingQuery = FactoryApi.createAPIInstance(ServiceDataSrcAgingControllerApi)

export const subjectAssetStore = defineStore('subjectAsset', {
  state: (): subjectAssetState => ({
    formData,
    tableData: [],
    renderFrom,
    tableColumn,
    setOptions: {},
    selectionData: [],
    visible: false,
    drawerTitle: '',
    dropdownList: [],
    addData: {
      "orgId": "",
      "pfName": "",
      "assetName": "",
      "assetCode": "",
      "mktCode": "",
      "sMktCode": "",
      "assetType": "",
      "sAssetName": "",
      "sAssetCode": "",
      "sAssetType": ""
    },
    loadingShow: false,
    rules: {
      assetName: [
        { required: true, message: '请输入资产名称', trigger: 'blur' },
        { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
      ],
      assetCode: [
        { required: true, message: '请输入资产代码', trigger: 'blur' },
        {
          pattern: /^[A-Za-z0-9_]{1,}$/,
          message: "只能输入数字、字母、下划线",
          trigger: "blur",
        },
        { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
      ],
      mktCode: [
        { required: true, message: '请选择市场', trigger: 'change' }
      ],
      assetType: [
        { required: true, message: '请选择资产大类', trigger: 'change' }
      ],
      sAssetName: [
        { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
      ],
      sAssetCode: [
        {
          pattern: /^[A-Za-z0-9_]{1,}$/,
          message: "只能输入数字、字母、下划线",
          trigger: "blur",
        },
        { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
      ]
    },
    orgIdArr: [],
    pfNameArr: [],
    mktCodeArr: [],
    assetTypeArr: [],
    tableColumnList,
    stableData: {},
    event: null,
    // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      pageCount: 1,
      startPage: 1,
    },
  }),
  actions: {
    async exportData(ref: any) {
      // const res = await specialExportFN({
      //   ...ref.$refs.myForm.model,
      //   startPage: this.pageInfo.startPage,
      //   pageSize: this.pageInfo.pageSize
      // })
      const res = await outAssetQuery.outAssetMappingExportPost(
        {
          ...ref.$refs.myForm.model,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )
      downloadFile(res)
    },
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
      const res = await outAssetQuery.outAssetMappingGetListPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      this.tableData = data
      this.pageInfo.total = totalCount
      this.loadingShow = false
    },
    async init(event) {
      this.loadingShow = true
      this.event = event
      //机构名称
      const orgList_res = masterDataManagementQuery.masterDataManagementQueryOrgPost()
      //专户名称
      const combinList_res = dataSrcAgingQuery.dataAgingGetCombinListPost()
      // 审核
      const is_check_res = dictQuery.dicAllByClassIdPost({"classId": "is_check"})
      // 资产大类
      const ASSETCODE2_res = dictQuery.dicAllByClassIdPost({"classId": "ASSETCODE2"})
      // 映射状态
      const is_map_res = dictQuery.dicAllByClassIdPost({"classId": "is_map"})
      // 市场
      const MARKETCODE_res = dictQuery.dicAllByClassIdPost({"classId": "MARKETCODE"})
      // 资产大类（弹窗）
      const ASSETCODE_res = dictQuery.dicAllByClassIdPost({"classId": "ASSETCODE"})
      // 表格数据
      const list_res = outAssetQuery.outAssetMappingGetListPost({
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const promiseAll = Promise.all([
        orgList_res, 
        combinList_res, 
        is_check_res, 
        ASSETCODE2_res,
        is_map_res,
        MARKETCODE_res,
        ASSETCODE_res,
        list_res
      ]);
      promiseAll.then(async (res) => {
        const orgList = res[0]
        const combinList = res[1]
        const is_check = res[2]
        const ASSETCODE2 = res[3]
        const is_map = res[4]
        const MARKETCODE = res[5]
        const ASSETCODE = res[6]
        const list = res[7]
        // 表格数据
        this.tableData = list.data.data
        this.pageInfo.total = list.data.totalCount
        // 机构下拉
        this.orgIdArr = orgList.data.data
        this.pfNameArr = combinList.data.data
        this.mktCodeArr = MARKETCODE.data.data
        this.assetTypeArr = ASSETCODE.data.data
        // // 树形科目体系下拉默认值
        // this.subjSystemBzId = this.subjSystemBzIdOptions[0].keyId; 
        // this.getTreeData(this.subjSystemBzId)
        // 搜索表单组件下拉框值
        formData.renderFrom.forEach((item: any) => {
          if (item.key === 'assetType') {
            item.options = ASSETCODE2.data.data
          } else if (item.key === 'isValid') {
            item.options = is_map.data.data
          } else if (item.key === 'cChecked') {
            item.options = is_check.data.data
          }
        })
      this.loadingShow = false
      });
    },
    // validAddModal() {
      
    // },
    async submitForm() {
      let res = null
      // const valid = this.validAddModal()
      // if (!valid) return;
      if (this.drawerTitle === '新增') {
        res = await outAssetQuery.outAssetMappingOutAssetMappingSavePost({
          ...this.addData
        })
      } else {
        res = await outAssetQuery.outAssetMappingUpdatePost({
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
        "pfName": "",
        "assetName": "",
        "assetCode": "",
        "mktCode": "",
        "sMktCode": "",
        "assetType": "",
        "sAssetName": "",
        "sAssetCode": "",
        "sAssetType": ""
      }
      this.visible = false
      if (this.event) {
        this.event.$refs.addData.resetFields()
        this.event.$set(this.stableData, 'tableData', [])
      }
    },
    rowDoubleClick(row: any) {
      if (this.drawerTitle === '查看') return;
      this.addData.sAssetName = row.sAssetName
      this.addData.sAssetCode = row.sAssetCode
      this.addData.mktCode = row.sMktCode
      this.addData.sAssetType = row.sAssetType
    }, 
    // 标准名称查表格数据
    async searchsAssetName(val:string) {
      const res = await outAssetQuery.outAssetMappingGetSecListPost({
        "sAssetName": val,
        "startPage": 0,
        "pageSize": 1000,
      })
      const { data } = res.data
      this.event.$set(this.stableData, 'tableData', data)
    },
    getDropdownList(val:string) {
      let dropdownList = [
        { name: "查看", value: "查看" },
        { name: "编辑", value: "编辑" },
      ]
      if (val === '映射') {
        dropdownList.push({ name: "忽略", value: "忽略" })
        return dropdownList
      }
      dropdownList.push({ name: "映射", value: "映射" })
      return dropdownList
    },
    add() {
      this.drawerTitle = '新增'
      this.visible = true
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
    handleCommand(val:string, row: object) {
      if (val === '编辑' || val === '查看') {
        this.drawerTitle = val
        this.showAdd(row, val)
      } else if (val === '映射' || val === '忽略') {
        this.ignoreMapping(row, val)
      } else if (val === '审核' || val === '反审核') {
        this.handleStatus(row)
      }
    },
    async showAdd(row:any, type: string) {
      this.drawerTitle = type
      const res = await outAssetQuery.outAssetMappingInfoPost({
        id: row.id
      })
      const { data } = res.data
      this.showAddDrawer(data, type)
    },
    showAddDrawer(data:any, type: string) {
      this.addData = data
      this.visible = true
      if (this.addData.sAssetName && this.addData.sAssetName !== '') {
        this.searchsAssetName(this.addData.sAssetName)
      }
    },
    async ignoreMapping(row, val) {
      const isValid = val === '忽略' ? 0 : 1
      const res = await outAssetQuery.outAssetMappingDisablePost({
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
    async handleStatus(data:any) {
      let checked = Number(data.cChecked) === 1 ? 0 : 1

      const res = await outAssetQuery.outAssetMappingCheckPost({
        "cChecked": checked,
        "id": data.id
      })
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        Message.error(message)
      }
    },
    
  }
})
