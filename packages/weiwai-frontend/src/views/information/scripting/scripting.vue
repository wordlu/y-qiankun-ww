<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="scripting.setOptions" @inquire="scripting.inquire"  @reset="scripting.reset"/>
    <BaseTable :tableData="scripting.tableData" :tableColumn="tableColumn" :pagination="true"
      :total="scripting.pageInfo.total" selection="multiple" :serialShow="true" :pageInfo="scripting.pageInfo" @sizeChange="scripting.sizeChange" @pageChange="scripting.pageChange" :loadingShow="scripting.loadingShow">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <BaseDropdown buttonName="批量操作" :dropdownList="dropdownList"
          @handleCommand="(val) => scripting.handleCommand(val, selectionData)"></BaseDropdown>
        <el-button type="primary" @click="scripting.add">新增</el-button>
      </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="scripting.examine(row)">查看</el-button>
        <el-button type="text" size="mini" @click="scripting.edit(row)">编辑</el-button>
      </template>
    </BaseTable>
    <div class="drawer-col-1">
      <el-drawer :title="scripting.title" :visible="scripting.addVisible" direction="rtl"
        :before-close="() => scripting.handleClose($refs.form)" :wrapperClosable="false" :size="409" @open="scripting.open">
        <el-form label-position="top" label-width="80px" :rules="rules" :model="scripting.addData"
          class="drawer last-element" ref="form" :hide-required-asterisk="scripting.show">
          <el-form-item label="工作流类型" prop="wfMode">
            <el-select v-model="scripting.addData.wfMode" placeholder="请选择" :disabled="scripting.show" filterable>
              <el-option v-for="item in scripting.optionOne" :key="item.keyId" :label="item.keyName" :value="item.keyId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作流中文名:" prop="wfName">
            <el-input v-model="scripting.addData.wfName" :disabled="scripting.show"></el-input>
          </el-form-item>
          <el-form-item label="工作流地址:" prop="wfId">
            <el-input v-model="scripting.addData.wfId" :disabled="scripting.show"></el-input>
          </el-form-item>
          <el-form-item label="最大执行时间(秒):" prop="maxRuntime">
            <el-input v-model="scripting.addData.maxRuntime" :disabled="scripting.show"></el-input>
          </el-form-item>
          <el-form-item label="上级步骤">
            <el-select v-model="scripting.addData.wfDatatype" :disabled="scripting.show" filterable>
              <el-option v-for="item in scripting.optionTwo" :key="item.keyId" :label="item.keyName" :value="item.keyId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务属性" prop="wfAttr">
            <el-select v-model="scripting.addData.wfAttr" :disabled="scripting.show" filterable>
              <el-option v-for="item in scripting.optionThree" :key="item.keyId" :label="item.keyName"
                :value="item.keyId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工作流描述:" prop="wfDesc">
            <el-input v-model="scripting.addData.wfDesc" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
              :disabled="scripting.show"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn" v-if="!scripting.show">
          <el-button  @click="() => scripting.handleClose($refs.form)">取消</el-button>
          <el-button  type="primary" @click="() => scripting.save($refs.form,formData)">保存</el-button>
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
import { formData, tableColumn } from "../../../../../weiwai-model/src/store/modules/information/scripting/data";
// import {cloneDeep} from 'lodash'
import { scriptingStore } from "@model/store/modules/information/scripting";

export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown },
  name: 'scripting',
  computed: {
    scripting() {
      const scripting = scriptingStore();
      return scripting
    },
  },
  data() {
    let validatorNum = (rule: any, value: any, callback: any)=>{
      if (value<=1800) {
        callback()
      }else{
        callback(new Error('最大数值不能超过1800'));
      }
    }
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
        wfMode: '',
        wfName: '',
        wfId: '',
        maxRuntime: '',
        wfDatatype: '',
        wfAttr: '',
        wfDesc: '',
      },
      // 校验的数据
      rules: {
        wfMode: [
          { required: true, message: '请选择工作流类型', trigger: 'blur' },
        ],
        wfName: [
          { required: true, message: '请输入工作流中文名', trigger: 'blur' },
          { min: 1, max: 100, message: '不能超过100个字符', trigger: 'blur' },

        ],
        wfId: [
          { required: true, message: '请输入工作流地址', trigger: 'blur' },
        ],
        maxRuntime: [
          { required: true, message: '请输入最大执行时间', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: "只能输入数字",
            trigger: "blur",
          },
          { validator: validatorNum, trigger: 'blur' }
        ],
        wfAttr: [
          { required: true, message: '请选择业务属性', trigger: 'blur' },
        ],
        wfDesc:[
          { min: 1, max: 250, message: '不能超过250个字符', trigger: 'blur' },
        ]
      },
      // 控制是否禁用
      show: false,
      // 抽屉的名字
      title: '',
      dropdownList: [
        { value: '启用', name: '启用' },
        { value: '禁用', name: '禁用' },
        { value: '删除', name: '删除' },
      ],
      // 工作流类型option
      optionOne: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      // 上级步骤option
      optionTwo: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      // 业务属性option
      optionThree: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
    }
  },
  async created() {
    this.formData = await this.scripting.init(this.formData)
    this.scripting.inquire()
  },
  methods: {
    // 点击查询的时候
    inquire(data: any) {
      console.log(data);
    },
    // 点击查看的时候
    examine(row: any) {
      console.log(row);

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
    // 点击编辑的时候
    edit(row: any) {
      this.title = '编辑'
      this.addVisible = true
      this.addData = row
    },
    // 抽屉关闭的时候
    handleClose() {
      this.$refs.form.resetFields()
      this.show = false
      this.addVisible = false

    },
    // 点击保存的时候
    save() {
      this.$refs.form.validate((value: any) => {
        console.log(value);
      })
    },
    // 点击批量操作的时候
    handleCommand(val: any, data: any) {
      if (data.length === 0) {
        this.$message.error('未选择任何数据')
      }
      if (val === '启用') {
      } else if (val === '禁用') {
      } else { }

    }
  },
  beforeDestroy() {
    this.scripting.clear()
  },
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>
<style lang="less"></style>