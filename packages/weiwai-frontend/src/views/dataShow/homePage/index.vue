<!-- 首页-监控总览 -->
<template>
  <div class="right">
    <div class="tabs">
      <el-tabs v-model="homepage.tabActiveId" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="item in homepage.tabList" :key="item.name" :label="item.value"
          :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="label">任务日期:</div>
      <el-date-picker size="small" class="date" @change="dateChange" value-format="yyyyMMdd" v-model="homepage.date"
        type="date" placeholder="请选择日期">
      </el-date-picker>
    </div>
    <div class="bodyTop">
      <div class="showNum">
        <div class="iconBox">
          <img class="icon" src="../../../icon/system.png" alt="">
        </div>
        <div class="number">
          {{ homepage.num1 }}
        </div>
        <div class="text">
          组合数量
        </div>
      </div>
      <div class="showNum">
        <div class="iconBox">
          <img class="icon" src="../../../icon/bill.png" alt="">
        </div>
        <div class="number">
          {{ homepage.num2 }}
        </div>
        <div class="text">
          策略当前专户数量
        </div>
      </div>
      <div class="showNum">
        <div class="iconBox">
          <img class="icon" src="../../../icon/elevator.png" alt="">
        </div>
        <div class="number">
          {{ homepage.num3 }}
        </div>
        <div class="number" style="left: 60%;">
          {{ homepage.num4 }}
        </div>
        <div class="text">
          估值新增组合数量 &nbsp&nbsp&nbsp&nbsp&nbsp估值减少组合数量
        </div>
      </div>
      <div class="showNum" style="margin-right: 0 !important;">
        <div class="iconBox">
          <img class="icon" src="../../../icon/delete.png" alt="">
        </div>
        <div class="number">
          {{ homepage.num5 }}
        </div>
        <div class="text">
          当日未生成估值任务组合
        </div>
      </div>
    </div>
    <div class="bodyCenter">
      <div class="centerTitle titleText">
        批量处理监控
      </div>
      <!-- 460px -->
      <div ref="chartColumn" style="float: left; width:28%; height:318px; margin-bottom: 36px;"></div>
      <div ref="chartColumn1"
        style="float: left; width:38.9%; border-right: 1px solid #DBDDE1; height:318px; margin-bottom: 36px;"></div>
      <div ref="chartColumn2" style="float: left; width:33%; height:318px; margin-bottom: 36px;"></div>
    </div>
    <div style="background-color: #fff; padding-left: 19px; margin-bottom: -16px" class="titleText">
      未完成明细
    </div>
    <div style="background-color: #fff;">
      <BaseTable :height="182" :tableData="homepage.tableData" :serialShow="true" :tableColumn="homepage.tableColumn"
        :border="true" :dataIsGreaterEight="false" :loadingShow="homepage.loadingShow">
      </BaseTable>
    </div>
    <div class="bodyBottom">
      <div class="bottomLeft">
        <div style="position: relative;">
          <el-tabs class="bottomLeftTabs" v-model="homepage.tabActiveId1" @tab-click="homepage.lockHandleClick">
            <el-tab-pane v-for="item in homepage.tabList1" :key="item.name" :label="item.value"
              :value="item.name"></el-tab-pane>
          </el-tabs>
          <i style="position: absolute; top: 10%; right: 5px; cursor: pointer" class="el-icon-refresh icon"
            @click="homepage.lockRefresh"></i>
        </div>
        <el-table ref="table1" class="bottomLeftTable" :data="homepage.currentData" header-cell-class-name="tableHeader">
          <el-table-column type="index" fixed label="序号" width="50" align="center" />
          <el-table-column v-for="item in homepage.tableColumn1" :type="item.type" :key="item.prop" :prop="item.prop"
            :label="item.label" :align="item.align" :width="item.label === '操作' ? '130' : item.width" :fixed="item.fixed"
            :sortable="item.sortable" :column-key="item.prop" :filters="item.filters" :filter-method="item.filterTag"
            :show-overflow-tooltip="item.tooltip" @header-dragend="dragend">
          </el-table-column>
        </el-table>
      </div>

      <div class="bottomRight">
        <div class="bottomRightTitle "><span class="titleText">脚本执行详情</span>
          <i style="position: absolute; top: 10%; right: 5px; cursor: pointer" class="el-icon-refresh icon"
            @click="homepage.scriptOperationRefresh"></i>
        </div>
        <el-table ref="table2" class="bottomRightTable" :data="homepage.tableData3" header-cell-class-name="tableHeader">
          <el-table-column type="index" fixed label="序号" width="50" align="center" />
          <el-table-column v-for="item in homepage.tableColumn3" :type="item.type" :key="item.prop" :prop="item.prop"
            :label="item.label" :align="item.align" :width="item.label === '操作' ? '130' : item.width" :fixed="item.fixed"
            :sortable="item.sortable" :column-key="item.prop" :filters="item.filters" :filter-method="item.filterTag"
            :show-overflow-tooltip="item.tooltip" @header-dragend="dragend">
            <template slot-scope="scope">
              <div v-if="item.btnShow">
                <el-button type="text" size="mini" @click="homepage.detail(scope.row)">详情</el-button>
              </div>
              <div v-else>
                <div class="oneLine ">
                  {{ scope.row[item.prop] }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog title="详情" :visible.sync="homepage.dialogVisible">
      <BaseForm :form-data="homepage.formData" @inquire="homepage.inquire" @reset="homepage.reset" />
      <BaseTable :tableData="homepage.tableData4" :tableColumn="homepage.tableColumn4" :border="true"
        :dataIsGreaterEight="false">
      </BaseTable>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import * as echarts from 'echarts';
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { homePageStore } from "@model/store/modules/dataView/homePage";
export default Vue.extend({
  name: 'homePage',
  computed: {
    homepage() {
      const homepage = homePageStore();
      return homepage
    },
  },
  async created() {
    this.homepage.date = this.homepage.currentDate().toString()
    await this.homepage.init()
  },
  data() {
    return {
      height1: null,
      asd: 'red'
    }
  },
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
  },
  methods: {
    initChart() {
      this.homepage.pie.chartColumn = echarts.init(this.$refs.chartColumn)
      this.homepage.bar.chartColumn = echarts.init(this.$refs.chartColumn1)
      this.homepage.pie1.chartColumn = echarts.init(this.$refs.chartColumn2)
      this.homepage.initChartData()
    },

    dateChange() {
      this.initChart()
      this.homepage.init()
    },

    handleClick() {
      this.initChart()
      this.homepage.init()
    },
    dragend() {
      this.$refs.table1.doLayout()
      this.$refs.table2.doLayout()
    },
  },
  activated() {
    this.dragend()
  },
  // deactivated(){
  //   window.removeEventListener('resize', this.dragend)
  // },
  beforeDestroy() {
    window.removeEventListener('resize', this.dragend)
  },
  mounted() {
    console.log();
    //顶部导航栏高度  body的内边距  页签的高度  页签的外边距  form表单的外边距  分页和分页的外边距  表格的内边距  按钮的下边距
    this.height1 = document.body.clientHeight - 56 - 32 - 40 - 10
    console.log(this.height1);
    document.querySelector('.right').style.height = this.height1 + 'px'

    this.initChart()
    this.dragend()
    window.addEventListener('resize', this.dragend)
  }
})
</script>
<style lang="less" scoped>
.right {
  // height: 100%;
  overflow: auto;
  overflow-x: hidden;
  // padding-bottom: 32px;
}

.content {
  background: #F5F8FF;
}

.tabs {
  position: relative;

  .label {
    position: absolute;
    top: 8px;
    right: 20%;
    font-size: 16px;
    color: #3F495C;
    letter-spacing: 0;
    line-height: 24px;
    font-weight: 400;
  }

  .date {
    position: absolute;
    top: 2px;
    right: 0;
    width: 18.9%;
  }

  ::v-deep .el-tabs--card>.el-tabs__header {
    border-bottom: none
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background: #3371FF;
    color: #fff !important;
    border: 1px solid #3371FF;
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
    // border-bottom: 1px solid #E4E7ED
    border: none;
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: transparent
  }

  ::v-deep .el-tabs__item {
    height: 32px;
    line-height: 32px;
    padding: 0 16px !important;
    background-color: #fff;
    color: #6F7685;
    border: 1px solid #B7BAC1;
    border-left: none;
    &:hover {
      color: #3371FF;
    }
  }

  ::v-deep .el-tabs__item:last-child {
    border-right: 1px solid #B7BAC1;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  ::v-deep .el-tabs__item:first-child {
    border-left: 1px solid #B7BAC1;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  ::v-deep .el-tabs__nav-prev {
    line-height: 32px;
  }

}

.bodyTop {
  height: 80px;
  margin-bottom: 16px;

  .showNum {
    position: relative;
    float: left;
    width: 24.4%;
    height: 80px;
    margin-right: 0.8%;
    background: #fff;

    .iconBox {
      background: #F5F8FF;
      width: 48px;
      height: 48px;
      margin-left: 33px;
      margin-top: 16px;

      .icon {
        width: 20px;
        height: 20px;
        margin: 14px;
        font-size: 16px;
      }
    }

    .number {
      position: absolute;
      left: 25%;
      top: 20%;
      font-size: 24px;
      color: #3F495C;
      letter-spacing: 0;
      font-weight: 400;
    }

    .text {
      position: absolute;
      left: 25%;
      top: 55%;
      font-size: 14px;
      color: #3F495C;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
}

.bodyCenter {
  background: #fff;

  .centerTitle {
    height: 36px;
    margin-left: 19px;
    font-size: 14px;
    line-height: 36px;
  }
}

::v-deep .el-tabs__nav-wrap::after {
  background-color: #fff;
}

.el-table {
  border: 1px solid rgba(219, 221, 225, 1);

  ::v-deep .el-table__header th {
    padding: 6px 0 !important;

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
    padding: 6px 0 !important;

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

.bodyBottom {

  position: relative;

  .bottomLeft {
    position: absolute;
    top: 0;
    left: 0;
    width: 49%;
    height: 312px;
    background: #fff;
    margin-right: 10px;
    margin-top: 16px;

    .bottomLeftTabs {
      margin-top: 8px;
      margin-left: 16px;

      ::v-deep .el-tabs__header {
        margin: 0 0 16px;
      }

      ::v-deep .el-tabs__item {
        padding: 0 36px 0 0 !important;
        font-size: 14px;
        color: #6F7685;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 400;
        height: 34px;

        &:hover {
          color: #3F495C;
        }
      }

      ::v-deep .el-tabs__active-bar {
        background-color: #3371FF;
      }

      ::v-deep .el-tabs__item.is-active {
        font-size: 14px;
        color: #3F495C;
        letter-spacing: 0;
        line-height: 24px;
        font-weight: 500;
      }
    }

    .bottomLeftTable {
      width: 96%;
      margin: 0 16px 16px;
    }

    ::v-deep .tableHeader {
      background-color: #f5f8ff;
      font-size: 14px;
      color: #0f1b33;
      letter-spacing: 0;
      font-weight: 500;
    }
  }

  .bottomRight {
    background: #fff;
    position: absolute;
    top: 0;
    left: 50%;
    width: 49%;
    height: 312px;

    margin-top: 16px;

    ::v-deep .tableHeader {
      background-color: #f5f8ff;
      font-size: 14px;
      color: #0f1b33;
      letter-spacing: 0;
      font-weight: 500;
    }

    .bottomRightTitle {
      margin-left: 16px;
      margin-top: 16px;
    }

    .bottomRightTable {
      width: 96%;
      margin: 22px 16px 16px 16px;

      .oneLine {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

  }


}

.titleText {
  font-size: 14px;
  color: #0F1B33;
  letter-spacing: 0;
  font-weight: 500;
}</style>
