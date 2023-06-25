import { defineStore } from 'pinia'
import { FactoryApi } from '@services/factoryApi'
import { subjectSystemState } from '@services/types/subjects/subjectSystem'
import { ServiceSubjectControllerApi, ServiceDictControllerApi, ServiceMasterDataManagementControllerApi } from '@services/weiwai'
import { Message, MessageBox } from 'element-ui'
import { formData, tableColumn, renderFrom,} from "./data";
import { specialExportFN } from '@weiwai/weiwai-service/services/exportApi/subject/subjectSystem'
import { downloadFile } from "../../../../utils/utils";

const subjectQuery = FactoryApi.createAPIInstance(ServiceSubjectControllerApi)
const dictQuery = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const masterDataManagementQuery = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)

export const subjectStore = defineStore('subject', {
  state: (): subjectSystemState => ({
    formData,
    BaseEditTableData: {
      tableData: []
    },
    renderFrom,
    tableColumn,
    setOptions: {},
    selectionData: [],
    visible: false,
    dropdownList: [],
    searchData: {},
    loadingShow: false,
    dropdownListAll: [
      { name: "审核", value: "审核" },
      { name: "导出", value: "导出" },
    ],
    defaultRow: {
      isAdd: true,
      cChecked: 0,
    },
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

      const res = await subjectQuery.subjectSubjectExportPost(
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
      // this.inquire()
      this.event.$set(this.BaseEditTableData, 'tableData', [])
      this.event.$refs.baseForm.$refs.myForm.resetFields()
      this.pageInfo = {
        total: 0,
        pageSize: 20,
        pageCount: 1,
        startPage: 1,
      }
    },
    // 当前页发生变化触发的事件
    pageChange(val:any) {
      this.pageInfo.startPage = val
      this.inquire(this.event.$refs.baseForm.$refs.myForm.model)
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire(this.event.$refs.baseForm.$refs.myForm.model)
    },
    async init(event) {
      this.event = event
      // 表格数据
      const list_res = null
      // subjectQuery.subjectGetSubjectListPost({
      //   ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      // })
      // 科目类别
      const KM_CLS_res = dictQuery.dicAllByClassIdPost({"classId": "KM_CLS"})
      // 科目体系
      const KM_TX_res = dictQuery.dicAllByClassIdPost({"classId": "KM_TX"})
      // 余额方向
      const JD_WAY_res = dictQuery.dicAllByClassIdPost({"classId": "JD_WAY"})
      // 币种
      const CURY_res = dictQuery.dicAllByClassIdPost({"classId": "CURY"})
      // 科目层级
      const KM_LEVEL_res = dictQuery.dicAllByClassIdPost({"classId": "KM_LEVEL"})
      // 科目映射规则
      const MapType_res = dictQuery.dicAllByClassIdPost({"classId": "MapType"})
      // 是否虚拟科目
      const isV_res = dictQuery.dicAllByClassIdPost({"classId": "isV"})
      // 是否参与汇总
      const isSum_res = dictQuery.dicAllByClassIdPost({"classId": "isSum"})
      // 审核
      const is_check_res = dictQuery.dicAllByClassIdPost({"classId": "is_check"})
      //机构名称
      const orgList_res = masterDataManagementQuery.masterDataManagementQueryOrgPost()
      const promiseAll = Promise.all([
        list_res, 
        KM_CLS_res, 
        KM_TX_res, 
        JD_WAY_res,
        CURY_res,
        KM_LEVEL_res,
        MapType_res,
        isV_res,
        isSum_res,
        is_check_res,
        orgList_res
      ]);
      promiseAll.then((res) => {
        const list = res[0]
        const KM_CLS = res[1]
        const KM_TX = res[2]
        const JD_WAY = res[3]
        const CURY = res[4]
        const KM_LEVEL = res[5]
        const MapType = res[6]
        const isV = res[7]
        const isSum = res[8]
        const is_check = res[9]
        const orgList = res[10]
        // 表格数据
        // this.event.$set(this.BaseEditTableData, 'tableData', list.data.data)
        // this.pageInfo.total = list.data.totalCount

        this.formData.renderFrom.forEach((item: any) => {
          if (item.key === 'cSubjCls') {
            item.options = KM_CLS.data.data
          } else if (item.key === 'orgId') {
            item.options = orgList.data.data
          } else if (item.key === 'subjSystem') {
            item.options = KM_TX.data.data
          } else if (item.key === 'cChecked') {
            item.options = is_check.data.data
          }
        })

        this.tableColumn.forEach((item: any) => {
          if (item.prop === 'mapType') {
            item.options = MapType.data.data
          } else if (item.prop === 'cSubjCls') {
            item.options = KM_CLS.data.data
          } else if (item.prop === 'nWay') {
            item.options = JD_WAY.data.data
          } else if (item.prop === 'cCuryCode') {
            item.options = CURY.data.data
          } else if (item.prop === 'isDetail') {
            item.options = isV.data.data
          } else if (item.prop === 'nSubjLevel') {
            item.options = KM_LEVEL.data.data
          } else if (item.prop === 'isV') {
            item.options = isV.data.data
          } else if (item.prop === 'isSum') {
            item.options = isSum.data.data
          }
        })
      });
    },
    addItem() {
      if (this.searchData.orgId && this.searchData.subjSystem) {
        this.defaultRow.orgId = this.searchData.orgId
        this.defaultRow.subjSystem = this.searchData.subjSystem
        this.event.$refs.baseEditTable.handleAddRow(this.defaultRow)
      } else {
        Message.warning("请先选择机构和体系，查询后才能添加")
      }
    },
    async submit() {
      const { tableData } = this.BaseEditTableData;
      const data = tableData.filter((item) => item.isUpdate || item.isAdd);
      console.log(data)
      if (!data.length) {
        Message.warning("暂无修改或新增，不能保存")
        return;
      }
      const cSubjCodeNum = data.filter((it:any) => !it.cSubjCode || it.cSubjCode === '')
      const cSubjNameNum = data.filter((it:any) => !it.cSubjName || it.cSubjName === '')
      if (cSubjCodeNum.length + cSubjNameNum.length > 0) {
        Message.warning("请填写所有必填项")
        return;
      }
      console.log(data)
      const res = await subjectQuery.subjectSubjectSavePost(data)
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("保存成功")
        this.inquire(this.searchData)
      } else {
        Message.error(message)
      }
    },
    // 点击查询的时候
    async inquire(val?: any) {
      this.loadingShow = true
      this.searchData = val
      const res = await subjectQuery.subjectGetSubjectListPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      // 处理后端返回数据
      data.forEach(it => {
        it.isSum = String(it.isSum !== null ? it.isSum : '')
        it.isV = String(it.isV !== null ? it.isV : '')
        it.isDetail = String(it.isDetail !== null ? it.isDetail : '')
        it.mapType = String(it.mapType !== null ? it.mapType : '')
        it.nSubjLevel = String(it.nSubjLevel !== null ? it.nSubjLevel : '')
      })
      this.event.$set(this.BaseEditTableData, 'tableData', data)
      this.pageInfo.total = totalCount
      this.event.$refs.baseEditTable.editRowIndex = null
      this.loadingShow = false
    },
    async delItem(data:any, index: number) {
      MessageBox.confirm('确定要删除内容么?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(async () => {
        if (!data.id) {
          this.event.$refs.baseEditTable.handleDelete(data, index)
          return;
        }
        const res = await subjectQuery.subjectDeletePost([{
          "id": data.id
        }])
        const { code, message } = res.data
        if (code === 'DM-A0001') {
          Message.success('删除成功!')
          this.inquire(this.searchData)
        } else {
          Message.error(message)
        }
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    // 控制当前是否禁用 返回值false禁用 true不禁用
    selectable(value:any) {
      return !value.disabled;
    },
    // 表格多选
    handleSelectionChange(data:any) {
      this.selectionData = data
    },
    async handleStatus(data:any) {
      let arr = []
      if (data instanceof Array) {
        const num = data.filter((item) => item.isUpdate || item.isAdd);
        if (num.length > 0) {
          Message.warning("选中数据中包含未保存数据，请先保存，才能操作")
          return;
        }
        const checked = Number(data[0].cChecked) === 1 ? 0 : 1
        const val = []
        data.forEach(it => {
          const res = JSON.parse(JSON.stringify(it))
          res.cChecked = checked
          val.push(res)
        })
        arr = val
      } else {
        if (data.isUpdate || data.isAdd) {
          Message.warning("请先保存，才能操作")
          return;
        }
        const val = JSON.parse(JSON.stringify(data))
        val.cChecked = Number(data.cChecked) === 1 ? 0 : 1
        arr.push(val)
      }
      const res = await subjectQuery.subjectSubjectCheckPost(arr)
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire(this.searchData)
      } else {
        if (message.indexOf('B') !== 0) {
          Message.warning(message)
          return;
        }
        Message.error(message)
      }
    },
    handleCommandAll(val:string, data:any, event:any) {
      if (val === '导出') {
        this.exportData(event)
        return;
      }
      if (!data || data.length === 0) {
        Message.warning('请先选择需要批量处理的数据！')
        return;
      }
      if (val === '审核') {
        const num = data.filter(it => Number(it.cChecked) === 1)[0]
        if (num) {
          Message.warning('选中数据中包括已审核状态的数据')
          return;
        }
        this.handleStatus(data)
      }
    },
  }
})
