<template>
  <div style="height: 100%;">
    <BaseForm
      :form-data="allData.formData"
      :set-options="allData.setOptions"
      @inquire="allData.inquire"
      @reset="allData.reset"
      ref="form"
    />
    <BaseTable
      :tableData="allData.tableData" 
      :tableColumn="allData.tableColumn"
      @handledbClickRow="rowDoubleClick"
      :border="true" 
      :serialShow="true"
      :pagination="true" 
      :pageInfo="allData.pageInfo"
      :total="allData.pageInfo.total"
      :loadingShow="allData.loadingShow"
      @sizeChange="allData.sizeChange"
      @pageChange="allData.pageChange">
      <template slot="statusShow" slot-scope="{row}">
        <div v-if="row.cchecked == 0">
          <span class="circle danger-circle"></span>
          <span class="danger-circle-text">未审核</span>
        </div>
        <div v-else>
          <span class="circle success-circle"></span>
          <span class="success-circle-text">已审核</span>
        </div>
      </template>
    </BaseTable>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import EditTable from '@/components/EditTable/index.vue';
import { subjectOverviewStore } from "@model/store/modules/subjects/subjectOverview";
export default Vue.extend({
  name: 'subjectOverview',
  computed: {
    allData() {
      const data = subjectOverviewStore()
      return data
    },
  },
  data() {
    return {}
  },
  props: {},
  components: {
    BaseForm,
    BaseTable,
    EditTable,
  }, 
  methods: {
    rowDoubleClick(row: any) {
      this.$router.push({
        name: 'subjectSystem',
        params:{ 
          orgId:row.orgId, 
          subjSystemCode: row.subjSystemCode
        }
      })
    },
  },
  created() {
    this.allData.getSelectData(this)
    this.allData.inquire()
  }
})
</script>

<style lang='less' scoped>
  .circle {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50% 50%;
    margin-right: 8px;
    margin-left: 8px;
  }
  .danger-circle {
    background: #FF4B33;
  }
  .danger-circle-text {
    color: #FF4B33;
  }
  .success-circle {
    background: #6FD13F;
  }
  .success-circle-text {
    color: #6FD13F;
  }
</style>