import { defineStore } from 'pinia'
import { getUserInfo, logout as userLogout } from '@services/UserInfoController'
import { treeState } from '@services/types/dictionary'
//test
import { FactoryApi } from '@services/factoryApi'
import {
  ServiceDictControllerApi,
  ServiceSpecialStrategyControllerApi,
  ServiceMasterDataManagementControllerApi,
  ServiceComTreeConfigurationControllerApi
} from '@services/weiwai'
import { Message } from 'element-ui'
const dict = FactoryApi.createAPIInstance(ServiceDictControllerApi)
const mana = FactoryApi.createAPIInstance(ServiceSpecialStrategyControllerApi)
const mast = FactoryApi.createAPIInstance(ServiceMasterDataManagementControllerApi)
const com = FactoryApi.createAPIInstance(ServiceComTreeConfigurationControllerApi)
// 编辑需要修改接口  导出还没做
export const treeStore = defineStore('treeState', {
  state: (): treeState => ({
    height: null,
    setOptions: {},
    // 检索的值
    filterText: '',
    // 树形的数据
    treeData: [],
    defaultProps: {
      label: 'name',
      children: 'children'
    },
    // 抽屉的名称
    title: '',
    addVisible: false,
    addData: {
      pfChildName: '',
      treeType: '',
      pfTag: '',
      userIds: []
    },
    optionOne: [],
    optionTwo: [],
    optionThree: [],
    // 控制抽屉中显示哪些form表单
    type: '',
    // 添佳节点的值
    pfChildName: '',
    // 当前树节点的值
    row: null,
    // 抽屉树形选中的数据
    groupData: [],
    // 抽屉树形绑定的数据
    pitchGroup: [],
    // 抽屉树形筛选的值
    filterTextTwo: '',
    // 修改节点名称的数据
    newName: '',
    optionsKey: {
      key: 'treeId',
      value: 'pfChildName'
    },
    combination: [],
    formObject: {}
  }),
  actions: {
    // 获取组合树
    async init(formData?: any) {
      if (formData) {
        this.formObject = formData
      }
      const res = await com.comTreeConfigurationGetPfTreeIdPost()
      this.combination = res.data.data
      this.formObject.renderFrom[0].options = res.data.data
      this.formObject.initData.treeId = '1'
    },
    getHeight() {
      console.dir(document.querySelector('.baseform').clientHeight)
      this.height =
        document.body.clientHeight -
        //导航栏的高度 body的内边距  页签的高度  form表单的下边距
        document.querySelector('.baseform').clientHeight -
        56 -
        32 -
        50 -
        16
    },
    // 点击查询的时候
    async inquire(val: any) {
      let pfTag = null
      let treeId = null
      if (val) {
        const list = this.combination.filter((item: any) => {
          return item.treeId === val.treeId
        })
        console.log(list)

        pfTag = list[0].pfTag
        treeId = list[0].treeId
      } else {
        pfTag = 'MNGR_ID'
        treeId = '1'
      }
      const res = await com.comTreeConfigurationGetSynchroPfTreePost({
        treeId,
        pfTag
      })
      this.treeData = res.data.data
    },
    // 点击全部展开的时候
    unfoldAll(ref: any) {
      for (var i = 0; i < ref.store._getAllNodes().length; i++) {
        ref.store._getAllNodes()[i].expanded = true
      }
    },
    // 点击全部收缩的时候
    packAll(ref: any) {
      for (var i = 0; i < ref.store._getAllNodes().length; i++) {
        ref.store._getAllNodes()[i].expanded = false
      }
    },
    // 点击展开的时候
    unfold(data: any, ref: any) {
      ref.store.nodesMap[data.id].expanded = true
      this.recursion(data.children, ref)
    },
    // 点击收起的时候
    pack(data: any, ref: any) {
      ref.store.nodesMap[data.id].expanded = false
      this.recursionTwo(data.children, ref)
    },
    // 点击添加节点的时候
    open(data: any, ref: any) {
      this.title = '添加层级'
      this.addVisible = true
      this.type = 'tier'
      this.row = data
    },
    // 点击删除的时候
    del(data: any, ref: any) {
      this.$confirm('确定要删除内容么?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    filterNodeTwo(value: any, data: any) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    // 双击点击编辑的时候
    editName(data: any) {
      this.type = 'edit'
      this.title = '修改节点'
      this.addVisible = true
    },
    // 单点展开的递归
    recursion(data: any, ref: any) {
      const recursion1 = (data1: any) => {
        for (let i = 0; i < data1.length; i++) {
          ref.store.nodesMap[data1[i].id].expanded = true
          if (data1[i].children && data1[i].children.length > 0) {
            recursion1(data1[i].children)
          }
        }
      }
      recursion1(data)
    },
    // 单点收起的递归
    recursionTwo(data: any, ref: any) {
      const recursion1 = data1 => {
        for (let i = 0; i < data1.length; i++) {
          ref.store.nodesMap[data1[i].id].expanded = false
          if (data1[i].children && data1[i].children.length > 0) {
            recursion1(data1[i].children)
          }
        }
      }
      recursion1(data)
    },
    // 弹框关闭的时候
    handleClose(ref: any) {
      ref.resetFields()
      this.addVisible = false
      this.addData = {
        pfChildName: '',
        treeType: '',
        pfTag: '',
        userIds: []
      }
      this.type = ''
      this.row = null
    },
    // 抽屉打开的时候
    drawerOpen() {
      // 处理组合树的数据
      // this.getGroupData()
      if (this.type === 'combination') {
        this.getFieldFN()
        this.getDictionaries()
      }
    },
    // 点击新增的时候
    add() {
      this.title = '组合树新增'
      this.type = 'combination'
      this.addVisible = true
    },
    // 添佳节点的时候
    addNode(data: any) {
      this.title = '添加节点'
      this.addVisible = true
      this.row = data
    },
    // 点击保存的时候
    save(ref: any) {
      ref.validate(async (value: any) => {
        // console.log(value)
        if (value) {
          const { pfChildName, treeType, pfTag } = this.addData
          const res = await com.comTreeConfigurationAddPost({
            parentName: '',
            pfParentId: '-1',
            nodeSeq: '',
            orLeafnode: 'false',
            treeId: '',
            pfChildId: '',
            nodeLevel: '1',
            pfChildName,
            treeType,
            pfTag
          })
          if (res.data.code === 'DM-A0001') {
            Message.success('添加成功')
            this.handleClose(ref)
            this.init()
          }
        }
      })
    },
    // ◆◆◆ 添加节点的功能  ◆◆◆◆

    filterNode(value: any, data: any) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheckChange(data: any, checked: any) {
      this.pitchGroup = data
    },
    // 实现单选
    treeCheck(data: any, list: any) {
      if (list.checkedKeys.length === 2) {
        this.$refs.tree.setCheckedKeys([data.id])
      }
    },
    getGroupData() {
      const recursion = (data: any) => {
        data.forEach((item: any) => {
          if (item.children.length > 0) {
            item.disabled = true
            recursion(item.children)
          }
        })
        return data
      }
      this.groupData = recursion(this.treeData)
    },
    // 获取标签字段
    async getFieldFN() {
      const res = await dict.dicAllByClassIdPost({ classId: '7906' })
      this.optionTwo = res.data.data
    },
    // 获取数类型
    async getDictionaries() {
      const res = await dict.dicAllByClassIdPost({ classId: '7016' })
      this.optionOne = res.data.data
    }
    // 获取组合
    // getCombination(){
    //   const res = await
    // }
  }
})
