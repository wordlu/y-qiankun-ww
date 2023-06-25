<template>
  <div style="height: 100%;">
    <BaseForm
      :form-data="allData.formData"
      :set-options="allData.setOptions"
      @inquire="allData.inquire"
      @reset="allData.reset"
      ref="form"
    />
    <BaseTable
      :tableData="allData.tableData" 
      :tableColumn="allData.tableColumn" 
      :border="true" 
      :serialShow="true"
      selection="multiple"
      :selectable="allData.selectable" 
      @selectionChange="allData.handleSelectionChange"
      :pagination="true" 
      :pageInfo="allData.pageInfo"
      :total="allData.pageInfo.total"
      :loadingShow="allData.loadingShow"
      @sizeChange="allData.sizeChange"
      @pageChange="allData.pageChange">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <BaseDropdown buttonName="批量操作" :dropdownList="allData.dropdownListAll" @handleCommand="(val) => allData.handleCommandAll(val, selectionData)"></BaseDropdown>
        <el-button  @click="()=>allData.exportData($refs.form)">导出</el-button>
        <el-button type="primary" @click="openDrawer">新增</el-button>
      </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button
          @click.native.prevent="allData.handleStatus(row)"
          type="text"
          size="small"
        >
          {{Number(row.cChecked) === 1 ? "反审核":"审核"}}
        </el-button>
        <el-button 
          type="text"
          v-show="row.cChecked === 1" 
          @click="allData.showAdd(row, '查看')">查看
        </el-button>
        <BaseDropdown 
          textName="更多"
          v-show="row.cChecked !== 1" 
          :dropdownList="allData.getDropdownList(row.validName)" 
          @handleCommand="(val) => allData.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <div class="drawer-col-1">
      <el-drawer
        :title="allData.drawerTitle"
        :visible="allData.visible"
        direction="rtl"
        :before-close="allData.handleClose"
        :wrapperClosable="false"
        :size="409"
      >
      <el-form label-position="top" label-width="80px" :rules="allData.rules" :model="allData.addData" class="drawer last-element" ref="addData">
        <el-form-item label="机构名称:" prop="orgId">
          <el-select 
            filterable
            @change="allData.searchCSubjCode"
            :disabled="allData.drawerTitle === '查看' || allData.drawerTitle === '编辑'"
            v-model="allData.addData.orgId" 
            size="small" placeholder="请选择">
            <el-option
              v-for="item in allData.orgIdArr"
              :key="item.keyId"
              :label="item.keyName"
              :value="item.keyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目体系:" prop="subjSystem">
          <el-select 
            :disabled="allData.drawerTitle === '查看' || allData.drawerTitle === '编辑'"
            @change="allData.searchCSubjCode"
            v-model="allData.addData.subjSystem" 
            size="small" placeholder="请选择">
            <el-option
              v-for="item in allData.subjSystemArr"
              :key="item.keyId"
              :label="item.keyName"
              :value="item.keyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目代码:" prop="cSubjCode" >
          <el-select 
            :disabled="allData.drawerTitle === '查看' || allData.drawerTitle === '编辑'"
            @visible-change="allData.cSubjCodeArrVisibleChange"
            v-model="allData.addData.cSubjCode" 
            @change="allData.handleSelectionCSubjCode"
            size="small" placeholder="请选择">
            <el-option
              v-for="item in allData.cSubjCodeArr"
              :key="item.keyId"
              :label="item.keyName"
              :value="item.keyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="科目名称:">
          <el-input v-model="allData.addData.cSubjName" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="成本科目代码:">
          <el-select 
            :disabled="allData.drawerTitle === '查看'"
            v-model="allData.addData.subjCode" 
            @change="allData.handleSelectionSubjCode"
            size="small" placeholder="请选择">
            <el-option
              v-for="item in allData.cSubjCodeArr"
              :key="item.keyId"
              :label="item.keyName"
              :value="item.keyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本科目名称:">
          <el-input v-model="allData.addData.subjName" placeholder="请输入" disabled></el-input>
        </el-form-item>
        <el-form-item label="投资类别:">
          <el-select 
            :disabled="allData.drawerTitle === '查看'"
            v-model="allData.addData.assetType" 
            size="small" placeholder="请选择科目代码">
            <el-option
              v-for="item in allData.assetTypeArr"
              :key="item.keyId"
              :label="item.keyName"
              :value="item.keyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备 注:">
          <el-input 
            v-model="allData.addData.remarke" 
            placeholder="请输入" 
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"  
            :disabled="allData.drawerTitle === '查看'">
          </el-input>
        </el-form-item>
        </el-form>
        <div class="btn" v-show="allData.drawerTitle !== '查看'">
          <el-button @click="allData.handleClose">取消</el-button>
          <el-button type="primary" @click="submitFormValid('addData')">保存</el-button>
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
import Drawer from "@/components/Drawer/index.vue";
import { subjectInvestStore } from "@model/store/modules/subjects/subjectInvest";
export default Vue.extend({
  name: 'subjectInvest',
  computed: {
    allData() {
      const data = subjectInvestStore()
      return data
    },
  },
  data() {
    return {}
  },
  props: {
  },
  components: {
    BaseForm,
    BaseTable,
    BaseDropdown,
    Drawer,
  }, 
  created() {
    this.allData.getSelectData(this)
    this.allData.inquire()
  },
  methods: {
    submitFormValid(addData:any) {
      this.$refs[addData].validate((valid:any) => {
        if (valid) {
          this.allData.submitForm()
        } else {
          console.log('error: 请填写必填项');
          return false;
        }
      });
    },
    openDrawer() {
      this.$nextTick(() => {
        this.allData.add(this.$refs['addData'])
      })
    }
  }
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>