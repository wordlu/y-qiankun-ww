<template>
  <div style="height: 100%">
    <BaseForm :form-data="agingManageStore.searchFormData" @inquire="inquire" @reset="reset" ref="searchRef" />
    <BaseTable :tableData="agingManageStore.tableData?.data || []" :tableColumn="agingManageStore.tableColumn"
      :border="true" :serialShow="true" :pagination="true" :pageInfo="agingManageStore.pageInfo"
      :loadingShow="agingManageStore.tableLoading" :total="agingManageStore.tableData?.totalCount || 0"
      @pageChange="pageChange" @sizeChange="sizeChange" selection="multiple" @selectionChange="handleSelectionChange">

      <template slot="multiple-operation">
        <el-button size="mini" @click="onBatchChecked(1)">审核</el-button>
        <el-button size="mini" @click="onBatchChecked(0)">反审核</el-button>
        <el-button type="primary" size="mini" @click="onAdd">新增</el-button>
      </template>

      <template slot="btnshow" slot-scope="{ row }">
        <el-button type="text" size="mini" v-if="row.cChecked === 1" @click="onChecked(row, 0)">反审核</el-button>
        <el-button type="text" size="mini" v-else @click="onChecked(row, 1)">审核</el-button>
        <BaseDropdown textName="更多" v-if="row.cChecked !== 1" :dropdownList="getDropdownList()"
          @handleCommand="(val) => handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>

    <Drawer :title="agingManageStore.drawerTitle" :min="true" :dialog="agingManageStore.drawerVisible" :onClose="onClose">
      <template>
        <el-form :model="agingManageStore.addForm" label-position="top" :rules="agingManageStore.rules" ref="form">
          <el-form-item label="文件类型" prop="fileType">
            <el-select size="mini" v-model="agingManageStore.addForm.fileType" placeholder="请选择"
              :disabled="isDisabledType">
              <el-option v-for="item in agingManageStore.fileType" :label="item.keyName" :value="item.keyId"
                :key="item.keyId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理机构" prop="orgId">
            <el-select size="mini" v-model="agingManageStore.addForm.orgId" placeholder="请选择" filterable clearable>
              <el-option v-for="(item, index) in agingManageStore.orgList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时效频率" prop="agingRate">
            <el-select size="mini" v-model="agingManageStore.addForm.agingRate" placeholder="请选择" filterable clearable>
              <el-option v-for="(item, index) in agingManageStore.agingRateList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="策略专户" prop="combin">
            <el-select size="mini" v-model="agingManageStore.addForm.combin" placeholder="请选择" filterable clearable>
              <el-option v-for="(item, index) in agingManageStore.combinList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="估值日期" prop="gzDate">
            <el-select size="mini" v-model="agingManageStore.addForm.gzDate" placeholder="请选择" filterable clearable>
              <el-option v-for="(item, index) in agingManageStore.gzDateList" :label="item.label" :value="item.value"
                :key="item.value + index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="截止时间" prop="endTime">
            <el-time-select size="mini" v-model="agingManageStore.addForm.endTime" :picker-options="{
              start: '00:00',
              step: '01:00',
              end: '24:00'
            }" placeholder="请选择时间">
            </el-time-select>
          </el-form-item>
          <el-form-item label="延迟天数" prop="delayDay">
            <el-input size="mini" v-model="agingManageStore.addForm.delayDay" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footBtn">
        <div>
          <el-button @click="onCancel">取消</el-button>
          <el-button type="primary" @click="onOk($refs.form)"
            :loading="agingManageStore.loading">{{ agingManageStore.loading ? '提交中 ...' : '保存' }}</el-button>
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

import { useAgingManageStore } from "@model/store/modules/sourceFileManage/agingManage";

export default {
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Drawer,
  },
  name: 'agingManage',
  data() {
    return {}
  },
  created() {
    this.init();
    this.inquire()
  },
  watch: {
    'agingManageStore.pageInfo': {
      async handler() {
        this.agingManageStore.getAgingsList()
      },
      deep: true,
    },
    'agingManageStore.drawerTitle': {
      async handler(newVal: string) {
        if (newVal === '新增') {
          this.$refs.form?.resetFields()
        }
      },
    },
    'agingManageStore.drawerVisible': {
      async handler(newVal: string) {
        if (newVal) {
          this.$refs.form?.clearValidate()
        }
      },
    }
  },
  computed: {
    ...mapStores(useAgingManageStore),
    isDisabledType(): boolean {
      return this.agingManageStore.drawerTitle === '编辑'
    }
  },
  methods: {
    getDropdownList() {
      let dropdownList = [
        { name: "编辑", value: "edit" },
        { name: "删除", value: "delete" },
      ]
      return dropdownList;
    },
    ...mapActions(
      useAgingManageStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange',
        'onAdd', 'onChecked', 'handleCommand', 'onBatchChecked',
        'onClose', 'onCancel', 'onOk', 'handleSelectionChange'
      ]
    )
  }
}
</script>
<style lang="less" scoped>
@import '../index.less';
</style>
