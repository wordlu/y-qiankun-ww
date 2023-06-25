<template>
  <div style="height: 100%;">

    <BaseForm :form-data="orgIndicatorMappingStore.searchFormData" @inquire="inquire" @reset="reset" />
    <BaseTable :tableData="orgIndicatorMappingStore.tableData?.data || []"
      :tableColumn="orgIndicatorMappingStore.tableColumn" border serialShow pagination
      :loadingShow="orgIndicatorMappingStore.tableLoading" :pageInfo="orgIndicatorMappingStore.pageInfo"
      :total="orgIndicatorMappingStore.tableData?.totalCount || 0" @pageChange="pageChange" @sizeChange="sizeChange"
      selection="multiple" @selectionChange="handleSelectionChange">

      <template slot="multiple-operation">
        <el-button size="mini" @click="handleState('true')">启用</el-button>
        <el-button size="mini" @click="handleState('false')">禁用</el-button>
        <el-button type="primary" size="mini" @click="onAdd">新增</el-button>
      </template>

      <template slot="btnshow" slot-scope="{ row }">
        <el-button type="text" size="mini" @click="onViewCategory(row)">查看</el-button>
        <BaseDropdown textName="更多" :dropdownList="getDropdownList()" @handleCommand="(val) => handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>

    <Drawer :title="orgIndicatorMappingStore.drawerTitle" :min="true" :dialog="orgIndicatorMappingStore.drawerVisible"
      :onClose="onClose">
      <template>
        <el-form :model="orgIndicatorMappingStore.addForm" label-position="top" :rules="orgIndicatorMappingStore.rules"
          ref="form">
          <el-form-item label="机构代码" prop="orgId">
            <el-input size="mini" v-model="orgIndicatorMappingStore.addForm.orgId" autocomplete="off" placeholder="请输入"
              :disabled="orgIndicatorMappingStore.addChild"></el-input>
          </el-form-item>
          <el-form-item label="源指标" prop="cindexSource">
            <el-input size="mini" v-model="orgIndicatorMappingStore.addForm.cindexSource" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标准指标代码" prop="cindexCode">
            <el-input size="mini" v-model="orgIndicatorMappingStore.addForm.cindexCode" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="标准指标名称" prop="cindexName">
            <el-input size="mini" v-model="orgIndicatorMappingStore.addForm.cindexName" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="valid">
            <el-select size="mini" v-model="orgIndicatorMappingStore.addForm.valid" placeholder="请选择">
              <el-option label="有效" :value="1"></el-option>
              <el-option label="无效" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footBtn">
        <div>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOk($refs.form)"
            :loading="orgIndicatorMappingStore.loading">{{ orgIndicatorMappingStore.loading ? '提交中 ...' : '保存' }}</el-button>
        </div>
      </template>
    </Drawer>

    <el-dialog class="dialogBox" title="查看" :visible="orgIndicatorMappingStore.dialogVisible" width="796px"
      :before-close="onCloseDialog">
      <BaseTable :tableData="orgIndicatorMappingStore.categoryTableData?.data || []"
        :tableColumn="orgIndicatorMappingStore.categoryTableColumn" border pagination
        :pageInfo="orgIndicatorMappingStore.categoryPageInfo" serialShow
        :loadingShow="orgIndicatorMappingStore.cTableLoading" heightShow
        :total="orgIndicatorMappingStore.categoryTableData.totalCount || 0" @pageChange="cPageChange"
        @sizeChange="cSizeChange" layout="next,pager, prev">
      </BaseTable>
    </el-dialog>


  </div>
</template>
<script lang="ts">
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import Drawer from "@/components/Drawer/index.vue";

import { mapStores, mapActions } from 'pinia'

import { useOrgIndicatorMappingStore } from "@model/store/modules/sourceFileManage/orgIndicatorMapping";


export default {
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Drawer,
  },
  name: 'orgIndicatorMapping',
  created() {
    this.init();
    this.inquire()
  },
  computed: {
    ...mapStores(useOrgIndicatorMappingStore)
  },
  watch: {
    'orgIndicatorMappingStore.pageInfo': {
      async handler() {
        this.orgIndicatorMappingStore.getOrgIndexLists()
      },
      deep: true,
    },
    'orgIndicatorMappingStore.categoryPageInfo': {
      async handler() {
        this.orgIndicatorMappingStore.getAllByFileTags()
      },
      deep: true,
    },
    'orgIndicatorMappingStore.drawerTitle': {
      async handler(newVal: string) {
        if (newVal === '新增') {
          this.$refs.form?.resetFields()
        }
      },
    },
    'orgIndicatorMappingStore.drawerVisible': {
      async handler(newVal: string) {
        if (newVal) {
          this.$refs.form?.clearValidate()
        }
      },
    }
  },
  methods: {
    getDropdownList() {
      let dropdownList = [
        { name: "编辑", value: "edit" },
        { name: "添加子项", value: "addChild" },
      ]
      return dropdownList;
    },
    ...mapActions(
      useOrgIndicatorMappingStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange', 'handleSelectionChange', 'onAdd',
        'onViewCategory', 'onCloseDialog', 'handleCommand', 'handleState', 'cPageChange', 'cSizeChange',
        'onClose', 'onCancel', 'onOk', 'handleState',
      ]
    )
  }
}
</script>
<style lang="less" scoped>
@import '../index.less';
</style>
