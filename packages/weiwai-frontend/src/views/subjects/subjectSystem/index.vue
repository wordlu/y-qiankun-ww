<template>
  <div style="height: 100%;">
    <BaseForm
      ref="baseForm"
      :form-data="allData.formData"
      :set-options="allData.setOptions"
      @inquire="allData.inquire"
      @reset="allData.reset"
    />
    <BaseEditTable
      ref="baseEditTable"
      :recordCreatorProps="{ record: allData.defaultRow,  position: 'top'}"
      :isEdit="true"
      :formData="allData.BaseEditTableData" 
      :tableColumn="allData.tableColumn"
      :border="true" 
      :serialShow="true"
      selection="multiple"
      :selectable="allData.selectable" 
      :loadingShow="allData.loadingShow"
      @selectionChange="allData.handleSelectionChange"
      :pagination="true" 
      :pageInfo="allData.pageInfo"
      :total="allData.pageInfo.total"
      @sizeChange="allData.sizeChange"
      @pageChange="allData.pageChange">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <BaseDropdown buttonName="批量操作" 
          :dropdownList="allData.dropdownListAll" 
          @handleCommand="(val) => allData.handleCommandAll(val, selectionData, $refs.baseForm)">
        </BaseDropdown>
        <el-button @click="allData.submit">保存</el-button>
        <el-button type="primary" @click="allData.addItem">新增</el-button>
      </template>
      <template slot="btnshow" slot-scope="{row, index}">
        <el-button
          @click.native.stop="allData.handleStatus(row)"
          type="text"
          size="small"
        >
          {{Number(row.cChecked) === 1 ? "反审核":"审核"}}
        </el-button>
        <el-button 
          type="text"
          @click.stop="allData.delItem(row, index)"
          v-show="(row.cChecked) === 0">删除
        </el-button>
      </template>
    </BaseEditTable>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseEditTable from "./baseEditTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { subjectStore } from "@model/store/modules/subjects/subjectSystem";

export default Vue.extend({
  name: 'subjectSystem',
  computed: {
    allData() {
      const data = subjectStore()
      return data
    },
  },
  data() {
    return {}
  },
  props: {
  },
  components: {
    BaseForm,
    BaseEditTable,
    BaseDropdown,
  }, 
  created() {
    this.allData.init(this)
    if (this.$route.params.orgId) {
      const params = {
        orgId: this.$route.params.orgId, 
        subjSystemCode: this.$route.params.subjSystemCode
      }
      this.$nextTick(() => {
        this.$refs.baseForm.setFormData(params, 'subject')
      })
    }
  },
  activated() {
    if (this.$route.params.orgId) {
      const params = {
        orgId: this.$route.params.orgId, 
        subjSystemCode: this.$route.params.subjSystemCode
      }
      this.$nextTick(() => {
        this.$refs.baseForm.setFormData(params, 'subject')
      })
    }
  },
  methods: {}
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";

</style>