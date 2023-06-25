<!-- 穿透报告表(穿透报告查询) -->
<template>
  <div class="myContainer">
    <div class="left">
      <el-select v-model="penetration.selectVal" size="small" placeholder="请选择">
        <el-option
          v-for="item in penetration.options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        >
        </el-option>
      </el-select>
      <Tree
        :treeList="penetration.treeList"
        :hasParent="penetration.hasParent"
        :checkedKeys="penetration.checkedKeys"
        :resetScroll="penetration.resetScroll"
        :expandedKeys="penetration.expandedKeys"
        :defaultProps="penetration.defaultProps"
        filterName="name"
        :showCheck="penetration.showCheck"
        @treeChange="penetration.checkTreeNode"
      />
    </div>
    <div class="right">
      <div class="tabsLess" v-if="penetration.tabList.length">
      <el-tabs  @tab-click="penetration.handleClick" type="card">
        <el-tab-pane
          v-for="item in penetration.tabList"
          :key="item.pfId"
          :label="item.name"
          :value="item"
        ></el-tab-pane>
      </el-tabs>
      </div>

      <div class="form">
        <div style="background: #fff">
          <BaseForm
            :form-data="penetration.formData"
            :set-options="penetration.setOptions"
            ref="table"
            @inquire="penetration.inquire"
          />
        </div>
      </div>
      <BaseTable
        ref="baseTable"
        :tableData="penetration.tableData"
        :tableColumn="penetration.tableColumn"
        :border="true"
        :pagination="true"
        :pageInfo="penetration.pageInfo"
        :total="penetration.pageInfo.total"
        @sizeChange="penetration.sizeChange"
        @pageChange="penetration.pageChange"
        :loadingShow = "penetration.loadingShow"
        :serialShow="true"
      >
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <el-button @click="penetration.export($refs.table)">导出</el-button>
          <el-button @click="penetration.mergeExport($refs.table)">合并导出</el-button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree/index.vue';
import BaseForm from '@/components/BaseForm/index.vue';
import BaseTable from '@/components/BaseTable/BaseTable.vue';
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue';
import { penetrationStore } from '@model/store/modules/dataView/penetrationReport';

export default Vue.extend({
  name: 'penetrationReport',
  components: { Tree, BaseTable, BaseDropdown, BaseForm },
  computed: {
    penetration() {
      const penetration = penetrationStore();
      return penetration;
    },
  },
  created() {
    this.penetration.init();
  },
  data: () => {
    return {
    };
  },
  methods: {
  },
  watch: {
    'penetration.selectVal'(val) {
      this.penetration.getTreeFN();
    },
  },
    beforeDestroy() {
    this.penetration.clear()
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
  }
}
</style>