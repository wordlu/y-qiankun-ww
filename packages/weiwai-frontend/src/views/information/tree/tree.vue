<template>
  <div class="box">
    <BaseForm :form-data="formData" :set-options="setOptions" @inquire="treeStore.inquire" class="baseform"
      :optionsKey="treeStore.optionsKey" />
    <div class="tree" :style="[{ 'height': `${treeStore.height}px` }, { 'max-height': `${treeStore.height}px` }]">
      <div class="search">
        <el-input class="input" size="small" placeholder="快速检索[请输入名称]" v-model="treeStore.filterText"></el-input>

        <i class="el-icon-d-arrow-left icon" @click="() => treeStore.packAll($refs.treeTwo)"></i>
        <i class="el-icon-d-arrow-right icon" @click="() => treeStore.unfoldAll($refs.treeTwo)"></i>
        <el-button type="primary" class="btn" @click="treeStore.add">新增</el-button>
      </div>
      <el-tree :data="treeStore.treeData" :props="treeStore.defaultProps" :expand-on-click-node="false" ref="treeTwo"
        node-key="id" :filter-node-method="treeStore.filterNodeTwo" :default-expand-all="true"
        :style="[{ 'height': `${treeStore.height - 70}px` }, { 'max-height': `${treeStore.height - 70}px` }, { 'overflow': 'auto' }]">
        <span class=" custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span class="span-button">
            <!-- <i class="el-icon-d-arrow-left icon" @click=" () => treeStore.pack(data, $refs.treeTwo) "
            v-if=" node.childNodes.length > 0 "></i>
          <i class="el-icon-d-arrow-right icon" @click=" () => treeStore.unfold(data, $refs.treeTwo) "
            v-if=" node.childNodes.length > 0 "></i> -->
            <!-- <i class="el-icon-folder-add icon" @click="() => treeStore.open(data, $refs.treeTwo)"></i>
            <i class="el-icon-circle-plus-outline icon" @click="() => treeStore.addNode(data, $refs.treeTwo)"></i> -->
            <!-- <i class="el-icon-delete icon" @click="() => treeStore.del(data, $refs.treeTwo)"></i> -->
          </span>
        </span>
      </el-tree>
      <div class="drawer-col-1">
        <el-drawer :title="treeStore.title" :visible="treeStore.addVisible" direction="rtl"
          :before-close="() => treeStore.handleClose($refs.form)" :wrapperClosable="false" :size="410"
          @open="treeStore.drawerOpen">
          <el-form label-position="top" label-width="80px" :rules="rules" :model="treeStore.addData"
            class="drawer last-element" ref="form">
            <div v-if="treeStore.type === 'combination'">
              <el-form-item label="树名称:" prop="pfChildName">
                <el-input v-model="treeStore.addData.pfChildName"></el-input>
              </el-form-item>
              <el-form-item label="树类型" prop="treeType">
                <el-select v-model="treeStore.addData.treeType" placeholder="请选择">
                  <el-option v-for=" item  in  treeStore.optionOne " :key="item.keyId" :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="标签字段" prop="pfTag" v-if="treeStore.addData.treeType === 'TAGTREE'">
                <el-select v-model="treeStore.addData.pfTag" placeholder="请选择">
                  <el-option v-for=" item  in  treeStore.optionTwo " :key="item.keyId" :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="用户" prop="wfMode">
                <el-select v-model="treeStore.addData.userIds" placeholder="请选择" multiple>
                  <el-option v-for="item in treeStore.optionThree" :key="item.keyId" :label="item.keyName" :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item> -->
            </div>
            <div v-else-if="treeStore.type === 'tier'">
              <el-form-item label="节点名称:" prop="pfChildName">
                <el-input v-model="treeStore.pfChildName"></el-input>
              </el-form-item>
            </div>
            <div v-else-if="treeStore.type === 'edit'">
              <el-form-item label="节点名称:" prop="newName">
                <el-input v-model="treeStore.newName"></el-input>
              </el-form-item>
            </div>
            <div v-else>
              <el-input class="input" size="small" placeholder="快速检索[请输入名称]"
                v-model="treeStore.filterTextTwo"></el-input>
              <el-tree :data="treeStore.groupData" :props="treeStore.defaultProps" :expand-on-click-node="false"
                ref="tree" node-key="id" :filter-node-method="treeStore.filterNode" show-checkbox
                :check-strictly="true" @check-change="treeStore.handleCheckChange" @check="treeStore.treeCheck">
              </el-tree>
            </div>
          </el-form>
          <div class="btn">
            <el-button  @click="() => treeStore.handleClose($refs.form)">取消</el-button>
            <el-button  type="primary" @click="() => treeStore.save($refs.form)">保存</el-button>
          </div>
        </el-drawer>
      </div>

    </div>

  </div>
</template>

<script lang='ts'>
import BaseForm from "@/components/BaseForm/index.vue";
import { formData } from "../../../../../weiwai-model/src/store/modules/information/tree/data";
import Vue from 'vue';
import { treeStore } from "@model/store/modules/information/tree";

export default Vue.extend({
  name: 'tree',
  components: { BaseForm },
  computed: {
    treeStore() {
      const tree = treeStore();
      return tree
    },
  },
  data() {
    return {
      height: null,
      formData,
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
      optionOne: [
      ],
      optionTwo: [],
      optionThree: [],
      rules: {
        pfChildName: [
          { required: true, message: `不能为空`, trigger: 'blur' },
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        treeType: [
          { required: true, message: '请选择数类型', trigger: 'blur' },
        ],
        pfTag: [
          { required: true, message: '请选择标签字段', trigger: 'blur' },
        ],
      },
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
      newName: ''
    }
  },
  watch: {
    filterTextTwo(val) {
      this.$refs.tree.filter(val);
    },
    'treeStore.filterText'(val) {
      this.$refs.treeTwo.filter(val);
    },
  },
  created() {
    this.treeStore.init(this.formData)
    this.treeStore.inquire()
  },
  methods: {
    // 获取tree的高度
    getHeight() {
      this.$nextTick(() => {
        this.height = document.querySelector('.box').clientHeight - document.querySelector('.baseform').clientHeight - 16 - 16
      })
    },
    // 点击查询的时候
    inquire(val: any) {
      console.log(this.formData);

    },
    // 点击全部展开的时候
    unfoldAll() {
      for (var i = 0; i < this.$refs.treeTwo.store._getAllNodes().length; i++) {
        this.$refs.treeTwo.store._getAllNodes()[i].expanded = true;
      }
    },
    // 点击全部收缩的时候
    packAll() {
      for (var i = 0; i < this.$refs.treeTwo.store._getAllNodes().length; i++) {
        this.$refs.treeTwo.store._getAllNodes()[i].expanded = false;
      }
    },
    // 点击展开的时候
    unfold(data: any) {
      this.$refs.treeTwo.store.nodesMap[data.id].expanded = true;
      this.recursion(data.children, 'treeTwo')
    },
    // 点击收起的时候
    pack(data: any) {
      this.$refs.treeTwo.store.nodesMap[data.id].expanded = false;
      this.recursionTwo(data.children, 'treeTwo')
    },
    // 点击添加节点的时候
    open(data: any) {
      this.title = '添加层级'
      this.addVisible = true
      this.type = 'tier'
      this.row = data
    },
    // 点击删除的时候
    del(data: any) {
      this.$confirm('确定要删除内容么?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'globalMessageDel'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    filterNodeTwo(value: any, data: any) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 双击点击编辑的时候
    editName(data: any) {
      this.type = 'edit'
      this.title = '修改节点'
      this.addVisible = true
    },
    // 单点展开的递归
    recursion(data: any, tree: any) {
      const recursion1 = (data1: any) => {
        for (let i = 0; i < data1.length; i++) {
          this.$refs[tree].store.nodesMap[data1[i].id].expanded = true
          if (data1[i].children && data1[i].children.length > 0) {
            recursion1(data1[i].children)
          }
        }
      }
      recursion1(data)
    },
    // 单点收起的递归
    recursionTwo(data: any, tree: any) {
      const recursion1 = (data1) => {
        for (let i = 0; i < data1.length; i++) {
          this.$refs[tree].store.nodesMap[data1[i].id].expanded = false
          if (data1[i].children && data1[i].children.length > 0) {
            recursion1(data1[i].children)
          }
        }
      }
      recursion1(data)
    },
    // 弹框关闭的时候
    handleClose() {
      this.addVisible = false
      this.addData = {
        pfChildName: '',
        treeType: '',
        pfTag: '',
        userIds: []
      }
      this.type = '',
        this.row = null
    },
    // 抽屉打开的时候
    drawerOpen() {
      this.getGroupData()

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
    save() {
      this.$refs.form.validate((value: any) => {
        console.log(value);
      })
    },
    // ◆◆◆ 添加节点的功能  ◆◆◆◆

    filterNode(value: any, data: any) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
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
      this.groupData = recursion(list)
    }
  },
  mounted() {
    this.treeStore.getHeight()
  }
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";

.box {
  width: 808px;
  height: 100%;

  .tree {
    background-color: #fff;
    padding: 16px 16px 0 16px;
    height: 100%;

    .search {
      margin-bottom: 22px;
      line-height: 20px;

      .btn {
        float: right;
        padding: 8px 15px !important;
        border-radius: 2px !important;
        background-color: #2F6AFF;
        border-color: #3371ff;
      }

      .icon {
        margin-left: 20px;
        vertical-align: middle;

      }

      .el-icon-d-arrow-left {
        transform: rotate(88deg);
      }

      .el-icon-d-arrow-right {
        transform: rotate(88deg);

      }

      .input {
        width: 300px;
      }
    }

    .el-tree {
      ::v-deep .el-tree-node__content {
        height: 36px;

        .custom-tree-node {
          line-height: 36px;
        }
      }
    }

    .custom-tree-node {
      width: 100%;

      .span-button {
        float: right;

        .el-icon-d-arrow-left {
          transform: rotate(88deg);
        }

        .el-icon-d-arrow-right {
          transform: rotate(88deg);

        }
      }
    }

  }
}</style>