<template>
  <div style="height: 100%;">
    <BaseForm :form-data="analyticRuleStore.searchFormData" @inquire="inquire" @reset="reset" ref="searchRef" />
    <BaseTable :tableData="analyticRuleStore.tableData?.data || []" :tableColumn="analyticRuleStore.tableColumn" border
      serialShow pagination :pageInfo="analyticRuleStore.pageInfo" :total="analyticRuleStore.tableData?.totalCount || 0"
      @pageChange="pageChange" @sizeChange="sizeChange" :loadingShow="analyticRuleStore.tableLoading">
      <template slot="multiple-operation">
        <el-button type="primary" size="mini" @click="onAdd">新增</el-button>
      </template>

      <template slot="btnshow" slot-scope="{ row }">
        <el-button type="text" size="mini" v-if="row.cChecked === 1" @click="onChecked(row, 0)">反审核</el-button>
        <el-button type="text" size="mini" v-else @click="onChecked(row)">审核</el-button>
        <BaseDropdown textName="更多" :dropdownList="getDropdownList()" @handleCommand="(val) => handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>

    <Drawer :title="analyticRuleStore.drawerTitle" :min="true" :dialog="analyticRuleStore.drawerVisible"
      :onClose="onClose">
      <template>
        <el-form :model="analyticRuleStore.addForm" label-position="top" :rules="analyticRuleStore.rules" ref="form">
          <el-form-item label="文件类型" prop="wfType">
            <el-select size="mini" v-model="analyticRuleStore.addForm.wfType" placeholder="请选择"
              :disabled="isDisabledType">
              <el-option v-for="item in analyticRuleStore.fileType" :label="item.keyName" :value="item.keyId"
                :key="item.keyId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="策略专户" prop="sender">
            <el-select size="mini" v-model="analyticRuleStore.addForm.sender" placeholder="请选择" :disabled="isDisabled"
              filterable clearable>
              <el-option v-for="(item, index) in analyticRuleStore.combinList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="机构名称" prop="orgId">
            <el-select size="mini" v-model="analyticRuleStore.addForm.orgId" placeholder="请选择" :disabled="isDisabled"
              filterable clearable>
              <el-option v-for="(item, index) in analyticRuleStore.orgList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="匹配路径" prop="matchTitle">
            <el-input size="mini" v-model="analyticRuleStore.addForm.matchTitle" autocomplete="off" placeholder="请输入"
              :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="匹配文件" prop="matchFile">
            <el-input size="mini" v-model="analyticRuleStore.addForm.matchFile" autocomplete="off" placeholder="请输入"
              :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="解析规则" prop="parsingRules">
            <el-input size="mini" v-model="analyticRuleStore.addForm.parsingRules" autocomplete="off" placeholder="请输入"
              :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="选择文件" prop="file">
            <el-upload action="" :multiple="false" :file-list="analyticRuleStore.addForm.file" :auto-upload="false"
              :limit="1" :on-change="onChangUpload" :on-exceed="onExceed" :on-remove="onRemove" :disabled="isDisabled"
              accept=".jpg,.png,.jar,.xlsx,.xls,.txt,.zip,.pdf,.doc,.py">
              <el-button size="small" type="primary" slot="trigger" :disabled="isDisabled">点击上传</el-button>
            </el-upload>
            <el-input size="mini" v-model="analyticRuleStore.addForm.fileName" autocomplete="off"
              class="visibleInput"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footBtn" v-if="!isDisabled">
        <div>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOk($refs.form)"
            :loading="analyticRuleStore.loading">{{ analyticRuleStore.loading ? '提交中 ...' : '保存' }}</el-button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
<script lang="ts">
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import Drawer from "@/components/Drawer/index.vue";

import { mapStores, mapActions } from 'pinia';

import { useAnalyticRuleStore } from "@model/store/modules/sourceFileManage/analyticRule";

export default {
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Drawer,
  },
  name: 'analyticRule',
  created() {
    this.init();
    this.inquire()
  },
  watch: {
    'analyticRuleStore.pageInfo': {
      async handler() {
        this.analyticRuleStore.getRulesList()
      },
      deep: true,
    },
    'analyticRuleStore.drawerTitle': {
      async handler(newVal: string) {
        if (newVal === '新增') {
          this.$refs.form?.resetFields()
        }
      },
    },
    'analyticRuleStore.drawerVisible': {
      async handler(newVal: string) {
        if (newVal) {
          this.$refs.form?.clearValidate()
        }
      },
    }
  },
  computed: {
    isDisabled(): boolean {
      return this.analyticRuleStore.drawerTitle === '查看'
    },
    isDisabledType(): boolean {
      return ['编辑', '查看'].includes(this.analyticRuleStore.drawerTitle)
    },
    ...mapStores(useAnalyticRuleStore),
  },
  methods: {
    getDropdownList() {
      let dropdownList = [
        { name: "编辑", value: "edit" },
        { name: "查看", value: "view" },
        { name: "删除", value: "delete" },
        { name: "下载", value: "download" },
      ]
      return dropdownList
    },
    ...mapActions(
      useAnalyticRuleStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange',
        'onAdd', 'onChecked', 'handleCommand', 'onDownload', 'onChangUpload',
        'onExceed', 'onRemove', 'onClose', 'onCancel', 'onOk', 'handleSelectionChange'
      ]
    )
  }
}
</script>
<style lang="less" scoped>
@import '../index.less';
</style>
