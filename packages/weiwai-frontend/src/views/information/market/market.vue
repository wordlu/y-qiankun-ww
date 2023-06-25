<!-- 行情文件导出(穿透报告查询) -->
<template>
  <div class="myContainer">
    <div class="left">
      <el-select v-model="marketStore.selectVal" size="small" placeholder="请选择">
        <el-option v-for="item in marketStore.options" :key="item.value" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
      <Tree :treeList="marketStore.treeList" :hasParent="marketStore.hasParent" :checkedKeys="marketStore.checkedKeys"
      :treeLoading="marketStore.treeLoading"
        :expandedKeys="marketStore.expandedKeys" :showCheck="marketStore.showCheck"
        @treeChange="marketStore.checkTreeNode" :defaultProps="defaultProps" filterName="name" />
    </div>
    <div class="right">
      <div class="form">
        <div style="background: #fff;">
          <BaseForm :form-data="formData" :set-options="marketStore.setOptions" @inquire="marketStore.inquire" ref="form"
            :btnShow="false" />
        </div>
      </div>
      <BaseTable ref="baseTable" :tableData="marketStore.tableData" :tableColumn="tableColumn" :border="true"
        :pagination="true" :pageInfo="marketStore.pageInfo" :total="marketStore.pageInfo.total"
        @pageChange="marketStore.pageChange" @sizeChange="marketStore.sizeChange" :loadingShow="marketStore.loadingShow">
        <template slot="multiple-operation" slot-scope="{ selectionData }">
          <el-button type="primary" @click="() => marketStore.full($refs.form)">全量导出</el-button>
          <el-button type="primary" @click="() => marketStore.increment($refs.form)">增量导出</el-button>
        </template>
      </BaseTable>
    </div>
  </div>
</template>

<script lang="ts">
import { formData, defaultProps, tableColumn } from "../../../../../weiwai-model/src/store/modules/information/market/data";
import Tree from "@/components/Tree/index.vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import { marketStore } from "@model/store/modules/information/market";
// import { qqq } from '@weiwai/weiwai-service/services/UserInfoController/index.ts'
export default {
  name: "market",
  computed: {
    marketStore() {
      const tree = marketStore();
      return tree
    },
  },
  data: () => {
    return {
      treeList: [],
      defaultProps,
      hasParent: false,
      checkedKeys: [],
      expandedKeys: [],
      resetScroll: false,
      showCheck: true,
      tableData: [],
      tableColumn,
      daterangeValue: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }
      ],
      selectVal: '',
      setOptions: {},
      formData,
      // 选中的组合数据
      checkedTreeNode: [],
      tabList: []
    };
  },
  components: { Tree, BaseTable, BaseDropdown, BaseForm },
  // 当选项发生变化的时候触发
  watch: {
    'marketStore.selectVal'(val) {
      this.marketStore.getTreeFN()
    }
  },
  async created() {
    // await qqq({ "pfId": "", "pfName": "", "mngrId": "914403001921759713", "assetType": "net", "marketCode": "", "cChecked": "", "isValid": "", "posState": "", "startPage": 1, "pageSize": 10 })
    this.marketStore.getOptionsFN()
    this.marketStore.getTreeFN()
    this.marketStore.init(this.formData)
    this.marketStore.inquire()
  },
  methods: {
    receiveList(data: any) {
      console.log(data)
    },

    pageChange(val: any) {
    },

    checkTreeNode(data: any) {
      this.checkedTreeNode = data;
    },

    inquire(data: any) {
      let startDate = this.daterangeValue[0];
      let endDate = this.daterangeValue[1];
      this.tabList = this.checkedTreeNode.filter((i: any) => !i.children);
      console.log(this.$refs.baseTable)
      this.$nextTick(() => {
        this.$refs.baseTable.getHeight();

      })
    },
    // 增量导出
    increment() { },
    // 全量导出
    full() { }
  },
  beforeDestroy() {
    this.marketStore.clear()
  },
};
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
  width: 392px !important;
  // min-width: 392px !important;
  margin-right: 16px;
  background-color: #fff;
  padding: 16px 16px 0 16px;
  // box-sizing: border-box !important;
  // overflow: hidden;

  ::v-deep .el-select {
    margin-bottom: 15px;
  }

  ::v-deep .el-select--small {
    width: 100%;
  }
}


.right {
  // width: 79%;
  flex: 1;
  background: #F5F8FF;
  overflow: hidden;
  .form {
    background: #F5F8FF;
    margin-bottom: 15px;
  }

}
</style>