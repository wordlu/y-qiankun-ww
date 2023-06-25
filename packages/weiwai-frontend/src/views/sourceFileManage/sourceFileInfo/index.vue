<template>
  <div style="height: 100%;">
    <BaseForm :form-data="sourceFileInfoStore.searchFormData" @inquire="inquire" @reset="reset" />
    <BaseTable :tableData="sourceFileInfoStore.tableData?.data || []" :tableColumn="sourceFileInfoStore.tableColumn"
      border serialShow pagination :pageInfo="sourceFileInfoStore.pageInfo" :loadingShow="sourceFileInfoStore.tableLoading"
      :total="sourceFileInfoStore.tableData.totalCount || 0" @pageChange="pageChange" @sizeChange="sizeChange">
      <template slot="multiple-operation">
        <el-button @click="updataEmail">收取邮件</el-button>
      </template>
      <template slot="stateId" slot-scope="{ row }">

        <div v-if="row?.stateId === '1'">
          <span class="circle circle-1"></span>
          <span class="circle-1-text">已解析</span>
        </div>
        <div v-else-if="row?.stateId === '2'">
          <span class="circle  circle-2"></span>
          <span class="circle-2-text">不解析</span>
        </div>
        <div v-else-if="row?.stateId === '3'">
          <span class="circle  circle-3"></span>
          <span class="circle-3-text">待解析</span>
        </div>
        <div v-else-if="row?.stateId === '4'">
          <span class="circle  circle-5"></span>
          <span class="circle-4-text">解析错误</span>
        </div>
        <div v-else-if="row?.stateId === '5'">
          <span class="circle  circle-5"></span>
          <span class="circle-5-text">未建组合</span>
        </div>
      </template>

      <template slot="fileName" slot-scope="{ row }">
        <div class="fileName" @click="onDownload(row)">{{ row.fileName }}</div>
      </template>
      <template slot="btnshow" slot-scope="{ row }">
        <!-- <el-button type="text" size="mini" @click="onAnalysis(row)">解析</el-button> -->
        <el-button type="text" size="mini" @click="onShow(row)">查看</el-button>
      </template>
    </BaseTable>

    <el-dialog title="查看" class="dialogBox" :visible="sourceFileInfoStore.dialogVisible" width="796px"
      :before-close="onCloseDialog">
      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6 }" v-model="sourceFileInfoStore.mailText" disabled>
      </el-input>
    </el-dialog>

  </div>
</template>
<script lang="ts">
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";

import { mapStores, mapActions } from 'pinia';
import { useSourceFileInfoStore } from '@model/store/modules/sourceFileManage/sourceFileInfo';


export default {
  name: 'fileInfo',
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown
  },
  name: 'fileInfo',
  data() {
    return {}
  },
  created() {
    this.init();
    this.inquire()
  },
  watch: {
    'sourceFileInfoStore.pageInfo': {
      async handler() {
        this.sourceFileInfoStore.getSearchTable()
      },
      deep: true,
    },
  },
  computed: {
    ...mapStores(useSourceFileInfoStore)
  },
  methods: {
    ...mapActions(
      useSourceFileInfoStore,
      [
        'init', 'inquire', 'reset', 'pageChange', 'sizeChange',
        'updataEmail', 'onAnalysis', 'onShow', 'onCloseDialog', 'onDownload'
      ]
    )
  }
}
</script>
<style lang="less" scoped>
@import '../index.less';

.dialog-footer {
  .el-dialog__title {
    font-size: 16px;
    color: #0F1B33;
    line-height: 24px;
    font-weight: 500;
  }

}

.circle {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50% 50%;
  margin-right: 8px;
  margin-left: 8px;
}

.circle-1 {
  background: #6FD13F;
}

.circle-1-text {
  color: #6FD13F;
}


.circle-2 {
  background: #FF4B33;
}

.circle-2-text {
  color: #FF4B33;
}

.circle-3 {
  background: #3F495C;
}

.circle-3-text {
  color: #3F495C;
}

.circle-4 {
  background: #FF4B33;
}

.circle-4-text {
  color: #FF4B33;
}

.circle-5 {
  background: #3F495C;
}

.circle-5-text {
  color: #3F495C;
}

.fileName {
  color: #3371FF;
  cursor: pointer;
  width: 100%;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行

}
</style>
