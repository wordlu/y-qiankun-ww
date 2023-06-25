<template>
  <div class="myContainer">
    <div class="right">
      <div class="form">
        <div style="background: #fff;">
          <BaseForm 
            :form-data="allData.formData"
            :gutterNumber="5"
            ref="form"
            :set-options="allData.setOptions" 
            :btnShow="false"
            @reset="allData.reset"
            @inquire="allData.inquire" />
        </div>
      </div>
      <BaseTable 
        ref="baseTable" 
        :tableData="allData.tableData" 
        :tableColumn="allData.tableColumn" 
        :highlightCurrentRow="true"
        :border="true" 
        :dict="allData.dict"
        :serialShow="true"
        selection="multiple"
        :selectable="allData.selectable" 
        @selectionChange="allData.handleSelectionChange"
        @handleCurrentRowChange="allData.handleCurrentRowChange"
        :pagination="true" 
        :pageInfo="allData.pageInfo"
        :total="allData.pageInfo.total"
        :loadingShow="allData.loadingShow"
        @pageChange="allData.pageChange"
        @sizeChange="allData.sizeChange"
      >
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <BaseDropdown buttonName="批量操作" :dropdownList="allData.dropdownListAll" @handleCommand="(val) => allData.handleCommandAll(val, selectionData)"></BaseDropdown>
          <el-button  @click="()=>allData.exportData($refs.form)">导出</el-button>
          <el-button type="primary" @click="allData.save">保存</el-button>
        </template>
        <template slot="statusShow" slot-scope="{row}">
          <div v-if="!row.cSubjCodeBz && !row.cSubjNameBz">
            <span class="circle danger-circle"></span>
            <span class="danger-circle-text">未映射</span>
          </div>
          <div v-else-if="row.isUpdate">
            <span class="circle change-circle"></span>
            <span class="change-circle-text">未保存</span>
          </div>
          <div v-else>
            <span class="circle success-circle"></span>
            <span class="success-circle-text">已映射</span>
          </div>
        </template>
        <template slot="btnshow" slot-scope="{row}">
          <el-button
            :disabled="!row.cSubjCodeBz && !row.cSubjNameBz"
            @click.native.stop="allData.handleStatus(row)"
            type="text"
            size="small"
          >
            {{Number(row.cChecked) ? "反审核":"审核"}}
          </el-button>
          <el-button 
            type="text"
            :disabled="!row.cSubjCodeBz && !row.cSubjNameBz"
            v-show="!Number(row.cChecked)?true:false" 
            @click="allData.delItem(row)">删除
          </el-button>
        </template>
      </BaseTable>
    </div>
    <div class="left">
      <el-select 
        v-model="allData.subjSystemBzId" 
        size="small" 
        @change="allData.syncAll"
        placeholder="标准科目体系">
        <el-option 
          v-for="item in allData.subjSystemBzIdOptions" 
          :key="item.keyId" 
          :label="item.keyName" 
          :value="item.keyId">
        </el-option>
      </el-select>
      <Tree 
        :treeList="allData.treeList" 
        :hasParent="allData.hasParent" 
        :checkedKeys="allData.checkedKeys" 
        :resetScroll="allData.resetScroll"
        :expandedKeys="allData.expandedKeys" 
        expandedLevel="1"
        :showCheck="false" 
        :showOptIcons="true"
        :defaultProps="allData.defaultProps"
        :expandOnNode="false"
        :defaultExpandAll="false"
        :loadingShow="allData.treeLoadingShow"
        @treeChange="allData.checkTreeNode"  
        @syncAll="allData.syncAll"
        @handleClickTree="allData.handleClickTree"
        filterName="menuHead" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Tree from "@/components/Tree/index.vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { subjectMappingStore } from "@model/store/modules/subjects/subjectMapping";
import { Message } from 'element-ui'

export default Vue.extend({
  name: "subjectMapping",
  computed: {
    allData() {
      const data = subjectMappingStore()
      return data
    },
  },
  data: () => {
    return {}
  },
  components: { 
    Tree, 
    BaseTable, 
    BaseDropdown, 
    BaseForm 
  },
  created() {
    // this.allData.getTreeData()
    this.allData.init(this)
  },
  methods: {
  }
});
</script>
<style lang="less" scoped>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.myContainer {
  display: flex;
  background: #F5F8FF;
  width: 100%;
  height: 100%;
}

.left {
  width: 392px;
  min-width: 392px;
  background-color: #fff;
  padding: 16px 16px 0 16px;
  ::v-deep .el-select {
    margin-bottom: 15px;
  }

  ::v-deep .el-select--small {
    width: 100%;
  }
}


.right {
  overflow: hidden;
  flex: 1;
  background: #F5F8FF;
  margin-right: 16px;
  .form {
    background: #F5F8FF;
    margin-bottom: 15px;
  }
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
  .change-circle {
    background: #3F495C;
  }
  .change-circle-text {
    color: #3F495C;
  }
  .success-circle {
    background: #6FD13F;
  }
  .success-circle-text {
    color: #6FD13F;
  }
}
</style>