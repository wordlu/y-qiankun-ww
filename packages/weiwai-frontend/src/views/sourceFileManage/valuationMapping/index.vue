<template>
  <div style="height: 100%;">

    <BaseForm :form-data="valuationMappingStore.searchFormData" @inquire="inquire" @reset="reset" />
    <BaseTable :tableData="valuationMappingStore.tableData?.data || []" :tableColumn="valuationMappingStore.tableColumn"
      border serialShow pagination :pageInfo="valuationMappingStore.pageInfo"
      :total="valuationMappingStore.tableData?.totalCount || 0" @pageChange="pageChange" @sizeChange="sizeChange"
      selection="multiple" @selectionChange="handleSelectionChange" :loadingShow="valuationMappingStore.tableLoading">

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

    <Drawer :title="valuationMappingStore.drawerTitle" :min="true" :dialog="valuationMappingStore.drawerVisible"
      :onClose="onClose">
      <template>
        <el-form :model="valuationMappingStore.addForm" label-position="top" :rules="valuationMappingStore.rules"
          ref="form">
          <el-form-item label="文件标记" prop="fileTag">
            <el-input size="mini" v-model="valuationMappingStore.addForm.fileTag" autocomplete="off" placeholder="请输入"
              :disabled="valuationMappingStore.addChild"></el-input>
          </el-form-item>
          <el-form-item label="目标列代码" prop="tagCode">
            <el-input size="mini" v-model="valuationMappingStore.addForm.tagCode" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标列名" prop="tagName">
            <el-input size="mini" v-model="valuationMappingStore.addForm.tagName" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="机构代码" prop="orgId">
            <el-input size="mini" v-model="valuationMappingStore.addForm.orgId" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" prop="fileType">
            <el-input size="mini" v-model="valuationMappingStore.addForm.fileType" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="列序号" prop="colNum">
            <el-input size="mini" v-model="valuationMappingStore.addForm.colNum" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="列名称" prop="colName">
            <el-input size="mini" v-model="valuationMappingStore.addForm.colName" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标序号" prop="tagNum">
            <el-input size="mini" v-model="valuationMappingStore.addForm.tagNum" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="目标表" prop="tagTable">
            <el-input size="mini" v-model="valuationMappingStore.addForm.tagTable" autocomplete="off"
              placeholder="请输入"></el-input>
          </el-form-item>

          <el-form-item label="是否有效" prop="valid">
            <el-select size="mini" v-model="valuationMappingStore.addForm.valid" placeholder="请选择">
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
            :loading="valuationMappingStore.loading">{{ valuationMappingStore.loading ? '提交中 ...' : '保存' }}</el-button>
        </div>
      </template>
    </Drawer>

    <el-dialog title="查看" class="dialogBox" :visible="valuationMappingStore.dialogVisible" width="796px"
      :before-close="onCloseDialog">
      <BaseTable :tableData="valuationMappingStore.categoryTableData?.data || []"
        :tableColumn="valuationMappingStore.categoryTableColumn" border pagination heightShow
        :pageInfo="valuationMappingStore.categoryPageInfo" serialShow :loadingShow="valuationMappingStore.cTableLoading"
        :total="valuationMappingStore.categoryTableData.totalCount || 0" @pageChange="cPageChange"
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

import { mapStores, mapActions } from 'pinia';

import { useValuationMappingStore } from "@model/store/modules/sourceFileManage/valuationMapping";


export default {
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Drawer,
  },
  name: 'valuationMapping',
  created() {
    this.init();
    this.inquire()
  },
  watch: {
    'valuationMappingStore.pageInfo': {
      async handler() {
        this.valuationMappingStore.getValuationLists()
      },
      deep: true,
    },
    'valuationMappingStore.categoryPageInfo': {
      async handler() {
        this.valuationMappingStore.getAllByFileTags()
      },
      deep: true,
    },
    'valuationMappingStore.drawerTitle': {
      async handler(newVal: string) {
        if (newVal === '新增') {
          this.$refs.form?.resetFields()
        }
      },
    },
    'valuationMappingStore.drawerVisible': {
      async handler(newVal: string) {
        if (newVal) {
          this.$refs.form?.clearValidate()
        }
      },
    }
  },
  computed: {
    ...mapStores(useValuationMappingStore)
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
      useValuationMappingStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange', 'handleSelectionChange',
        'onViewCategory', 'onCloseDialog', 'handleCommand', 'handleState',
        'onClose', 'onCancel', 'onOk', 'handleState', 'onAdd', 'cPageChange', 'cSizeChange'
      ]
    )
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
