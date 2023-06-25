<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="deparment.setOptions" @inquire="deparment.inquire"  @reset="deparment.reset"/>
    <BaseTable :tableData="deparment.tableData" :tableColumn="tableColumn" :pagination="true"
      @sizeChange="deparment.sizeChange" @pageChange="deparment.pageChange" :total="deparment.pageInfo.total"
      :serialShow="true" :pageInfo="deparment.pageInfo" :loadingShow="deparment.loadingShow">
      <span slot="multiple-operation">
        <el-button type="primary" @click="deparment.add">新增</el-button>
      </span>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="deparment.examine(row)">查看</el-button>
      </template>
    </BaseTable>
    <div class="drawer-col-1">
      <el-drawer :title="deparment.title" :visible="deparment.addVisible" direction="rtl"
        :before-close="() => deparment.handleClose($refs.form)" :wrapperClosable="false" :size="409">
        <el-form label-position="top" label-width="80px" :rules="rules" :model="deparment.addData" class="drawer"
          ref="form" :hide-required-asterisk="deparment.show">
          <el-form-item label="投顾机构代码:" prop="orgId">
            <el-input v-model="deparment.addData.orgId" placeholder="请输入" :disabled="deparment.show"></el-input>
          </el-form-item>
          <el-form-item label="投顾机构名称:" prop="orgName">
            <el-input v-model="deparment.addData.orgName" placeholder="请输入" :disabled="deparment.show"></el-input>
          </el-form-item>
          <el-form-item label="备注1:" prop="remark1">
            <el-input v-model="deparment.addData.remark1" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入" :disabled="deparment.show"></el-input>
          </el-form-item>
          <el-form-item label="备注2:" prop="remark2">
            <el-input v-model="deparment.addData.remark2" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请输入" :disabled="deparment.show"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" v-if="!deparment.show">
          <el-button  @click="() => deparment.handleClose($refs.form)">取消</el-button>
          <el-button  type="primary" @click="() => deparment.save($refs.form)">保存</el-button>
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
import { formData, tableColumn } from "../../../../../weiwai-model/src/store/modules/information/department/data";
import { departmentStore } from "@model/store/modules/information/department";

export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown },
  name: 'department',
  computed: {
    deparment() {
      const deparment = departmentStore();
      return deparment
    },
  },
  created() {
    this.deparment.inquire()
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
        orgId: '',
        orgName: '',
        remark1: '',
        remark2: '',
      },
      // 校验的数据
      rules: {
        orgId: [
          { required: true, message: '请输入投顾机构代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        orgName: [
          { required: true, message: '请输入投顾机构名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        remark1:[
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        remark2:[
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
      // let data = cloneDeep(row)
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
        orgId: '',
        orgName: '',
        remark1: '',
        remark2: '',
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
    this.deparment.clear()
  }
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>
<style lang="less"></style>