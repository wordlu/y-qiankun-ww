<!-- 批处理总览（专户维度） -->
<template>
  <div style="height: 100%;">
    <div class="tabsLess">
      <el-tabs class="tabs" v-model="specialDimension.tabActiveId" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="item in specialDimension.tabList" :key="item.name" :label="item.value"
          :name="item.name"></el-tab-pane>
      </el-tabs>
    </div>

    <BaseForm :form-data="specialDimension.formData" @inquire="specialDimension.inquire" @reset="specialDimension.reset"
      ref="table" @onStartDateChange="specialDimension.onStartDateChange" />
    <BaseTable :tableData="specialDimension.tableData" :serialShow="true" :height="270"
      :tableColumn="specialDimension.tableColumn" :border="true" selection="multiple"
      @handleCurrentRowChange="specialDimension.handleCurrentChange" :loadingShow="specialDimension.loadingShow">
    </BaseTable>
    <div class="bodyBottom" style="padding-top: 16px; ">
      <BaseTable :tableData="specialDimension.tableData1" :serialShow="true"
        style="margin-right: -10px; width: 42.7%; display: inline-block" :height="250"
        :tableColumn="specialDimension.tableColumn1" :border="true" selection="multiple"
        @selectionChange="specialDimension.handleSelectionChange"
        @handleCurrentRowChange="specialDimension.handleStatusCurrentChange" :loadingShow="specialDimension.loadingShow1">
        <template slot="btnshow" slot-scope="{ row }">
          <el-button type="text" size="mini" @click="specialDimension.execute(row)">执行</el-button>
          <el-button type="text" size="mini" @click="specialDimension.confirm(row)">确认</el-button>
        </template>
      </BaseTable>
      <BaseTable :tableData="specialDimension.tableData2" :serialShow="true" style="width: 57.6%; display: inline-block"
        :height="250" :tableColumn="specialDimension.tableColumn2" :border="true" :show-overflow-tooltip="false"
        :loadingShow="specialDimension.loadingShow2">
      </BaseTable>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { specialDimensionStore } from "@model/store/modules/dataView/specialDimension";
export default Vue.extend({
  name: 'specialDimension',
  computed: {
    specialDimension() {
      const specialDimension = specialDimensionStore();
      return specialDimension
    },
  },
  async created() {
    this.specialDimension.initForm(this.specialDimension.formData)
    this.specialDimension.formData.rules=this.rules
  },
  data() {
    const validatorBeginDate = (rule: any, value: any, callback: any) => {
      if (!this.specialDimension.timeObject.endDate) {
        callback()
      } else if (this.specialDimension.timeObject.endDate - value > 60) {
        callback(new Error('开始时间和结束时间间隔不能超过60天'));
      }

    }
    const validatorEndDate = (rule: any, value: any, callback: any) => {
      if (!this.specialDimension.timeObject.beginDate) {
        callback()
      } else if (value - this.specialDimension.timeObject.beginDate > 60) {
        callback(new Error('开始时间和结束时间间隔不能超过60天'));
      }

    }
    return {
      rules: {
        beginDate: [{ required: true, message: '请选择开始时间', trigger: 'blur' },
        { validator: validatorBeginDate, trigger: 'blur' }
        ],
        endDate: [{ required: true, message: '请选择结束时间', trigger: 'blur' },
        { validator: validatorEndDate, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown
  },
  methods: {
    handleClick() {
      this.specialDimension.inquire(this.$refs.table._data.useData.initData)
    }
  }
})
</script>
<style lang="less" scoped>
@import '@/styles/commonStyle.less';

// ::v-deep .el-tabs--card>.el-tabs__header {
//   border-bottom: none
// }

// ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
//   background: #3371FF;
//   color: #fff;
// }

// ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
//   border-bottom: 1px solid #E4E7ED
// }

// ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
//   border-bottom-color: transparent
// }
</style>
