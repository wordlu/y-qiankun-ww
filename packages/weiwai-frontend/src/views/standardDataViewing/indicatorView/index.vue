
<!-- 指标查看 -->
<template>
  <div class="myContainer">
    <div class="left">
      <el-select v-model="indicator.selectVal" size="small" placeholder="请选择">
        <el-option
          v-for="item in indicator.options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>
      <Tree
        :treeList="indicator.treeList"
        :hasParent="indicator.hasParent"
        :checkedKeys="indicator.checkedKeys"
        :resetScroll="indicator.resetScroll"
        :expandedKeys="indicator.expandedKeys"
        :showCheck="indicator.showCheck"
        :defaultProps="indicator.defaultProps"
        filterName="name"
        @treeChange="indicator.checkTreeNode"
      />
    </div>
    <div class="right">
      <div class="tabsLess" v-if="indicator.tabList.length">
      <el-tabs class="tabs" @tab-click="indicator.handleClick" type="card">
        <el-tab-pane
          v-for="item in indicator.tabList"
          :key="item.pfId"
          :label="item.name"
          :value="item"
        ></el-tab-pane>
      </el-tabs>
      </div>

      <div class="form">
        <div style="background: #fff; padding: 10px 16px">
          估值日期：<el-date-picker
            v-model="indicator.daterangeValue"
            size="small"
            type="daterange"
            value-format="yyyyMMdd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <div class="buttons">
            <el-button  size="small" type="primary" @click="queryList">查询</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="grid"> -->
      <BaseTable
        ref="baseTable"
        :tableData="indicator.tableData"
        :tableColumn="indicator.tableColumn"
        :border="true"
        :pagination="true"
        :pageInfo="indicator.pageInfo"
        :total="indicator.pageInfo.total"
        @sizeChange="indicator.sizeChange"
        @pageChange="indicator.pageChange"
        :loadingShow="indicator.loadingShow"
        :serialShow="true"
      >
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <el-button @click="indicator.export">导出</el-button>
        </template>
      </BaseTable>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Tree from '@/components/Tree/index.vue';
import BaseTable from '@/components/BaseTable/BaseTable.vue';
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue';
import { indicatorStore } from '@model/store/modules/dataView/indicatorView';

export default Vue.extend({
  name: 'indicatorView',
  components: { Tree, BaseTable, BaseDropdown },
  computed: {
    indicator() {
      const indicator = indicatorStore();
      return indicator;
    },
  },
  created() {
    this.indicator.init();
  },
  data: () => {
    return {};
  },
  watch: {
    'indicator.selectVal'(val) {
      this.indicator.getTreeFN();
    },
  },

  methods: {
    queryList() {
      this.indicator.queryList();
      this.$nextTick(() => {
        this.$refs.baseTable.getHeight();
      });
    },
  },
    beforeDestroy() {
    this.analytic.clear()
  },
});
</script>
<style lang="less" scoped>
@import '@/styles/commonStyle.less';
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.myContainer {
  display: flex;
  background: #f5f8ff;
  width: 100%;
  height: 100%;
}

.left {
  width: 392px !important;
  background: #fff;
  padding: 16px 16px 0 16px;
  margin-right: 16px;

  ::v-deep .el-select {
    margin-bottom: 15px;
  }

  ::v-deep .el-select--small {
    width: 100%;
  }
}

.right {
  flex: 1;
  background: #F5F8FF;
  overflow: hidden;

  ::v-deep .el-tabs__nav-wrap::after {
    background-color: transparent;
  }

  .form {
    background: #f5f8ff;
    margin-bottom: 15px;

    .buttons {
      float: right;

      .el-button {
        height: 32px;
        font-size: 14px;
        line-height: 0;
        border-radius: 2px;
      }

      .el-button--primary {
        background: #3371ff;
        border-radius: 2px;
        border: 1px solid #3371ff;
      }
    }
  }

  .grid {
    .basetable {
    }
  }
}
</style>
