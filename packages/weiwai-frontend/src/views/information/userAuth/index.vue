<template>
  <div style="height: 100%;">
    <BaseForm
      :form-data="allData.formData"
      :set-options="allData.setOptions"
      @inquire="allData.inquire"
      @reset="allData.reset"
    />
    <BaseTable
      :tableData="allData.tableData"
      :tableColumn="allData.tableColumn"
      :border="true"
      selection="multiple"
      :selectable="allData.selectable"
      :loadingShow="allData.loadingShow"
      @selectionChange="allData.handleSelectionChange"
      :pagination="false">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <el-button type="primary" @click="allData.handleStatus(selectionData, 0)">审核</el-button>
        <el-button @click="allData.handleStatus(selectionData, 1)">反审核</el-button>
      </template>
      <template slot="statusShow" slot-scope="{row}">
          <div v-if="Number(row.authSta) === 1">
            <span class="circle danger-circle"></span>
            <span class="danger-circle-text">未授权</span>
          </div>
          <div v-else-if="Number(row.authSta) === 3">
            <span class="circle change-circle"></span>
            <span class="change-circle-text">已授权(未审核)</span>
          </div>
          <div v-else-if="Number(row.authSta) === 2">
            <span class="circle success-circle"></span>
            <span class="success-circle-text">已授权(已审核)</span>
          </div>
        </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button
          @click.native.prevent="allData.handleStatus(row)"
          type="text"
          size="small"
        >
          {{row.authSta === '2' ? "反审核":"审核"}}
        </el-button>
        <el-button
          type="text"
          v-show="row.authSta === '2'"
          @click="allData.showAuth(row, 'ck')">查看
        </el-button>
        <BaseDropdown
          textName="更多"
          v-show="row.authSta !== '2'"
          :dropdownList="allData.dropdownList"
          @handleCommand="(val) => allData.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <div>
      <el-drawer
        title="用户授权"
        :visible="allData.authVisible"
        direction="rtl"
        :before-close="allData.handleClose"
        :wrapperClosable="false"
        :size="410"
        class="drawer-col-1"
      >
        <el-form label-position="top" label-width="80px" class="drawer">
          <el-row>
            <el-col :span="24">
              <el-form-item label="" prop="orgName">
                <el-select @change="allData.searchChange" v-model="allData.selectVal" size="small" placeholder="请选择组合树">
                  <el-option
                    v-for="item in allData.comTreeOptions"
                    :key="item.treeId"
                    :label="item.pfChildName"
                    :value="item.treeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <Tree
                ref="tree"
                class="last-element"
                :defaultProps="allData.defaultProps"
                :treeList="allData.treeList" 
                :hasParent="allData.hasParent"
                :checkedKeys="allData.checkedKeys" 
                :keys="allData.defaultCheckedKeys"
                :resetScroll="allData.resetScroll"
                :expandedKeys="allData.expandedKeys" 
                :showCheck="allData.showCheck"
                filterName="name"
                @treeChange="allData.treeChange" />
            </el-col>
          </el-row>
        </el-form>
        <div class="btn" v-show="allData.showCheck">
          <el-button size="small" @click="allData.handleClose">取消</el-button>
          <el-button size="small" type="primary" @click="allData.auth">保存</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from "@/components/BaseDropdown/BaseDropdown.vue";
import Tree from "@/components/Tree/index.vue";
import { userAuthStore } from "@model/store/modules/information/userAuth";
export default Vue.extend({
  name: 'userAuth',
  computed: {
    allData() {
      const data = userAuthStore()
      return data
    },
  },
  data() {
    return {}
  },
  props: {},
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Tree
  },
  created() {
    this.allData.init(this)
  },
  methods: {}
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
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
</style>
