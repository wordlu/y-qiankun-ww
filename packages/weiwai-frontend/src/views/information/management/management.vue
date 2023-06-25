<template>
  <div style="height: 100%;">
    <BaseForm :form-data="formData" :set-options="manage.setOptions" @inquire="manage.inquire" ref="form"  @reset="manage.reset"/>
    <BaseTable :tableData="manage.tableData" :tableColumn="tableColumn" :pagination="true" :total="manage.pageInfo.total"
      @sizeChange="manage.sizeChange" @pageChange="manage.pageChange" :serialShow="true" :pageInfo="manage.pageInfo" :loadingShow="manage.loadingShow">
      <template slot="multiple-operation" slot-scope="{ selectionData }">
        <el-button  @click="() => manage.derive($refs.form)">导出</el-button>
        <el-button type="primary" @click="manage.add">新增</el-button>
      </template>
      <template slot="btnshow" slot-scope="{row}">
        <el-button type="text" size="mini" @click="manage.examine(row)">查看</el-button>
        <el-button type="text" size="mini" @click="manage.edit(row)" v-if="row.cChecked === 1">反审核</el-button>
        <BaseDropdown v-else textName="更多" :dropdownList="dropdownList"
          @handleCommand="(value) => manage.handleCommand(value, row)"></BaseDropdown>
      </template>
    </BaseTable>
    <div class="drawer-col-2">
      <el-drawer :title="manage.title" :visible="manage.addVisible" direction="rtl"
        :before-close="() => manage.handleClose($refs.form,$refs.edit)" :wrapperClosable="false" :size="795"
        @open="() => manage.open(tableColumnList)">
        <!-- <el-tabs v-model="manage.activeName" type="card" @tab-click="manage.handleClick">
          <el-tab-pane label="基本信息" name="info"> -->
            <el-form label-position="top" label-width="80px" :rules="rules" :model="manage.addData" class="drawer"
              ref="form" :hide-required-asterisk="manage.show">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="组合名称:" prop="pfName">
                    <el-input v-model="manage.addData.pfName" placeholder="请输入" :disabled="manage.show"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组合代码:" prop="pfId">
                    <el-input v-model="manage.addData.pfId" placeholder="请输入"
                      :disabled="manage.show || manage.editData"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="管理人:" prop="mngrId">
                    <el-select filterable v-model="manage.addData.mngrId" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionOne" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="托管人:" prop="trustmngrId">
                    <el-select filterable v-model="manage.addData.trustmngrId" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionTwo" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="持仓状态:" prop="posState">
                    <el-select filterable v-model="manage.addData.posState" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionThree" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="资产类型:" prop="assetType">
                    <el-select filterable v-model="manage.addData.assetType" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionFour" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组合成立日:">
                    <el-date-picker v-model="manage.addData.chgDate" type="date" placeholder="选择日期"
                      value-format="yyyyMMdd" :disabled="manage.show">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="组合截止日:" prop="stateName">
                    <el-date-picker v-model="manage.addData.endDate" type="date" placeholder="选择日期"
                      value-format="yyyyMMdd" :disabled="manage.show">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="投资经理:">
                    <el-select filterable v-model="manage.addData.investMgr" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionFive" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="投资部门:">
                    <el-input v-model="manage.addData.investDepName" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="投资计划:" prop="investWay">
                    <el-select filterable v-model="manage.addData.investWay" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionSix" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="投顾机构: ">
                    <el-select filterable v-model="manage.addData.orgId" placeholder="请选择" :disabled="manage.show">
                      <el-option v-for="item in manage.optionSeven" :key="item.keyId" :label="item.keyName"
                        :value="item.keyId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="市场代码:" prop="marketCode">
                    <el-input v-model="manage.addData.marketCode" placeholder="请输入" :disabled="manage.show"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="市场代码2:" prop="marketCode2">
                    <el-input v-model="manage.addData.marketCode2" placeholder="请输入" :disabled="manage.show"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <EditTable title="组合扩展信息" :table-column-list="tableColumnList" :formData="manage.formData1"
              class="last-element" :recordCreatorProps="{ record: defaultRow }" :isEdit="!manage.show"
              :showOption="!manage.show" ref="edit">
              <template slot="operate" slot-scope="{row,editRowIndex}">
                <el-popconfirm title="删除此行？" @confirm="manage.onDelete(row, editRowIndex)">
                  <!-- <i class="el-icon-delete" slot="reference" @click.stop></i> -->
              <span class="icon iconfont" slot="reference" @click.stop>&#xe679;</span>

                </el-popconfirm>
              </template>
            </EditTable>
          <!-- </el-tab-pane> -->
          <!-- <el-tab-pane label="配置管理" name="second">
            <div class="field">展示字段列</div>
            <div>
              <el-checkbox-group v-model="manage.fieldList">
                <el-checkbox v-for="item in manage.fieldData" :label="item" :key="item" :disabled="manage.show">{{ item
                }}</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="field">展示指标</div>
            <div>
              <el-checkbox-group v-model="manage.targetList">
                <el-checkbox v-for="item in manage.targetData" :label="item" :key="item">{{ item }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </el-tab-pane> -->
        <!-- </el-tabs> -->
        <div class="btn" v-if="!manage.show">
          <el-button  @click="() => manage.handleClose($refs.form, $refs.edit)">取消</el-button>
          <el-button  type="primary" @click="() => manage.save($refs.form, $refs.edit)">保存</el-button>
        </div>
      </el-drawer>
    </div>

  </div>
</template>

<script lang='ts'>
import '@/styles/commonStyle.less'
import Vue from 'vue';
import BaseForm from "@/components/BaseForm/index.vue";
import BaseTable from "@/components/BaseTable/BaseTable.vue";
import BaseDropdown from '@/components/BaseDropdown/BaseDropdown.vue'
import EditTable from '@/views/information/baseTable/index.vue';
import { managementStore } from "@model/store/modules/information/management";
import { formData, tableColumn, tableColumnList, defaultRow } from "../../../../../weiwai-model/src/store/modules/information/management/data";
import { list } from 'postcss';
// import {cloneDeep} from 'lodash'
export default Vue.extend({
  components: { BaseForm, BaseTable, BaseDropdown, EditTable },
  name: 'management',
  computed: {
    manage() {
      const manage = managementStore();
      return manage
    },
  },
  data() {
    return {
      setOptions: {},
      formData,
      tableData: [

      ],
      tableColumn,
      // 分页的数据
      pageInfo: {
        total: 100,
        pageSize: 10,
        pageCount: 1
      },
      // 抽屉的显示
      addVisible: false,
      // 抽屉中的数据
      addData: {
        pfName: '',
        pfId: '',
        mngrId: '',
        trustmngrId: '',
        posState: '',
        assetType: '',
        chgDate: '',
        endDate: '',
        investMgr: '',
        investDepName: '',
        investWay: '',
        orgId: '',
        marketCode: '',
        marketCode2: '',
        investDep: null// 投资部门转换的keyId值后端需要的
      },
      // 校验的数据
      rules: {
        pfName: [
          { required: true, message: '请输入组合名称', trigger: 'blur' },
          { min: 1, max: 200, message: '不能超过200个字符', trigger: 'blur' },
        ],
        pfId: [
          { required: true, message: '请输入组合代码', trigger: 'blur' },
          { min: 1, max: 50, message: '不能超过200个字符', trigger: 'blur' },
        ],
        mngrId: [
          { required: true, message: '请选择管理人', trigger: 'blur' },
        ],
        trustmngrId: [
          { required: true, message: '请选择托管人', trigger: 'blur' },
        ],
        posState: [
          { required: true, message: '请选择持仓状态', trigger: 'blur' },
        ],
        assetType: [
          { required: true, message: '请选择资产类型', trigger: 'blur' },
        ],
        investWay: [
          { required: true, message: '请选择投资计划', trigger: 'blur' },
        ],
        marketCode: [
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ],
        marketCode2:[
          { min: 1, max: 50, message: '不能超过50个字符', trigger: 'blur' },
        ]
      },
      // 控制是否禁用
      show: false,
      // 抽屉的名字
      title: '',
      // 工作流类型option
      optionOne: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      // 上级步骤option
      optionTwo: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      // 业务属性option
      optionThree: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      optionFour: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      optionFive: [{ keyId: 1, keyName: '1', depId: 33, depName: '测试1' }, { keyId: 2, keyName: '2', depId: 44, depName: '测试2' }],
      optionSix: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      optionSeven: [{ keyId: 1, keyName: '1' }, { keyId: 2, keyName: '2' }],
      formData1: {
        tableData: [{ extend: '1', extendVal: '2', remarks: '3' }]
      },
      tableColumnList,
      defaultRow,
      // tab绑定的值
      activeName: 'info',
      // 展示字段列选中的数据
      fieldList: [],
      // 展示指标选中的数据
      targetList: [],
      fieldData: [1, 2, 3, 4, 5],
      targetData: [1, 2, 3, 4, 5],
      dropdownList: [
        { value: '编辑', name: '编辑' },
        { value: '审核', name: '审核' },
      ],
      // 点击编辑的时候控制组合代码是否禁用
      editData: false
    }
  },
  async created() {
    this.manage.init(this.formData)
    this.manage.inquire()
  },
  watch: {
    "manage.addData.investMgr": {
      async handler(newVal, oldVal) {
        if (!newVal) return;
        let list = []
        if (this.manage.optionFive.length < 1) {
          console.log('sdasdawd');

          list = await this.manage.getsection()
        } else {
          list = this.manage.optionFive
        }
        const data = list.filter(
          (item: any) => item.keyId == newVal
        );
        if (data.length) {
          this.manage.addData.investDepName = data[0].depName;
          this.manage.addData.investDep = data[0].depId;
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 页面打开时给下拉框赋初始值
    init() {
      this.formData.renderFrom.forEach((item: any) => {
        switch (item.key) {
          case 'wfName': item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '审核' }]
            break;
          case 'wfId': item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '审核' }]
            break
          case 'sta': item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '审核' }]
            break
          case 'wfDatatype': item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '审核' }]
            break
          case 'wfAttr': item.options = [{ code: 1, name: '未审核' }, { code: 2, name: '审核' }]
            break
          default:
            break;
        }
      })

    },
    // 点击查询的时候
    inquire(data: any) {
      console.log(data);
    },
    // 点击查看的时候
    examine(row: any) {
      console.log(row);
      // let data = cloneDeep(row)
      this.title = '查看'
      this.show = true
      this.addVisible = true
      this.addData = row
      this.tableColumnList.forEach(item => {
        item.disabled = true
      })
    },
    // 点击新增的时候
    add() {
      this.title = '新增'
      this.addVisible = true
    },
    // 点击编辑的时候
    edit(row: any) {
    },
    // 抽屉关闭的时候
    handleClose() {
      this.$refs.form.resetFields()
      this.activeName = 'info'
      this.show = false
      this.addVisible = false
      this.addData = {
        pfName: '',
        pfId: '',
        mngrId: '',
        trustmngrId: '',
        posState: '',
        assetType: '',
        chgDate: '',
        endDate: '',
        investMgr: '',
        investDepName: '',
        investWay: '',
        orgId: '',
        marketCode: '',
        marketCode2: '',
        investDep: null
      }
      this.fieldList = [],
        this.targetList = []
      this.formData1.tableData = []
      this.tableColumnList.forEach(item => {
        item.disabled = false
      })
    },
    // 点击保存的时候
    save() {
      this.$refs.form.validate((value: any) => {
        console.log(value);
      })
    },
    onDelete(row: any, index: any) {
      this.formData1.tableData.splice(row.index, 1)

    },
    // tab栏切换的时候
    handleClick(val: any) {
      // this.activeName=val.label
      console.log(this.activeName);
    },
    // 点击更多的时候
    handleCommand(value: any, row: any) {
      if (value === '编辑') {
        this.title = '编辑'
        this.addVisible = true
        this.addData = row
        this.editData = true
      }
    },
    // 抽屉打开的时候
    open() {
      this.fieldData

    }
  },
    beforeDestroy() {
    this.manage.clear()
  },
})
</script>

<style lang='less' scoped>
@import "@/styles/commonStyle.less";

::v-deep .el-drawer__body {
  padding: 0px 0 24px 24px !important;

}

// ::v-deep .el-tabs__header {
//   border: 0;
// }

::v-deep .el-tabs__content {
  // overflow: visible;
  // border: 0;
  padding-top: 16px;
}

// ::v-deep .el-tabs__nav {
//   border: none !important;
//   background-color: #F5F8FF;
//   color: #6F7685;
//   font-weight: 400;
// }

// ::v-deep #tab-second {
//   border: none !important;
// }

// ::v-deep .is-active {
//   background-color: #fff;
//   color: #3371FF !important;
//   font-weight: 500;
// }

// ::v-deep #tab-info {
//   color: #6F7685;
// }

  ::v-deep .el-tabs--card>.el-tabs__header {
    border-bottom: none
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    background: #3371FF;
    color: #fff !important;
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__nav {
    border-bottom: 1px solid #E4E7ED
  }

  ::v-deep .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: transparent
  }
.field {
  margin-bottom: 16px;
  font-size: 16px;
  color: #0F1B33;
  font-weight: 500;
}

.el-checkbox-group {
  margin-bottom: 8px;
}

::v-deep .el-tabs__header{
  margin: 0 !important;
}
::v-deep .el-checkbox {
  width: 160px !important;
  margin-right: 0;
  margin-bottom: 16px;
}

::v-deep .el-checkbox:nth-child(5n) {
  width: 127px !important;
}
</style>
<style lang="less"></style>