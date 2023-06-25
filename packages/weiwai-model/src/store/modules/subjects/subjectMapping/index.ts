import { defineStore } from 'pinia'
import { FactoryApi } from '@services/factoryApi'
import { subjectMappingState } from '@services/types/subjects/subjectMapping'
import { ServiceAssetsControllerApi, ServiceDictControllerApi } from '@services/weiwai'
import { specialExportFN } from '@weiwai/weiwai-service/services/exportApi/subject/subjectMapping'
import { downloadFile } from "../../../../utils/utils";

import { Message, MessageBox } from 'element-ui'
import { formData, defaultProps, tableColumn } from "./data";
const assetsQuery = FactoryApi.createAPIInstance(ServiceAssetsControllerApi)
const dictQuery = FactoryApi.createAPIInstance(ServiceDictControllerApi)

export const subjectMappingStore = defineStore('subjectMapping', {
  state: (): subjectMappingState => ({
    treeList: [],
    defaultProps,
    hasParent: false,
    checkedKeys: [],
    expandedKeys: [],
    resetScroll: false,
    showCheck: true,
    tableData: [],
    tableColumn,
    daterangeValue: '',
    dict: [],
    subjSystemBzIdOptions: [],
    subjSystemBzId: '',
    setOptions: {},
    formData,
    // 选中的组合数据
    checkedTreeNode: [],
    tabList: [],
    selectionData: [],
    dropdownListAll: [
      { name: "审核", value: "审核" },
      { name: "反审核", value: "反审核" }
    ],
    currentIndex: null,
    currentTableRow: null,
    searchData: {},
    treeLoading: false,
    event: null,
    loadingShow: false,
    treeLoadingShow: false,
    // 分页的数据
    pageInfo: {
      total: 0,
      pageSize: 20,
      pageCount: 1,
      startPage: 1,
    },
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
    handleClickTree(currentTree:any) {
      if (this.currentTableRow && Number(this.currentTableRow.cChecked)) {
        Message.warning("已审核状态无法修改当前数据")
        this.currentIndex = null;
        return;
      }
      if ( typeof this.currentIndex !== "number") return;
      this.event.$set(this.tableData, this.currentIndex, {
        ...this.tableData[this.currentIndex],
        isUpdate: true,
        subjSystemBz: this.subjSystemBzId,
        cSubjCodeBz: currentTree.cSubjCode,
        cSubjNameBz: currentTree.cSubjName,
      });
    },
    handleCurrentRowChange(currentRow:any) {
      this.currentTableRow = currentRow
      if (Number(currentRow.cChecked)) {
        Message.warning("已审核状态无法修改当前数据")
        this.currentIndex = null;
        return;
      } else {
        this.currentIndex = currentRow.row_index;
      }
    },
    async save() {
      const data:any = [];
      this.tableData.forEach((item:any) => {
        if (item.isUpdate) {
          const items = { ...item, ...this.searchData };
          delete items.isUpdate;
          data.push(items);
        }
      });
      if (data.length) {
        const res = await assetsQuery.assetsSavePost(data) 
        const { code, message } = res.data
        if (code === 'DM-A0001') {
          Message.success('保存成功!')
          this.inquire()
        } else {
          Message.error(message)
        }
      } else {
        Message.warning("暂无修改")
      }
    },
    async getTreeData(val) {
      this.treeLoadingShow = true
      const res = await assetsQuery.assetsSearchTree2Post({"keyId": val})
      const { data, totalCount } = res.data
      this.treeList = data
      if (this.treeList.length > 0) {
        this.expandedKeys.push(this.treeList[0].id)
      }
      this.treeLoadingShow = false
    },
    async init(event) {
      this.loadingShow = true
      this.treeLoadingShow = true
      this.event = event
      //机构
      const orgList_res = assetsQuery.assetsOrgListGet()
      const is_check_res = dictQuery.dicAllByClassIdPost({"classId": "is_check"})
      const KM_TX_R_res = dictQuery.dicAllByClassIdPost({"classId": "KM_TX_R"})
      const KM_TX_res = dictQuery.dicAllByClassIdPost({"classId": "KM_TX"})
      const KM_LEVEL_res = dictQuery.dicAllByClassIdPost({"classId": "KM_LEVEL"})
      const list_res = assetsQuery.assetsSearchPost({
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const promiseAll = Promise.all([orgList_res, is_check_res, KM_TX_R_res, KM_TX_res, KM_LEVEL_res, list_res]);
      promiseAll.then(async (res) => {
        const orgList = res[0]
        const is_check = res[1]
        const KM_TX_R = res[2]
        const KM_TX = res[3]
        const KM_LEVEL = res[4]
        const list = res[5]

        // 树形科目体系下拉
        this.subjSystemBzIdOptions = KM_TX_R.data.data 
        // 树形科目体系下拉默认值
        this.subjSystemBzId = this.subjSystemBzIdOptions[0].keyId; 
        await this.getTreeData(this.subjSystemBzId)
        // 表格数据
        this.tableData = list.data.data
        this.pageInfo.total = list.data.totalCount
       
        // 搜索表单组件下拉框值
        formData.renderFrom.forEach((item: any) => {
          if (item.key === 'subjSystem') {
            item.options = KM_TX.data.data
          } else if (item.key === 'nSubjLevel') {
            item.options = KM_LEVEL.data.data
          } else if (item.key === 'orgId') {
            item.options = orgList.data.data
          } else if (item.key === 'cChecked') {
            item.options = is_check.data.data
          }
        })
      this.loadingShow = false
      // this.treeLoadingShow = false
      });
    },
    syncAll(val:any) {
      this.getTreeData(this.subjSystemBzId)
    },
    receiveList(data: any) {
      console.log(data)
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data;
    },
    // 点击查询的时候
    async inquire(val?: any) {
      this.loadingShow = true
      const res = await assetsQuery.assetsSearchPost({
        ...val,
        ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize }
      })
      const { data, totalCount } = res.data
      this.tableData = data
      this.pageInfo.total = totalCount
      this.loadingShow = false
    },
    handleCommandAll(val:string, data:any) {
      if (!data || data.length === 0) {
        Message.warning('请先选择需要批量处理的数据！')
        return false;
      }
      const num = data.filter(it => it.isUpdate)
      if (num.length > 0) {
        Message.warning('选中数据中包含未保存数据，请先保存，再进行操作！')
        return false;
      }
      if (val === '审核') {

        const num1 = data.filter(it => !it.cSubjCodeBz && !it.cSubjNameBz)[0]
        if (num1) {
          Message.warning('选中数据中包括未映射状态的数据')
          return;
        }

        const num = data.filter(it => Number(it.cChecked) === 1)[0]
        if (num) {
          Message.warning('选中数据中包括已审核状态的数据')
          return;
        }
        
        this.handleStatusAll(data, 1)
      } else if (val === '反审核') {

        const num1 = data.filter(it => !it.cSubjCodeBz && !it.cSubjNameBz)[0]
        if (num1) {
          Message.warning('选中数据中包括未映射状态的数据')
          return;
        }

        const num = data.filter(it => Number(it.cChecked) === 0)[0]
        if (num) {
          Message.warning('选中数据中包括未审核状态的数据')
          return;
        }
        
        this.handleStatusAll(data, 0)
      }
    },
    async handleStatusAll(data:any, state: number) {
      const res = await assetsQuery.assetsBatchAuditPost({
        "checked": state,
        "data": data
      })
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        if (message.indexOf('B') !== 0) {
          Message.warning(message)
          return;
        }
        Message.error(message)
      }
    },
    async handleStatus(data:any) {
      if (data.isUpdate) {
        Message.warning("请先保存，再进行操作")
        return;
      }
      const val = JSON.parse(JSON.stringify(data))
      val.cChecked = Number(data.cChecked) === 1 ? 0 : 1
      const res = await assetsQuery.assetsAuditPost(val)
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        if (message.indexOf('B') !== 0) {
          Message.warning(message)
          return;
        }
        Message.error(message)
      }
    },
    cSubjCodeArrVisibleChange(val) {
      if (!val) return;
      if (this.addData.orgId === '' || this.addData.subjSystem === '') {
        Message.warning('请先选择结构名称和科目体系！')
      }
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
    async exportData(ref: any) {
      // const res = await specialExportFN({
      //   ...ref.$refs.myForm.model,
      //   startPage: this.pageInfo.startPage,
      //   pageSize: this.pageInfo.pageSize
      // })
      const res = await assetsQuery.assetsExcelPost(
        {
          ...ref.$refs.myForm.model,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )
      downloadFile(res)
    },
    async delItem(data:any) {
      if (!data.id) {
        this.event.$set(this.tableData, data.row_index, {
          ...this.tableData[data.row_index],
          isUpdate: false,
          subjSystemBz: '',
          cSubjCodeBz: '',
          cSubjNameBz: '',
        });
        return;
      }
      MessageBox.confirm('确定要删除内容么?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(async () => {
        const res = await assetsQuery.assetsDeletePost({
          "id": data.id
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
  }
})
