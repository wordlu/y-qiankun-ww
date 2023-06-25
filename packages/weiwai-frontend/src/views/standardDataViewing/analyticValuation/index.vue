<!-- 解析后估值表 -->
<template>
  <div class="myContainer">
    <div class="left">
      <el-select v-model="analytic.selectVal" size="small" placeholder="请选择">
        <el-option v-for="item in analytic.options" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
      <Tree :treeList="analytic.treeList" :hasParent="analytic.hasParent" :checkedKeys="analytic.checkedKeys"
        :resetScroll="analytic.resetScroll" :expandedKeys="analytic.expandedKeys" :defaultProps="analytic.defaultProps"
        filterName="name" :showCheck="analytic.showCheck" @treeChange="analytic.checkTreeNode" />
    </div>
    <div class="right">
      <div class="tabsLess" v-if="analytic.tabList.length">
        <el-tabs @tab-click="analytic.handleClick"  type="card">
          <el-tab-pane v-for="item in analytic.tabList" :key="item.pfId" :label="item.name" :value="item"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="form">
        <div style="background: #fff">
          <BaseForm :form-data="analytic.formData" @inquire="analytic.inquire" ref="table" @reset="analytic.reset"/>
        </div>
      </div>
      <BaseTable ref="baseTable" :serialShow="true" :tableData="analytic.tableData" :tableColumn="analytic.tableColumn"
        :border="true" @selectionChange="analytic.handleSelectionChange" :pagination="true" :pageInfo="analytic.pageInfo"
        selection="multiple" :total="analytic.pageInfo.total" :loadingShow="analytic.loadingShow"
        @sizeChange="analytic.sizeChange" @pageChange="analytic.pageChange">
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <el-dropdown :hide-on-click="false" placement="top" @visible-change="analytic.visibleChange">
            <span class="el-dropdown-link">
              自定义列<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu style="width: 250px !important; height: 200px !important; overflow: auto" slot="dropdown">
              <el-dropdown-item>
                <el-checkbox :indeterminate="analytic.isIndeterminate" v-model="analytic.checkAll"
                  @change="analytic.handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group style="width: 100px" v-model="analytic.checkDropList"
                  @change="analytic.handleCheckedChange">
                  <el-checkbox v-for="item in analytic.customList" :label="item.prop" :key="item.prop">
                    <span>{{ item.label }}</span></el-checkbox>
                </el-checkbox-group>
                <el-button type="text" style="float: right" class="colSave" @click="analytic.saveList()">保存</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <BaseDropdown buttonName="批量操作" :dropdownList="analytic.dropdownList"
            @handleCommand="val => analytic.handleCommand(val)">
          </BaseDropdown>
          <el-button @click="analytic.export($refs.table)">解析后导出</el-button>
          <el-button @click="analytic.exportSrc($refs.table)">源文件导出</el-button>
        </template>
        <template slot="btnshow" slot-scope="{ row }">
          <el-button type="text" size="mini" @click="analytic.check(row)">{{
            row.cChecked === 1 ? '反审核' : '审核'
          }}</el-button>
          <el-button type="text" size="mini" @click="analytic.edit(row)">{{
            row.cChecked === 1 ? '' : '编辑'
          }}</el-button>
        </template>
      </BaseTable>
      <div class="drawer-col-1">
        <el-drawer title="编辑" :visible="analytic.visible" direction="rtl"
          :before-close="() => analytic.handleClose($refs.form)" :wrapperClosable="false" :size="409">
          <el-form label-position="top" label-width="80px" :model="analytic.addData" class="drawer last-element"
            ref="form">
            <el-form-item label="科目代码:">
              <el-input v-model="analytic.addData.cKmdm" placeholder="请输入" disabled></el-input>
            </el-form-item>

            <el-form-item label="科目名称:">
              <el-input v-model="analytic.addData.cKmmc" placeholder="请输入" disabled></el-input>
            </el-form-item>

            <el-form-item label="科目层级:">
              <el-input v-model="analytic.addData.cKmlv" placeholder="请输入" disabled></el-input>
            </el-form-item>

            <el-form-item label="资产代码:">
              <el-input v-model="analytic.addData.assetCode" placeholder="请输入" disabled></el-input>
            </el-form-item>

            <el-form-item label="资产类型:">
              <el-input v-model="analytic.addData.assetType" placeholder="请输入" disabled></el-input>
            </el-form-item>

            <el-form-item label="持仓数量:">
              <el-input v-model="analytic.addData.nHldamt" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="原币持仓成本:">
              <el-input v-model="analytic.addData.nHldcst" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="本币持仓成本:">
              <el-input v-model="analytic.addData.nHldcstLocl" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="原币持仓市值:">
              <el-input v-model="analytic.addData.nHldmkv" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="本币持仓市值:">
              <el-input v-model="analytic.addData.nHldmkvLocl" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="原币证券估值:">
              <el-input v-model="analytic.addData.nHldvva" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="本币证券估值:">
              <el-input v-model="analytic.addData.nHldvvaL" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="估值币种:">
              <el-input v-model="analytic.addData.cCuryCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="货币估值汇率:">
              <el-input v-model="analytic.addData.nValrate" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="单位成本:">
              <el-input v-model="analytic.addData.nPriceCost" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="证券估值行情:">
              <el-input v-model="analytic.addData.nValprice" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="本币成本占比(%) :">
              <el-input v-model="analytic.addData.nCbJzBl" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="资产占比(%):">
              <el-input v-model="analytic.addData.nZcBl" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="停牌信息:">
              <el-input v-model="analytic.addData.cSubpend" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="权益信息,百元债券利息:">
              <el-input v-model="analytic.addData.cRights" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="投资分类:">
              <el-input v-model="analytic.addData.cIvtClss" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="交易市场:">
              <el-input v-model="analytic.addData.cMktCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="受限流通类别:">
              <el-input v-model="analytic.addData.cMlAttr" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
          <div class="btn">
            <el-button size="small" @click="() => analytic.handleClose($refs.form)">取消</el-button>
            <el-button size="small" type="primary" @click="() => analytic.save($refs.form)">保存</el-button>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Tree from '@/components/Tree/index.vue';
import BaseForm from '@/components/BaseForm/index.vue';
import BaseTable from '@/components/BaseTable/BaseTable.vue';
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue';
import { analyticStore } from '@model/store/modules/dataView/analyticValuation';

export default Vue.extend({
  name: 'analyticValuation',
  components: { Tree, BaseTable, BaseDropdown, BaseForm },
  computed: {
    analytic() {
      const analytic = analyticStore();
      return analytic;
    },
  },
  created() {
    this.analytic.tableColumn = [];
    this.analytic.init();
  },
  data: () => {
    return {};
  },
  methods: {},
  watch: {
    'analytic.selectVal'(val) {
      this.analytic.getTreeFN();
    }
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
  }

  .colSave {
    float: right;
  }

  ::v-deep.el-dropdown-link {
    line-height: 30px;
  }
}


</style>
