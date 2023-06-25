<!-- 虚拟净值查看 -->
<template>
  <div class="myContainer">
    <div class="left">
      <el-select v-model="virtual.selectVal" size="small" placeholder="请选择">
        <el-option v-for="item in virtual.options" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
      <Tree :treeList="virtual.treeList" :hasParent="virtual.hasParent" :checkedKeys="virtual.checkedKeys"
        :resetScroll="virtual.resetScroll" :expandedKeys="virtual.expandedKeys" :defaultProps="virtual.defaultProps"
        filterName="name" :showCheck="virtual.showCheck" @treeChange="virtual.checkTreeNode" />
    </div>
    <div class="right">
      <div class="tabsLess"  v-if="virtual.tabList.length">
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane v-for="item in virtual.tabList" :key="item.pfId" :label="item.name" :value="item"></el-tab-pane>
        </el-tabs>
      </div>

      <div class="form">
        <div style="background: #fff; padding: 10px 16px">
          估值日期：<el-date-picker v-model="virtual.daterangeValue" size="small" type="daterange" value-format="yyyyMMdd"
            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <div class="buttons">
            <el-button size="small" type="primary" @click="queryList">查询</el-button>
          </div>
        </div>
      </div>
      <!-- <div class="grid"> -->
      <BaseTable ref="baseTable" :tableData="virtual.tableData" :tableColumn="virtual.tableColumn" :border="true"
        :pagination="true" :pageInfo="virtual.pageInfo" :total="virtual.pageInfo.total" @sizeChange="virtual.sizeChange"
        @pageChange="virtual.pageChange" :loadingShow="virtual.loadingShow" :serialShow="true">
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <el-button @click="virtual.export">导出</el-button>
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
import { virtualStore } from '@model/store/modules/dataView/virtualNetworth';
export default Vue.extend({
  name: 'virtualNetworth',
  components: { Tree, BaseTable, BaseDropdown },
  computed: {
    virtual() {
      const virtual = virtualStore();
      return virtual;
    },
  },
  created() {
    this.virtual.init();
  },
  data: () => {
    return {};
  },
  methods: {
    queryList() {
      this.virtual.queryList();
      this.$nextTick(() => {
        this.$refs.baseTable.getHeight();
      });
    },
    //切换tabs查询列表
    handleClick(tab) {
      this.virtual.tabActiveId = tab.$attrs.value.pfId;
      this.virtual.queryList();
      this.$nextTick(() => {
        this.$refs.baseTable.getHeight();
      });
    },
  },
  watch: {
    'virtual.selectVal'(val) {
      this.virtual.getTreeFN();
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
    .basetable {}
  }
}
</style>