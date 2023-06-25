import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { lockValuationState } from '@services/types/dataShow/lockValuation'

//test
import { FactoryApi } from '@services/factoryApi'
import { ServiceVlaDataControllerApi, ServiceComTreeConfigurationControllerApi,ServiceDictControllerApi } from '@services/weiwai'
import { Message } from 'element-ui'
const vlaData = FactoryApi.createAPIInstance(ServiceVlaDataControllerApi)
const tree = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)

export const tableColumn: any = [
  { statusShow: true, label: "锁定状态", align: "center", width: '90' },
  { prop: "pfId", label: "产品代码", align: "center", width: '96' },
  { prop: "pfName", label: "专户名称", align: "center", width: '243' },
  { prop: "vlaDate", label: "估值日期", align: "center", width: '96' },
  { prop: "taskDate", label: "任务日期", align: "center", width: '96' },
  { prop: "delStateName", label: "处理状态", align: "center", width: '96' },
  { prop: "isUptoDateName", label: "邮件标记", align: "center", width: '96' },
  { prop: "errorWf", label: "失败步骤", align: "center", width: '120' },
  { prop: "lockUser", label: "锁定人", align: "center", width: '75' },
  { prop: "lockTime", label: "锁定时间", align: "center", width: '181' },
  { prop: "ad9", label: "文件路径", align: "center", width: '96' },
];

export const renderFrom: any = [
  {
    label: "任务日期:",
    key: "taskDate",
    // labelWidth: 80,
    type: "DatePicker",
    rowId: 1,
    span: 8,
  },
  {
    label: "估值日期:",
    key: "vlaDate",
    // labelWidth: 80,
    type: "DatePicker",
    rowId: 1,
    span: 8,
  },
  {
    label: "锁定状态:",
    key: "lockState",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8,
  },
  {
    label: "邮件标记:",
    key: "isUptoDate",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
    span: 8,
  },
  {
    label: "处理状态:",
    key: "delState",
    type: "Select",
    clearable: true,
    options: [],
    filterable: true,
    rowId: 1,
    filterMethod: true,
    reserveKeyword: true,
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
          _this.$emit("inquire", val.initData);
        },
      }
    ],
  },
];

const rules = {
  taskDate: [{ required: true, message: ' ', trigger: 'blur' }],
};


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
  rules,
  renderFrom: renderFrom,
};

export const lockValuationStore = defineStore('lockValuation', {
  state: (): lockValuationState => ({
    treeList: [],
    hasParent: false,
    checkedKeys: [],
    expandedKeys: [],
    resetScroll: false,
    showCheck: true,
    tableData: [],
    daterangeValue: '',
    options: [],
    selectVal: '1',
    activeName: '',
    checkedTreeNode: [],
    defaultProps: {
      label: 'name',
      children: 'children'
    },
    pageInfo: {
      total: 0,
      pageSize: 20,
      startPage: 1
    },
    tableColumn: tableColumn,
    formData: formData,
    setOptions: {},
    loadingShow: false,
    formObject:{}
  }),
  actions: {
    // 给初始值赋值的时候
    async init() {
      const options = await tree.comTreeConfigurationTreeListPost()
      const { data } = options.data
      this.options = data
      this.getTreeFN()
    },

    async initForm(formData: any) {
      const result = await dict.dicAllByClassIdPost({ classId: 'SD_ZT' })
      const result1 = await dict.dicAllByClassIdPost({ classId: 'email_mark' })
      const result2 = await dict.dicAllByClassIdPost({ classId: 'process_state' })
      formData.renderFrom[2].options = result.data.data
      formData.renderFrom[3].options = result1.data.data
      formData.renderFrom[4].options = result2.data.data
      return formData
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data;
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
   async inquire(val?: any) {
    if (!val.taskDate || this.checkedTreeNode.length == 0) {
      Message.warning('请选择日期和机构')
      return
    }
    this.formObject = val
    this.loadingShow = true
    const res = await vlaData.valDataLockGetVlaListPost({
      ...val,
      ...{ startPage: this.pageInfo.startPage, pageSize: this.pageInfo.pageSize, customerCode: this.checkedTreeNode.map((i:any) => i.id) }
    })
   
    this.tableData = res.data.data
    this.pageInfo.total = res.data.totalCount
    this.loadingShow = false
  },

  async lock(val, row){
    if(row.length == 0){
      Message.error('未选择任何数据')
      return
    }
   const res = await vlaData.valDataLockLockValPost({
       data: row,
       state: val
    })
    if(res){
      Message.success(val == 1 ? '解锁成功': '锁定成功')
    }
    this.inquire(this.formObject)
  },

    pageChange(val:any) {
      console.log(val)
      this.pageInfo.startPage = val
      this.inquire(this.formObject)
    },
    sizeChange(val: any) {
      this.pageInfo.pageSize = val
      this.inquire(this.formObject)
    },

    // async export() {
    //   await netWorth.netWorthExportExcelPost({
    //     startDate: this.daterangeValue[0],
    //     endDate: this.daterangeValue[1],
    //     startPage: this.pageInfo.startPage,
    //     pageSize: this.pageInfo.pageSize,
    //     pfId: this.tabActiveId,
    //   })
    // },

   
   
    // Reset UserInfoController's information
    resetInfo() {
      this.$reset()
    },

    // Get UserInfoController's information
    async info() {
      //test
      // await dict.dicAddPost({dicClassName: "", id: "", keyId: ""})
      // await dict.dicStatePost({ state: 0 })
      // dict.dicAllPost

      const res = await getUserInfo()

      const rtdata: any = res.data
      this.setInfo(rtdata.data)
    },

    // Logout
    async logout() {
      try {
        await userLogout()
      } finally {
      }
    }
  }
})
