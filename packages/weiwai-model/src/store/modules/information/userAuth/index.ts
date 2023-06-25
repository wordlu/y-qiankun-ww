import { defineStore } from 'pinia'
import { userAuthState } from '@services/types/userAuth'
import { FactoryApi } from '@services/factoryApi'
import { formData, tableColumn } from "./data";
import { Message } from 'element-ui'
import { 
  ServiceUserAuthorityInfoControllerApi,
  ServiceComTreeConfigurationControllerApi
} from '@services/weiwai'
const userAuthQuery = FactoryApi.createAPIInstance(ServiceUserAuthorityInfoControllerApi)
const comTreeQuery = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)

export const userAuthStore = defineStore('userAuth', {
  state: (): userAuthhState => ({
    formData,
    tableData: [],
    tableColumn,
    comTreeOptions: [],
    setOptions: {},
    selectionData: [],
    authVisible: false,
    dropdownList: [
      { value: "查看", name: "查看" },
      { value: "授权", name: "授权" },
    ],
    defaultProps: {
      children: "children",
      label: "name",
    },
    treeList: [],
    checkedKeys: [],
    expandedKeys: [],
    selectVal: '',
    pfTag: '',
    hasParent: false,
    showCheck: true,
    resetScroll: false,
    currentRow: null,
    loadingShow: false,
    defaultCheckedKeys: []
  }),
  actions: {
    reset(data: any) {
      this.inquire()
    },
    // 点击查询的时候
    async inquire(val?: any) {
      this.loadingShow = true
      const res = await userAuthQuery.userAuthorityInfoSearchPost({
        ...val
      })
      const { data } = res.data
      this.tableData = data
      this.loadingShow = false
    },
    async init(event) {
      this.event = event
      this.loadingShow = true
      //表格数据
      const list_res = userAuthQuery.userAuthorityInfoSearchPost()
      // 组合树下拉
      const comTreeOptionsArr_res = comTreeQuery.comTreeConfigurationGetPfTreeIdPost()
      // 树形数据
      // const getSynchroPfTree_res = comTreeQuery.comTreeConfigurationGetSynchroPfTreePost()

      const promiseAll = Promise.all([
        list_res, 
        comTreeOptionsArr_res, 
        // getSynchroPfTree_res
      ]);
      promiseAll.then(async (res) => {
        const list = res[0]
        const comTreeOptionsArr = res[1]
        // const getSynchroPfTree = res[2]
        // 表格数据
        this.tableData = list.data.data
        // 组合树下拉
        this.comTreeOptions = comTreeOptionsArr.data.data 
        // 树形数据
        // this.treeList = getSynchroPfTree.data.data
        // 树形科目体系下拉默认值
        this.selectVal = this.comTreeOptions[0].treeId
        this.pfTag = this.comTreeOptions[0].pfTag
        // this.getTreeData(this.selectVal)
        this.loadingShow = false
      });
    },
    async showAuth(row:any, type: string) {
      this.currentRow = row
      this.showCheck = true
      if (type === 'ck') this.showCheck = false
      this.authVisible = true

      // 已经选中数据
      const user_res = await userAuthQuery.userAuthorityInfoGetAuthInfoByUserPost({
        "userId": row.userId,
        "authorityType":""
      })
      this.defaultCheckedKeys = user_res.data.data.map(it => it.authorityInfo)
      // 树形数据
      this.searchChange(this.selectVal)
    },
    // 抽屉关闭的时候
    handleClose() {
      this.authVisible = false
      this.selectVal = this.comTreeOptions[0].treeId
      this.pfTag = this.comTreeOptions[0].pfTag
      this.event.$refs.tree.handleSetCheckedKeys([])
    },
    treeChange(data) {
      this.checkedKeys = data
    },
    async searchChange(val: string) {
      const selectItem = this.comTreeOptions.filter(it => it.treeId === val)[0]
      if (selectItem) {
        const res = await comTreeQuery.comTreeConfigurationGetSynchroPfTreePost({
          "treeId": selectItem.treeId,
          "pfTag": selectItem.pfTag
        })
        const { data } = res.data
        this.treeList = data
        //数据回显
        this.event.$nextTick(() => {
          console.log(111,this.defaultCheckedKeys)
          this.event.$refs.tree.handleSetCheckedKeys(this.defaultCheckedKeys)
        })
      }
    },
    async auth() {
      const tree_data = this.checkedKeys.map(it => {
        return {
            "authority_info": it.id,
            "authority_type": "RP"
          }
      })
      const params = {
        "userId": this.currentRow.userId,
        "data": tree_data
      }
      const res = await userAuthQuery.userAuthorityInfoSavePost(params) 
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success('保存成功!')
        this.handleClose()
        this.inquire()
      } else {
        Message.error(message)
      }
    },
    // 表格多选
    handleSelectionChange(data:any) {
      this.selectionData = data
    },
    // 控制当前是否禁用 返回值false禁用 true不禁用
    selectable(value:any) {
      return !value.disabled;
    },
    async handleStatus(data:any, status:number) {
      let idsArr = [], checked = 0
      if (data instanceof Array) {
        if (data.length < 1) {
          Message.warning('请先选择需要批量处理的数据！')
          return;
        }
        if (data.filter(it => Number(it.authSta) === 1).length > 0) {
          Message.warning('选中数据中包含未授权数据，请先进行授权操作！')
          return;
        }
        if (status === 0 && data.filter(it => Number(it.authSta) === 2).length > 0) {
          Message.warning('选中数据中包含已审核数据！')
          return;
        } 
        if (status === 1 && data.filter(it => Number(it.authSta) === 3).length > 0) {
          Message.warning('选中数据中包含未审核数据！')
          return;
        }
        idsArr = data.map(it => {
          return  {
            "userId": it.userId,
            "authorityType":""
          }
        })
        checked = Number(data[0].authSta) === 2 ? 0 : 1
      } else {
        if (Number(data.authSta) === 1) {
          Message.warning('当前数据未授权，请先进行授权操作！')
          return;
        }
        idsArr = [{
          "userId": data.userId,
          "authorityType":""
        }]
        checked = Number(data.authSta) === 2 ? 0 : 1
      }
      const res = await userAuthQuery.userAuthorityInfoCheckPost({
        "cChecked": checked,
        "data": idsArr
      })
      const { code, message } = res.data
      if (code === 'DM-A0001') {
        Message.success("处理成功")
        this.inquire()
      } else {
        Message.error(code)
      }
    },
    handleCommand(val:string, row: object) {
      if (val === "查看") this.showAuth(row, 'ck')
      if (val === "授权") this.showAuth(row, 'sq')
    },
  }
})
