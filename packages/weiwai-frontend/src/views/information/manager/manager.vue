<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="manager.setOptions" @inquire="manager.inquire"  @reset="manager.reset"/>
    <BaseTable :tableData="manager.tableData" :tableColumn="tableColumn" :pagination="true"
      :total="manager.pageInfo.total" @sizeChange="manager.sizeChange" @pageChange="manager.pageChange" :serialShow="true"
      :pageInfo="manager.pageInfo" :loadingShow="manager.loadingShow">
      <span slot="multiple-operation">
        <el-button type="primary" @click="manager.add">新增</el-button>
      </span>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="manager.examine(row)">查看</el-button>
      </template>
    </BaseTable>
    <div class="drawer-col-1">
      <el-drawer :title="manager.title" :visible="manager.addVisible" direction="rtl"
        :before-close="() => manager.handleClose($refs.form)" :wrapperClosable="false" :size="409">
        <el-form label-position="top" label-width="80px" :rules="rules" :model="manager.addData" class="drawer" ref="form"
          :hide-required-asterisk="manager.show">
          <el-form-item label="投资经理代码:" prop="investMgr">
            <el-input v-model="manager.addData.investMgr" placeholder="请输入" :disabled="manager.show"></el-input>
          </el-form-item>
          <el-form-item label="投资经理名称:" prop="mgrName">
            <el-input v-model="manager.addData.mgrName" placeholder="请输入" :disabled="manager.show"></el-input>
          </el-form-item>
          <el-form-item label="投资部门代码:" prop="investDep">
            <el-input v-model="manager.addData.investDep" placeholder="请输入" :disabled="manager.show"></el-input>
          </el-form-item>
          <el-form-item label="投资部门名称:" prop="depName">
            <el-input v-model="manager.addData.depName" placeholder="请输入" :disabled="manager.show"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" v-if="!manager.show">
          <el-button  @click="() => manager.handleClose($refs.form)">取消</el-button>
          <el-button  type="primary" @click="() => manager.save($refs.form)">保存</el-button>
        </div>
      </el-drawer>
    </div>

  </div>
</template>

<script lang='ts'>
import '@/styles/commonStyle.less'
import Vue from 'vue';
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue'
import { formData, tableColumn } from "../../../../../weiwai-model/src/store/modules/information/manager/data";
import { managerStore } from "@model/store/modules/information/manager";

export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown },
  name: 'manager',
  computed: {
    manager() {
      const manager = managerStore();
      return manager
    },
  },
  created() {
    this.manager.inquire()
  },
  data() {
    return {
      setOptions: {},
      formData,
      tableData: [
      ],
      tableColumn,
      // 分页的数据
      pageInfo: {
        total: 100,
        pageSize: 10,
        pageCount: 1
      },
      // 抽屉的显示
      addVisible: false,
      // 抽屉中的数据
      addData: {
        investMgr: '',
        mgrName: '',
        investDep: '',
        depName: '',
      },
      // 校验的数据
      rules: {
        investMgr: [
          { required: true, message: '请输入投资经理代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        mgrName: [
          { required: true, message: '请输入投资经理名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        investDep: [
          { required: true, message: '请输入投资部门代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        depName: [
          { required: true, message: '请输入投资部门名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ]
      },
      // 控制是否禁用
      show: false,
      // 抽屉的名字
      title: ''
    }
  },
  methods: {
    // 点击查询的时候
    inquire(data: any) {
      console.log(data);
    },
    // 点击查看的时候
    examine(row: any) {
      this.title = '查看'
      this.show = true
      this.addVisible = true
      this.addData = row
    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    // 抽屉关闭的时候
    handleClose() {
      this.$refs.form.resetFields()
      this.show = false
      this.addVisible = false
      this.addData = {
        investMgr: '',
        mgrName: '',
        investDep: '',
        depName: '',
      }
    },
    // 点击保存的时候
    save() {
      this.$refs.form.validate((value: any) => {
        console.log(value);

      })
    }
  },
  beforeDestroy() {
    this.manager.clear()
  },
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>
<style lang="less"></style>