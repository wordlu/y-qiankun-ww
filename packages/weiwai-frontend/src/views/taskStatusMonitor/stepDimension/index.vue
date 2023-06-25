<!-- 批处理总览（步骤维度） -->
<template>
  <div style="height: 100%;">
    <div class="tabsLess">
      <el-tabs class="tabs" v-model="stepDimension.tabActiveId" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="item in stepDimension.tabList" :key="item.name" :label="item.value"
          :name="item.name"></el-tab-pane>
      </el-tabs>
    </div>

    <BaseForm :form-data="stepDimension.formData" @trigger="stepDimension.trigger" @inquire="stepDimension.inquire"
      ref="table" @reset="stepDimension.reset" @onStartDateChange="stepDimension.onStartDateChange" />
    <BaseTable :tableData="stepDimension.tableData" :serialShow="true" :height="288"
      :tableColumn="stepDimension.tableColumn" :border="true" selection="multiple" :selectable="stepDimension.selectable"
      @selectionChange="stepDimension.handleSelectionChange" @handleCurrentRowChange="stepDimension.handleCurrentChange"
      :loadingShow="stepDimension.loadingShow">
      <template slot="btnshow" slot-scope="{ row }">
        <el-button type="text" size="mini" @click="stepDimension.execute(row)">执行</el-button>
      </template>
    </BaseTable>
    <div style="padding-top: 16px; ">
      <BaseTable :tableData="stepDimension.tableData1" :serialShow="true"
        style="margin-right: -10px; width: 42.7%; display: inline-block" :height="280"
        :tableColumn="stepDimension.tableColumn1" :border="true"
        @handleCurrentRowChange="stepDimension.handleStatusCurrentChange" :loadingShow="stepDimension.loadingShow1">
      </BaseTable>
      <BaseTable :tableData="stepDimension.tableData2" :serialShow="true" style="width: 57.6%; display: inline-block"
        :height="280" :tableColumn="stepDimension.tableColumn2" :border="true" :loadingShow="stepDimension.loadingShow2">
      </BaseTable>
    </div>

  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { stepDimensionStore } from "@model/store/modules/dataView/stepDimension";
export default Vue.extend({
  name: 'stepDimension',
  computed: {
    stepDimension() {
      const stepDimension = stepDimensionStore();
      return stepDimension
    },
  },
  created() {
    this.stepDimension.initForm(this.stepDimension.formData)
    this.stepDimension.formData.rules = this.rules
    console.log(this.stepDimension.formData.rules);

  },
  data() {
    const validatorBeginDate = (rule: any, value: any, callback: any) => {
      if (!this.stepDimension.timeObject.endDate) {
        callback()
      } else if (this.stepDimension.timeObject.endDate - value > 60) {
        callback(new Error('开始时间和结束时间间隔不能超过60天'));
      }

    }
    const validatorEndDate = (rule: any, value: any, callback: any) => {
      if (!this.stepDimension.timeObject.beginDate) {
        callback()
      } else if (value - this.stepDimension.timeObject.beginDate > 60) {
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
      this.stepDimension.inquire(this.$refs.table._data.useData.initData)
    }
  },
})
</script>
<style lang='less' scoped>
@import '@/styles/commonStyle.less';

// .marked-grey{
//   background-color:#6F7685
// }
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

.marked-blue {
  background-color: #3371FF
}

.el-table {
  border: 1px solid rgba(219, 221, 225, 1);

  ::v-deep .el-table__header th {
    .cell {
      padding: 0 8px !important;

      .caret-wrapper {
        height: 19px !important;

        .ascending {
          top: -2px !important;
        }

        .descending {
          bottom: -1px !important;
        }
      }
    }
  }

  ::v-deep .el-table__body td {
    // background-color: red;
    border-bottom: 1px solid rgba(219, 221, 225, 1);
    border-right: 1px solid rgba(219, 221, 225, 1);
    font-size: 14px;

    .cell {
      // padding: 0 8px !important;
      padding: 0 16px 0 8px !important;

    }

    .el-table__cell {
      border-bottom: 1px solid rgba(219, 221, 225, 1);
      border-right: 1px solid rgba(219, 221, 225, 1);
      font-size: 14px;
      // padding: 6px 6px 8px !important;

      .cell {
        padding: 0 16px 0 8px !important;
      }
    }
  }

  ::v-deep .btnClass {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: -11px;

    .el-button--text,
    .el-dropdown-selfdefine {
      color: #3371ff;
      font-size: 14px;

      .el-icon--right {
        margin-left: 0px !important;
      }
    }

    .el-button--text {
      padding: 0 !important;
      margin-top: 3px;
      margin-right: 16px;
      margin-left: 0px !important;
    }

    .el-button.is-disabled {
      color: #C0C4CC;
      cursor: not-allowed;
    }
  }
}
</style>