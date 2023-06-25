<!-- 任务详细日志 -->
<template>
  <div style="height: 100%;">
    <BaseForm :form-data="detailLog.formData" @inquire="detailLog.inquire" @reset="detailLog.reset" />
    <BaseTable :tableData="detailLog.tableData" :serialShow="true" :tableColumn="detailLog.tableColumn" :border="true"
      selection="multiple" :loadingShow="detailLog.loadingShow" :pagination="true" :pageInfo="detailLog.pageInfo"
      :total="detailLog.pageInfo.total" @sizeChange="detailLog.sizeChange" @pageChange="detailLog.pageChange">
    </BaseTable>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { Message } from "element-ui";
import { detailLogStore } from "@model/store/modules/dataView/detailLog";
export default Vue.extend({
  name: 'detailLog',
  computed: {
    detailLog() {
      const detailLog = detailLogStore();
      return detailLog
    },
  },
  async created() {
    this.detailLog.formData = await this.detailLog.initForm(this.detailLog.formData)
    this.detailLog.inquire()
  },
  data() {
    return {
    }
  },
  props: {
  },
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown
  },
  methods: {
  },
  beforeDestroy() {
      this.detailLog.clear()
  },
})
</script>
<style lang='less' scoped>
::v-deep .el-pagination .el-pager .number {
  width: 42px !important;
}
</style>




</style>
