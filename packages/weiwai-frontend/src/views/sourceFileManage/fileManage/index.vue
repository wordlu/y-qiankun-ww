<template>
  <div style="height: 100%;">
    <BaseForm :form-data="fileManageStore.searchFormData" @inquire="inquire" @reset="reset" ref="searchRef" />
    <BaseTable ref="tableRef" :tableData="fileManageStore.tableData?.data || []"
      :loadingShow="fileManageStore.tableLoading" :tableColumn="fileManageStore.tableColumn" border serialShow pagination
      :pageInfo="fileManageStore.pageInfo" :total="fileManageStore.tableData?.totalCount || 0" @pageChange="pageChange"
      @sizeChange="sizeChange">
      <template slot="multiple-operation" v-if="fileManageStore.showUpload($refs)">
        <el-button size="mini" @click="handleUpload($refs.searchRef)">上传</el-button>
      </template>
      <template slot="btnshow" slot-scope="{ row }">
        <el-button type="text" size="mini" @click="onDownload(row)">下载</el-button>
        <el-button type="text" size="mini" @click="onDelete(row)">删除</el-button>
      </template>
    </BaseTable>

    <Drawer :title="fileManageStore.drawerTitle" :min="true" :dialog="fileManageStore.drawerVisible" :onClose="onClose">
      <template>
        <el-form :model="fileManageStore.addForm" label-position="top" :rules="fileManageStore.rules" ref="form">
          <el-form-item label="文件类型" prop="fileType">
            <el-input size="mini" v-model="fileManageStore.addForm.fileType" autocomplete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="文件路径" prop="filePath">
            <el-select size="mini" v-model="fileManageStore.addForm.filePath" placeholder="请选择" filterable clearable>
              <el-option v-for="(item, index) in fileManageStore.pathList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择文件" prop="file">
            <el-upload action="" :multiple="false" :file-list="fileManageStore.addForm.file" :auto-upload="false"
              :limit="1" :on-change="onChangUpload" :on-exceed="onExceed" :on-remove="onRemove"
              accept=".jpg,.png,.jar,.xlsx,.xls,.txt,.zip,.pdf,.doc,.py">
              <el-button size="small" type="primary" slot="trigger">点击上传</el-button>
            </el-upload>
            <el-input size="mini" v-model="fileManageStore.addForm.fileName" autocomplete="off"
              class="visibleInput"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footBtn">
        <div>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOk($refs.form)"
            :loading="fileManageStore.loading">{{ fileManageStore.loading ? '提交中 ...' : '保存' }}</el-button>
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

import { useFileManageStore } from "@model/store/modules/sourceFileManage/fileManage";

export default {
  name: 'fileManage',
  components: {
    BaseForm,
    BaseTable,
    Drawer,
    BaseDropdown
  },
  name: 'fileManage',
  created() {
    this.init();
    this.inquire()
  },
  computed: {
    ...mapStores(useFileManageStore),
  },
  watch: {
    'fileManageStore.pageInfo': {
      async handler() {
        this.fileManageStore.getFileLists()
      },
      deep: true,
    },
    'fileManageStore.drawerTitle': {
      async handler(newVal: string) {
        if (newVal === '上传') {
          this.$refs.form?.resetFields()
        }
      },
    },
    'fileManageStore.drawerVisible': {
      async handler(newVal: string) {
        if (newVal) {
          this.$refs.form?.clearValidate()
        }
      },
    },
  },
  methods: {
    getDropdownList() {
      let dropdownList = [
        { name: "删除", value: "delete" },
        { name: "上传", value: "upload" },
      ]
      return dropdownList;
    },
    ...mapActions(
      useFileManageStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange', 'onDelete', 'onDownload',
        'onChangUpload', 'onExceed', 'onRemove', 'handleUpload', 'onClose',
        'onCancel', 'onOk',
      ]
    )
  }
}
</script>
<style lang="less" scoped>
@import '../index.less';
</style>
