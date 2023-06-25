<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="setOptions" @inquire="organ.inquire"  @reset="organ.reset"/>
    <BaseTable :tableData="organ.tableData" :tableColumn="tableColumn" :pagination="true" :total="organ.pageInfo.total"
      :serialShow="true" :pageInfo="organ.pageInfo" @pageChange="organ.pageChange" @sizeChange="organ.sizeChange"
      :loadingShow="organ.loadingShow">
      <span slot="multiple-operation">
        <el-button type="primary" @click="organ.add">新增</el-button>
      </span>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="organ.examine(row)" v-if="row.cchecked === 1">查看</el-button>
        <el-button type="text" size="mini" @click="organ.unaudit(row)" v-if="row.cchecked === 1">反审核</el-button>
        <el-button type="text" size="mini" @click="organ.edit(row)" v-if="row.cchecked === 0">编辑</el-button>
        <BaseDropdown v-if="row.cchecked === 0" textName="更多" :dropdownList="dropdownList"
          @handleCommand="(val) => organ.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <div class="drawer-col-2">
      <el-drawer :title="organ.title" :visible="organ.addVisible" direction="rtl"
        :before-close="() => organ.handleClose($refs.form, $refs.edit)" :wrapperClosable="false" @open="open" :size="795">
        <el-form label-position="top" label-width="80px" :rules="rules" :model="organ.addData" class="drawer" ref="form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构名称:" prop="orgName">
                <el-input v-model="organ.addData.orgName" placeholder="请输入"
                  :disabled="organ.creditshow || organ.show"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构简称:" prop="orgSname">
                <el-input v-model="organ.addData.orgSname" placeholder="请输入" :disabled="organ.show"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="统一社会信用代码:" prop="orgCode">
                <el-input v-model="organ.addData.orgCode" placeholder="请输入"
                  :disabled="organ.creditshow || organ.show"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="财汇代码:" prop="note1">
                <el-input v-model="organ.addData.note1" placeholder="请输入" :disabled="organ.show"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注 :" prop="note2">
                <el-input v-model="organ.addData.note2" placeholder="请输入" :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea" :disabled="organ.show"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <EditTable title="机构扩展信息" :table-column-list="tableColumnList" :formData="organ.formData1" :isEdit="organ.isEdit"
          :showOption="organ.isEdit" :show="organ.editShow" :recordCreatorProps="{ record: defaultRow }"
          class="last-element" ref="edit">
          <template slot="operate" slot-scope="{row,editRowIndex}" v-if="organ.isEdit">
            <el-popconfirm title="删除此行？" @confirm="organ.onDelete(row, editRowIndex)">
              <span class="icon iconfont" slot="reference" @click.stop>&#xe679;</span>
            </el-popconfirm>
          </template>
        </EditTable>
        <div class="btn">
          <el-button @click="() => organ.handleClose($refs.form, $refs.edit)">取消</el-button>
          <el-button type="primary" @click="() => organ.save($refs.form, $refs.edit)"
            v-if="organ.title !== '查看'">保存</el-button>
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
import EditTable from '@/views/information/baseTable/index.vue';
import { formData, tableColumn, tableColumnList, defaultRow } from "../../../../../weiwai-model/src/store/modules/information/organizationInfo/data";
import { organizationStore } from "@model/store/modules/information/organizationInfo";
import { cloneDeep } from 'lodash';
export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown, EditTable },
  name: 'organizationInfo',
  computed: {
    organ() {
      const organ = organizationStore();
      return organ
    },
  },
  data() {
    return {
      defaultRow,
      formData1: {
        tableData: []
      },
      tableColumnList,
      setOptions: {},
      formData,
      tableColumn,
      // 分页的数据
      pageInfo: {
        total: 100,
        pageSize: 10,
        pageCount: 1
      },
      dropdownList: [
        { value: '查看', name: '查看' },
        { value: '删除', name: '删除' },
        { value: '审核', name: '审核' },
      ],
      // 抽屉的显示
      addVisible: false,
      // 抽屉中的数据
      addData: {
        orgName: '',
        orgSname: '',
        orgCode: '',
        note1: '',
        note2: ''
      },
      // 校验的数据
      rules: {
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        orgCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        orgSname: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        note1: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        note2: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ]
      },
      // 控制是否禁用
      show: false,
      // 控制机构简称是否禁用
      creditshow: false,
      // 抽屉的名字
      title: ''
    }
  },

  async created() {
    this.formData = await this.organ.init(this.formData)
    this.organ.inquire()

  },
  methods: {
    async open() {
      this.tableColumnList = await this.organ.initTable(this.tableColumnList)

    }
  },
  beforeDestroy() {
    this.organ.clear()
  },
})
</script>

<style lang='less' scoped>@import "@/styles/commonStyle.less";</style>
<style lang="less"></style>