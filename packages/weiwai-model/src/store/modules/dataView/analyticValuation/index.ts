import { defineStore } from 'pinia'
import { analyticState } from '@services/types/dataShow/analyticValuation'
import { downloadFile } from "../../../../utils/utils";

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceValuationInfoNewControllerApi, ServiceComTreeConfigurationControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const analytic = FactoryApi.createAPIInstance(ServiceValuationInfoNewControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)

export const renderFrom: any = [
  {
    label: "估值日期:",
    key: "dBiz",
    // labelWidth: 80,
    type: "DatePickerDisableAfterToday",
    rowId: 1,
    span: 8,
  },
  {
    type: "Input",
    label: "科目代码:",
    key: "cKmdm",
    rowId: 1,
    span: 8,
  },
  {
    type: "Buttons",
    rowId: 2,
    span: 16,
    children: [
      {
        label: "查询",
        btnShow: 82103,
        size: "small",
        btnType: "primary",
        onClick: (_: any, val: any, _this: any) => {
          _this.$emit("inquire", val.initData, _this.$parent);
        },
      },
      {
        label: "重置",
        size: "small",
        btnShow: 82102,
        onClick: (_: any, val: any, _this: any) => {
          val.initData = initData(renderFrom)
          _this.$emit('reset')
        },
      },
    ],
  },
];

export const initData = (ary: any) => {
  const data: any = {};
  ary.forEach((element: any) => {
    if (!["Buttons", "Button"].includes(element.type)) {
      data[element.key] = element.initValue || "";
    }
  });
  return data;
};

export const formData: any = {
  initData: initData(renderFrom),
  maxRow: 1,
  maxCol: 4, //每行表单数
  isFoldRow: false,
  Folding: false,
  renderFrom: renderFrom,
};

export const analyticStore = defineStore('analytic', {
  state: (): analyticState => ({
    treeList: [],
    formData: formData,
    setOptions: {},
    hasParent: false,
    checkedKeys: [],
    expandedKeys: [],
    resetScroll: false,
    showCheck: true,
    tableData: [],
    dBiz: '',
    options: [],
    selectVal: '1',
    activeName: '',
    checkedTreeNode: [],
    tabActiveId: '0',
    tabFileName: '',
    tabList: [],
    defaultProps: {
      label: 'name',
      children: 'children'
    },
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    tableColumn: [],
    checkDropList: [],
    customList: [
      { prop: 'cKmdm', label: '科目代码', align: 'center', width: '96' },
      { prop: 'cKmmc', label: '科目名称', align: 'center', width: '96' },
      { prop: 'cKmlv', label: '科目层级', align: 'center', width: '96' },
      { prop: 'assetCode', label: '资产代码', align: 'center', width: '96' },
      { prop: 'assetType', label: '资产类型', align: 'center', width: '96' },
      { prop: 'nHldamt', label: '持仓数量', align: 'center', width: '120' },
      { prop: 'nHldcst', label: '原币持仓成本', align: 'center', width: '120' },
      { prop: 'nHldcstLocl', label: '本币持仓成本', align: 'center', width: '120' },
      { prop: 'nHldmkv', label: '原币持仓市值', align: 'center', width: '120' },
      { prop: 'nHldmkvLocl', label: '本币持仓市值', align: 'center', width: '120' },
      { prop: 'nHldvva', label: '原币证券估值', align: 'center', width: '120' },
      { prop: 'nHldvvaL', label: '本币证券估值', align: 'center', width: '120' },
      { prop: 'cCuryCode', label: '估值币种', align: 'center', width: '120' },
      { prop: 'nValrate', label: '货币估值汇率', align: 'center', width: '120' },
      { prop: 'nPriceCost', label: '单位成本', align: 'center', width: '120' },
      { prop: 'nValprice', label: '证券估值行情', align: 'center', width: '120' },
      { prop: 'nCbJzBl', label: '本币成本占比(%) ', align: 'center', width: '140' },
      { prop: 'nZcBl', label: '资产占比(%)', align: 'center', width: '120' },
      { prop: 'cSubpend', label: '停牌信息', align: 'center', width: '120' },
      { prop: 'cRights', label: '权益信息,百元债券利息', align: 'center', width: '180' },
      { prop: 'cIvtClss', label: '投资分类', align: 'center', width: '120' },
      { prop: 'cMktCode', label: '交易市场', align: 'center', width: '120' },
      { prop: 'cMlAttr', label: '受限流通类别', align: 'center', width: '120' }
    ],
    checkAllDropList: [
      'cKmdm',
      'cKmmc',
      'cKmlv',
      'assetCode',
      'assetType',
      'nHldamt',
      'nHldcst',
      'nHldcstLocl',
      'nHldmkv',
      'nHldmkvLocl',
      'nHldvva',
      'nHldvvaL',
      'cCuryCode',
      'nValrate',
      'nPriceCost',
      'nValprice',
      'nCbJzBl',
      'nZcBl',
      'cSubpend',
      'cRights',
      'cIvtClss',
      'cMktCode',
      'cMlAttr'
    ],
    addData: {
      id: '',
      cKmdm: '',
      cKmmc: '',
      cKmlv: '',
      assetCode: '',
      assetType: '',
      nHldamt: '',
      nHldcst: '',
      nHldcstLocl: '',
      nHldmkv: '',
      nHldmkvLocl: '',
      nHldvva: '',
      nHldvvaL: '',
      cCuryCode: '',
      nValrate: '',
      nPriceCost: '',
      nValprice: '',
      nCbJzBl: '',
      nZcBl: '',
      cSubpend: '',
      cRights: '',
      cIvtClss: '',
      cMktCode: '',
      cMlAttr: ''
    },
    checkAll: true,
    isIndeterminate: false,
    visible: false,
    addVisible: false,
    selectionData: [],
    dropdownList: [
      { value: 0, name: '审核' },
      { value: 1, name: '反审核' }
    ],
    loadingShow: false
  }),
  actions: {
    // 给初始值赋值的时候
    async init() {
      const options = await tree.comTreeConfigurationTreeListPost()
      const { data } = options.data
      this.options = data
      this.getTreeFN()
      this.checkDropList = this.checkAllDropList
      this.tableColumn = JSON.parse(JSON.stringify(this.customList))
      this.tableColumn.push({
        label: '操作',
        btnShow: true,
        align: 'center',
        width: 119,
        fixed: 'right'
      })
    },

    // 获取树形的数据
    async getTreeFN() {
      let pfTag = null
      if (this.options.length > 0) {
        let list = this.options.filter((item: any) => {
          return item.code === this.selectVal
        })
        pfTag = list[0].tag
      } else {
        pfTag = 'MNGR_ID'
      }
      const res = await tree.comTreeConfigurationProductTreePost({
        treeId: this.selectVal,
        pfTag: pfTag
      })
      this.treeList = res.data.data
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data
    },

    //表格查询
    async inquire(val?: any, ref?: any) {
      console.log(val)

      if (!val.dBiz || this.checkedTreeNode.length == 0) {
        Message.warning('请选择日期和机构')
        return
      }
      this.loadingShow = true
      this.dBiz = val.dBiz
      this.tabList = this.checkedTreeNode.filter((i: any) => i.children.length == 0)
      this.tabFileName = this.tabFileName = !this.tabFileName
        ? this.tabList[0].name
        : this.tabFileName
      const res = await analytic.valueNewGetValueRecordsNewPost({
        ...val,
        ...{
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize,
          pfId: this.tabActiveId == '0' ? this.tabList[0].pfId : this.tabActiveId
        }
      })
      this.tableData = res.data.data
      this.pageInfo.total = res.data.totalCount
      ref ? ref.$refs.baseTable.getHeight() : ''
      this.loadingShow = false
    },

    pageChange(value: any) {
      this.pageInfo.startPage = value
      let val = {
        dBiz: this.dBiz
      }
      this.inquire(val)
    },
    sizeChange(value: any) {
      this.pageInfo.pageSize = value
      let val = {
        dBiz: this.dBiz
      }
      this.inquire(val)
    },
    //tab切换
    handleClick(tab?: any) {
      this.tabActiveId = tab.$attrs.value.pfId
      this.tabFileName = this.tabList[tab.index].name
      let val = {
        dBiz: this.dBiz
      }
      this.inquire(val)
    },

    //编辑
    edit(row?: any) {
      this.visible = true
      this.addData = row
    },

    // 抽屉关闭的时候
    handleClose(form: any) {
      form.resetFields()
      this.addVisible = false
      for (let k in this.addData) {
        this.addData[k] = ''
      }
      this.visible = false
    },
    // 点击保存的时候
    save(form: any) {
      form.validate(async (value: any) => {
        const res = await analytic.valueNewEditPost(this.addData)
        console.log(res)
        if (res.data.code === 'DM-A0001') {
          Message.success('修改成功')
        }
        let val = {
          dBiz: this.dBiz
        }
        this.inquire(val)
        this.handleClose(form)
      })
    },

    //审核
    async check(row?: any) {
      let ids = []
      ids.push(row.id)
      const res = await analytic.valueNewBatchAuditPost({
        data: ids,
        checked: row.cChecked == 0 ? 1 : 0
      })
      if (res.data.code === 'DM-A0001') {
        Message.success(row.cChecked == 0 ? '审核成功' : '反审核成功')
      }
      let val = {
        dBiz: this.dBiz
      }
      this.inquire(val)
    },

    // 表格多选
    handleSelectionChange(data: any) {
      this.selectionData = data
    },

    async handleCommand(val: any) {
      if (this.selectionData.length == 0) {
        Message.warning('未选择任何数据')
        return
      }
      const res = await analytic.valueNewBatchAuditPost({
        data: this.selectionData.map((i: any) => {
          return i.id
        }),
        checked: val == 0 ? 1 : 0
      })
      if (res.data.code === 'DM-A0001') {
        Message.success(val == 0 ? '批量审核成功' : '批量反审核成功')
      }
      let value = {
        dBiz: this.dBiz
      }
      this.inquire(value)
    },

    handleCheckAllChange(val: any) {
      this.checkDropList = val ? this.checkAllDropList : []
      this.isIndeterminate = false
    },

    handleCheckedChange(val: any) {
      let checkedCount = val.length
      this.checkAll = checkedCount === this.customList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.customList.length
    },
    saveList() {
      if (this.checkDropList.length == 0) {
        Message.warning('请选择至少一列')
        return
      }
      this.tableColumn = []
      this.customList.forEach(item => {
        this.checkDropList.includes(item.prop) && this.tableColumn.push(item)
      })
      if (this.tableColumn.length != 0) {
        this.tableColumn.push({
          label: '操作',
          btnShow: true,
          align: 'center',
          width: 119,
          fixed: 'right'
        })
      }
    },

    visibleChange() {
      this.checkDropList = []
      this.tableColumn.forEach(i => {
        if (i.prop) {
          this.checkDropList.push(i.prop)
        }
      })
      if (this.checkDropList.length == this.checkAllDropList.length) {
        this.isIndeterminate = false
        this.checkAll = true
      }
    },

    async export(ref?: any) {
      if (this.tableData.length == 0) {
        Message.warning('暂时没有可导出的数据')
        return
      }
      const res = await analytic.valueNewExportAllExcelPost(
        {
          param: this.tabList.map((i: any) => {
            return i.pfId
          }),
          fileName: this.tabFileName,
          dBiz: ref.$refs.myForm.model.dBiz
        },
        { responseType: 'blob' }
      )

      downloadFile(res)
    },

    async exportSrc(ref?: any) {
      const res = await analytic.valueNewExportAllExcelSrcPost(
        {
          param: this.tabList.map((i: any) => {
            return i.pfId
          }),
          fileName: this.tabFileName,
          dBiz: ref.$refs.myForm.model.dBiz
        },
        { responseType: 'blob' }
      )

      downloadFile(res)
    },
    clear() {
      this.$reset()
    },
    reset(){
      this.tableData=[]
    }
  }
})
