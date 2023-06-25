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
        <el-button  @click="()=>allData.exportData($refs.form)">导出</el-button>
        <el-button type="primary" @click="allData.add">新增</el-button>
      </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button
          @click.native.prevent="allData.handleStatus(row)"
          type="text"
          size="small"
        >
          {{row.cChecked === 1 ? "反审核":"审核"}}
        </el-button>
        <el-button 
          type="text"
          v-show="row.cChecked === 1" 
          @click="allData.showAdd(row, '查看')">查看
        </el-button>
        <BaseDropdown 
          textName="更多"
          v-show="row.cChecked !== 1" 
          :dropdownList="allData.getDropdownList(row.isValidName)" 
          @handleCommand="(val) => allData.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <div class="drawer-col-2">
      <el-drawer
        :title="allData.drawerTitle"
        :visible="allData.visible"
        direction="rtl"
        :before-close="allData.handleClose"
        :wrapperClosable="false"
        :size="795"
      >
      <el-form label-position="top" label-width="80px" :rules="allData.rules" :model="allData.addData" class="drawer" ref="addData">
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构名称:" prop="orgId">
                <el-select 
                  :disabled="allData.drawerTitle === '查看'"
                  v-model="allData.addData.orgId" 
                  placeholder="请选择机构名称">
                  <el-option
                    v-for="item in allData.orgIdArr"
                    :key="item.keyId"
                    :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专户名称:" prop="pfName">
                <el-select 
                  :disabled="allData.drawerTitle === '查看'"
                  v-model="allData.addData.pfName" 
                  placeholder="请选择组合树">
                  <el-option
                    v-for="item in allData.pfNameArr"
                    :key="item.keyId"
                    :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产名称:" prop="assetName">
                <el-input v-model="allData.addData.assetName" placeholder="请输入" :disabled="allData.drawerTitle === '查看'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产代码:" prop="assetCode">
                <el-input v-model="allData.addData.assetCode" placeholder="请输入" :disabled="allData.drawerTitle === '查看'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市场:" prop="mktCode">
                <el-select 
                  :disabled="allData.drawerTitle === '查看'"
                  v-model="allData.addData.mktCode" 
                  placeholder="请选择市场">
                  <el-option
                    v-for="item in allData.mktCodeArr"
                    :key="item.keyId"
                    :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="资产大类:" prop="assetType">
                <el-select 
                  :disabled="allData.drawerTitle === '查看'"
                  v-model="allData.addData.assetType" 
                  placeholder="请选择资产大类">
                  <el-option
                    v-for="item in allData.assetTypeArr"
                    :key="item.keyId"
                    :label="item.keyName"
                    :value="item.keyId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标准名称:" prop="sAssetName">
                <el-input 
                  v-model="allData.addData.sAssetName" 
                  :disabled="allData.drawerTitle === '查看'" 
                  @keyup.enter.native="allData.searchsAssetName(allData.addData.sAssetName)"
                  placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标准代码:" prop="sAssetCode">
                <el-input v-model="allData.addData.sAssetCode" placeholder="请输入" :disabled="allData.drawerTitle === '查看'"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标准市场:" >
                <el-input v-model="allData.addData.mktCode" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="标准大类:">
                <el-input v-model="allData.addData.sAssetType" placeholder="请输入" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <EditTable title="资产信息" 
          :isEdit="false"
          :showOption="false"
          class="last-element"
          :table-column-list="allData.tableColumnList"
          @handledbClickRow="allData.rowDoubleClick"
          :formData="allData.stableData" >
        </EditTable>
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
import EditTable from '@/components/EditTable/index.vue';
import { subjectAssetStore } from "@model/store/modules/subjects/subjectAsset";

export default Vue.extend({
  name: 'subjectAsset',
  computed: {
    allData() {
      const data = subjectAssetStore()
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
    EditTable,
  }, 
  created() {
    this.$nextTick(() => {
      this.allData.init(this)
    })
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
  }
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>