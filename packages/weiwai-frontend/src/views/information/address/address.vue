<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="address.setOptions" @inquire="address.inquire"  @reset="address.reset" />
    <BaseTable :tableData="address.tableData" :tableColumn="tableColumn" :pagination="true"
      :total="address.pageInfo.total" @pageChange="address.pageChange" @sizeChange="address.sizeChange" :serialShow="true"
      :pageInfo="address.pageInfo" selection="multiple" :loadingShow="address.loadingShow">
      <span slot="multiple-operation" slot-scope="{selectionData}">
        <el-button @click="address.start(selectionData)">启用</el-button>
        <el-button @click="address.forbidden(selectionData)">禁用</el-button>
        <el-button type="primary" @click="address.add(selectionData)">新增</el-button>
      </span>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="address.edit(row)">编辑</el-button>
        <BaseDropdown textName="更多" :dropdownList="dropdownList"
          @handleCommand="(val) => address.handleCommand(val, row)">
        </BaseDropdown>
      </template>
    </BaseTable>
    <!-- 抽屉 -->
    <div class="drawer-col-1"> <el-drawer :title="address.title" :visible="address.addVisible" direction="rtl"
        :before-close="() => address.handleClose($refs.form)" :wrapperClosable="false" :size="409" @open="address.onOpen">
        <el-form label-position="top" label-width="80px" class="drawer" :rules="rules" :model="address.addData"
          ref="form">

          <el-form-item label="机构代码:" prop="orgId">
            <el-input v-model="address.addData.orgId" placeholder="请输入" :disabled="address.show"></el-input>
          </el-form-item>
          <el-form-item label="机构名称:" prop="orgName">
            <el-input v-model="address.addData.orgName" placeholder="请输入" :disabled="address.show"></el-input>
          </el-form-item>
          <el-form-item label="联系人:" prop="contacts">
            <el-input v-model="address.addData.contacts" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系方式:" prop="tel">
            <el-input v-model="address.addData.tel" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="联系方式2:" prop="tel1">
            <el-input v-model="address.addData.tel1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否有效:" prop="isValid">
            <el-select v-model="address.addData.isValid" placeholder="请选择">
              <el-option v-for="item in address.options" :key="item.keyId" :label="item.keyName" :value="item.keyId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务:" prop="job">
            <el-input v-model="address.addData.job" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="mail">
            <el-input v-model="address.addData.mail" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="memo">
            <el-input v-model="address.addData.memo" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
              placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button @click="() => address.handleClose($refs.form)">取消</el-button>
          <el-button type="primary" @click="() => address.save($refs.form)">保存</el-button>
        </div>
      </el-drawer></div>
    <!-- dialog弹框 -->
    <div class="primaryBtn">
      <el-dialog title="查看此分类" :visible.sync="address.dialogVisible" width="796" :close="address.close"
        custom-class="dialog">
        <BaseTable :tableData="address.tableDataTwo" :tableColumn="tableColumnTwo" :pagination="true"
          :total="address.DiaPageInfo.total" :heightShow="true" :showSlotClass="false" :serialShow="true"
          :pageInfo="address.DiaPageInfo" @pageChange="address.diaPageChange" @sizeChange="address.diaSizeChange"
          layout="next,pager, prev" :loadingShow="address.dialogLoadingShow">
        </BaseTable>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="address.close" size="small">取 消</el-button>
        </span> -->
      </el-dialog>
    </div>
  </div>
</template>

<script lang='ts'>
import '@/styles/commonStyle.less'
import Vue from 'vue';
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue'
import { formData, tableColumn, tableColumnList, defaultRow, tableColumnTwo } from "../../../../../weiwai-model/src/store/modules/information/address/data";
import { addressStore } from "@model/store/modules/information/address";
export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown },
  name: 'address',
  computed: {
    address() {
      const organ = addressStore();
      return organ
    },
  },
  data() {
    return {
      // dialog框的表格column数据
      tableColumnTwo,
      defaultRow,
      tableColumnList,
      setOptions: {},
      formData,
      // 外部表格的数据
      tableData: [],
      // dialog表格的数据
      tableDataTwo: [],
      tableColumn,
      // 分页的数据
      pageInfo: {
        total: 100,
        pageSize: 10,
        pageCount: 1
      },
      dropdownList: [
        { value: '查看此分类', name: '查看此分类' },
        { value: '添加人员', name: '添加人员' },
      ],
      // 抽屉的显示
      addVisible: false,
      // 抽屉；中的数据
      addData: {
        orgId: '',
        orgName: '',
        contacts: '',
        tel: '',
        tel1: '',
        validName: '',
        job: '',
        mail: '',
        memo: ''
      },
      // 校验的数据
      rules: {
        orgId: [
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_]{1,}$/,
            message: "只能输入数字、字母、下划线",
            trigger: "blur",
          },
          { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' },
        ],
        orgName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 1, max: 20, message: '不能超过20个字符', trigger: 'blur' },

        ],
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' },
        ],
        tel: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: "只能输入数字",
            trigger: "blur",
          },
          { min: 1, max: 11, message: '不能超过11个字符', trigger: 'blur' },
        ],
        tel1: [
          { required: true, message: '请输入联系方式2', trigger: 'blur' },
          {
            pattern: /^[0-9]*$/,
            message: "只能输入数字",
            trigger: "blur",
          },
          { min: 1, max: 11, message: '不能超过11个字符', trigger: 'blur' },
        ],
        isValid: [
          { required: true, message: '请选择', trigger: 'blur' },
        ],
        job: [
          { required: true, message: '请输入职务', trigger: 'blur' },
          { min: 1, max: 10, message: '不能超过10个字符', trigger: 'blur' },
        ],
        mail: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        memo: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ]
      },
      // 控制是否禁用
      show: false,
      // 控分类代码和键值代码是否禁用
      showTwo: false,
      // 抽屉的名字
      title: '',
      // 是否有效的选项
      options: [{
        label: '有效',
        value: 1
      }, {
        label: '无效',
        value: 0
      }],

      // dialog弹框的数据
      dialogVisible: false
    }
  },
  async created() {
    this.formData = await this.address.init(this.formData)
    this.address.inquire()
  },
  methods: {
    // 点击查询的时候
    inquire(data: any) {
      console.log(data);
    },
    // 给初始值赋值的时候
    init() {
      this.formData.renderFrom.forEach((item: any) => {
        if (item.key === 'org_name') {
          item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '已审核' }]
        }
      })
    },
    // 点击编辑的时候
    edit(row: any) {
      this.title = '编辑'
      this.show = true
      this.addVisible = true
      this.addData = row
    },
    handleCommand(val: any, row: any) {
      console.log(val, row);
      const { orgId, orgName, tel1, validName } = row
      if (val === '添加人员') {
        this.addData.orgId = orgId
        this.addData.orgName = orgName
        this.addData.tel1 = tel1
        this.addData.validName = validName
        this.addVisible = true
        this.show = true
      } else {
        this.dialogVisible = true
      }

    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    //抽屉打开的时候
    onOpen() { },
    // 抽屉关闭的时候

    // 点击保存的时候
    save() {
      this.$refs.form.validate((value: any) => {
        this.address.save()
      })
    },
    // 点击启用的时候
    start(val: any) {
      if (val.length === 0) {
        return this.$message.error('未选择任何数据')
      }
    },
    // 点击禁用的时候
    forbidden(val: any) {
      if (val.length === 0) {
        return this.$message.error('未选择任何数据')
      }
      console.log(val);
    },
    // 关闭dialog弹框的事件
    close() {
      this.dialogVisible = false
    }
  },
  beforeDestroy() {
    this.address.clear()
  },
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";
</style>
<style lang="less">
.primaryBtn {
  .el-dialog {
    .el-dialog__header {
      padding: 16px 24px 8px !important;
    }

    .el-dialog__body {
      // height: 500px !important;

      padding: 0px 8px 8px !important;
    }
  }

  .del {
    .el-button--primary {
      background-color: #2F6AFF;
    }
  }
}
</style>