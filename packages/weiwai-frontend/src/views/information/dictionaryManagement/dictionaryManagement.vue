<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="dictionary.setOptions" @inquire="dictionary.inquire" @reset="dictionary.reset"/>
    <BaseTable :tableData="dictionary.tableData" :tableColumn="tableColumn" :pagination="true"
      :total="dictionary.pageInfo.total" :serialShow="true" :pageInfo="dictionary.pageInfo" selection="multiple"
      @sizeChange="dictionary.sizeChange" @pageChange="dictionary.pageChange" :loadingShow="dictionary.loadingShow">
      <span slot="multiple-operation" slot-scope="{selectionData}">
        <el-button @click="dictionary.start(selectionData)">启用</el-button>
        <el-button @click="dictionary.forbidden(selectionData)">禁用</el-button>
        <el-button type="primary" @click="dictionary.add">新增</el-button>
      </span>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="dictionary.edit(row)">编辑</el-button>
        <BaseDropdown textName="更多" :dropdownList="dropdownList"
          @handleCommand="(val) => dictionary.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <!-- 抽屉 -->
    <div class="drawer-col-1"> <el-drawer :title="dictionary.title" :visible="dictionary.addVisible" direction="rtl"
        :before-close="() => {
          dictionary.handleClose($refs.form)
        }" :wrapperClosable="false" :size="409" @open="dictionary.open">
        <el-form label-position="top" label-width="80px" class="drawer" :rules="rules" :model="dictionary.addData"
          ref="form">
          <el-row>
            <el-form-item label="分类代码:" prop="classId">
              <el-input v-model="dictionary.addData.classId" placeholder="请输入"
                :disabled="dictionary.show || dictionary.showTwo"></el-input>
            </el-form-item>
            <el-form-item label="分类名称:" prop="dicClassName">
              <el-input v-model="dictionary.addData.dicClassName" placeholder="请输入"
                :disabled="dictionary.show"></el-input>
            </el-form-item>
            <el-form-item label="英文名称:" prop="classEname">
              <el-input v-model="dictionary.addData.classEname" placeholder="请输入" :disabled="dictionary.show"></el-input>
            </el-form-item>
            <el-form-item label="键值代码:" prop="keyId">
              <el-input v-model="dictionary.addData.keyId" placeholder="请输入" :disabled="dictionary.showTwo"></el-input>
            </el-form-item>
            <el-form-item label="键值名称:" prop="keyName">
              <el-input v-model="dictionary.addData.keyName" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="英文名称:" prop="keyEname">
              <el-input v-model="dictionary.addData.keyEname" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="是否启用:" prop="state">
              <el-select v-model="dictionary.addData.state" placeholder="请选择">
                <el-option v-for="item in dictionary.options" :key="item.keyId" :label="item.keyName" :value="item.keyId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注:">
              <el-input v-model="dictionary.addData.memo" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                placeholder="请输入"></el-input>
            </el-form-item>

          </el-row>
        </el-form>
        <div class="btn">
          <el-button @click="() => {
            dictionary.handleClose($refs.form)
          }">取消</el-button>
          <el-button type="primary" @click="() => dictionary.save($refs.form)">保存</el-button>
        </div>
      </el-drawer></div>
    <!-- dialog弹框 -->
    <div class="primaryBtn">
      <el-dialog title="查看此分类" :visible.sync="dictionary.dialogVisible" width="796" :close="dictionary.close"
        custom-class="dialog" @open="dictionary.dialogOpen">
        <BaseTable :tableData="dictionary.tableDataTwo" :tableColumn="tableColumnTwo" :pagination="true"
          :showSlotClass="false" :total="dictionary.pageInfoDia.total" :heightShow="true" :serialShow="true"
          :pageInfo="dictionary.pageInfoDia" @sizeChange="dictionary.sizeChangeDia" @pageChange="dictionary.pageChangeDia"
          layout="next,pager, prev" :loadingShow="dictionary.dialogLoadingShow">
        </BaseTable>

      </el-dialog>
    </div>
  </div>
</template>

<script lang='ts'>
import '@/styles/commonStyle.less'
import Vue from 'vue';
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue'
import { formData, tableColumn, tableColumnList, defaultRow, tableColumnTwo } from "../../../../../weiwai-model/src/store/modules/information/dictionaryManagement/data";
import { dictionaryStore } from "@model/store/modules/information/dictionaryManagement";
let validatorName = (rule: any, value: any, callback: any) => {
  var len = 0;
  for (var i = 0; i < value.length; i++) {
    var a = value.charAt(i);
    if (a.match(/[^\x00-\xff]/ig) != null) {
      len += 2;
    }
    else {
      len += 1;
    }
  }
  if (len <= 2) {
    callback()
  } else {
    callback(new Error('不能超过200个字符或者100个汉字'));
  }
}
export default Vue.extend({
  name: 'dictionaryManagement',
  components: { BaseForm, BaseTable, BaseDropdown },
  computed: {
    dictionary() {
      const dict = dictionaryStore();
      return dict
    },
  },
  data() {

    return {
      // dialog框的表格column数据
      tableColumnTwo,
      defaultRow,
      multipleSelection: [],
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
        { value: '查看此分类', name: '查看此分类' },
        { value: '添加子项', name: '添加子项' },
      ],
      // 抽屉的显示
      addVisible: false,
      // 抽屉；中的数据
      addData: {
        classId: '',
        dicClassName: '',
        classEname: '',
        keyId: '',
        keySeq: '',
        keyEname: '',
        stateName: '',
        memo: ''
      },
      // 校验的数据
      rules: {
        classId: [
          { required: true, message: '请输入分类代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' },
        ],
        dicClassName: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { validator: validatorName, trigger: 'blur' }
        ],
        keyId: [
          { required: true, message: '请输入键值代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' },

        ],
        keyName: [
          { required: true, message: '请输入键值名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        keyEname: [
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        state: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        classEname: [
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ]
      },
    }
  },
  created() {
    // console.log('数据字典管理');

    
    this.formData = this.dictionary.init(this.formData)
    this.dictionary.inquire()
  },
  methods: {
    save() {
      this.$refs.form.validate((value: any) => {
        // console.log(value);
        // this.dictionary.save()
        if (value) {
          this.dictionary.save()

        }

      })
    },
  },
  beforeDestroy() {
    this.dictionary.clear()
  },
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>
<style lang="less">
.primaryBtn {
  .el-dialog {
    .el-dialog__header {
      padding: 16px 24px 8px !important;
    }

    .el-dialog__body {
      // height: 500px !important;

      padding: 0px 8px 8px !important;
    }
  }

  .del {
    .el-button--primary {
      background-color: #2F6AFF;
    }
  }
}
</style>