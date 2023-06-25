import { defineStore } from 'pinia'
import { penetrationState } from '@services/types/dataShow/penetrationReport'
import { downloadFile } from "../../../../utils/utils";

//test
import { FactoryApi } from '@services/factoryApi'
import { ServicePenetrateReportControllerApi, ServiceComTreeConfigurationControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const penetration = FactoryApi.createAPIInstance(ServicePenetrateReportControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)

export const renderFrom: any = [
  {
    label: "估值日期:",
    key: "dataTime",
    // labelWidth: 80,
    type: "DatePicker",
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
      }
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

export const penetrationStore = defineStore('penetration', {
  state: (): penetrationState => ({
    treeList: [],
    setOptions: {},
    hasParent: false,
    checkedKeys: [],
    expandedKeys: [],
    resetScroll: false,
    showCheck: true,
    tableData: [],
    dataTime: '',
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
    formData: formData,
    tableColumn: [
      { prop: 'smPrdCode', label: '私募产品代码', align: 'center', width: '110' },
      { prop: 'smPrdName', label: '私募产品名称', align: 'center', width: '243' },
      { prop: 'lcPrdCode', label: '理财产品代码', align: 'center', width: '110' },
      { prop: 'lcPrdName', label: '理财产品名称', align: 'center', width: '243' },
      { prop: 'dataTime', label: '数据时点', align: 'center', width: '96' },
      { prop: 'incInvestment', label: '固定收益投资', align: 'center', width: '110' },
      { prop: 'equInvestment', label: '权益投资', align: 'center', width: '96' },
      { prop: 'derInvestment', label: '金融衍生品投资', align: 'center', width: '140' },
      { prop: 'othInvestment', label: '商品及其他投资', align: 'center', width: '140' },
      { prop: 'gmPrdTotal', label: '公募资管产品总额', align: 'center', width: '140' },
      { prop: 'smAssetsTotal', label: '私募资管计划资产合计', align: 'center', width: '180' },
      { prop: 'lcSmShare', label: '理财产品持有私募资管计划份额', align: 'center', width: '220' }
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
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data
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
    //表格查询
    async inquire(val?: any, ref?: any) {
      if (!val.dataTime || this.checkedTreeNode.length == 0) {
        Message.warning('请选择日期和机构')
        return
      }
      this.loadingShow = true
      this.dataTime = val.dataTime
      this.tabList = this.checkedTreeNode.filter((i: any) => i.children.length == 0)
      this.tabFileName = !this.tabFileName ? this.tabList[0].name : this.tabFileName
      const res = await penetration.penetrateReportGetListPost({
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

    pageChange(val: any) {
      console.log(val)
      this.pageInfo.startPage = val
      this.inquire()
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire()
    },

    handleClick(tab?: any) {
      this.tabActiveId = tab.$attrs.value.pfId
      this.tabFileName = this.tabList[tab.index].name
      let val = {
        dataTime: this.dataTime
      }
      this.inquire(val)
    },

    async export(ref: any) {
      if (this.tableData.length == 0) {
        Message.warning('暂时没有可导出的数据')
        return
      }
      const res = await penetration.penetrateReportExportExcelPost(
        {
          param: this.tabList.map((i: any) => {
            return i.pfId
          }),
          ...ref.$refs.myForm.model,
          fileName: this.tabFileName,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )

      downloadFile(res)
    },
    async mergeExport(ref: any) {
      if (this.tableData.length == 0) {
        Message.warning('暂时没有可导出的数据')
        return
      }
      const res = await penetration.penetrateReportExportMergeExcelPost(
        {
          param: this.tabList.map((i: any) => {
            return i.pfId
          }),
          ...ref.$refs.myForm.model,
          fileName: this.tabFileName,
          startPage: this.pageInfo.startPage,
          pageSize: this.pageInfo.pageSize
        },
        { responseType: 'blob' }
      )

      downloadFile(res)
    },
    clear() {
      this.$reset()
    }
  }
})
