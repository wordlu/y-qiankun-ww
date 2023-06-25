<template>
  <div class="mainBox">
    <el-form
      v-if="show"
      ref="myForm"
      size="small"
      :model="useData.initData"
      :rules="useData.rules"
      label-width="auto"
      label-position="right"
      class="grid"
      @submit.native.prevent
    >
      <div class="form-border-top">
        <el-row v-for="(rowItem, rowIndex) in useData.maxRow" :key="rowIndex">
          <el-col
            v-for="(item, index) in filterRenderControl(renderControl, rowItem)"
            :key="index"
            :span="searchSapn(item)"
          >
            <template v-if="item.type !== 'Slot'">
              <el-form-item
                :label="item.label"
                :label-width="item.labelWidth"
                :prop="setProp(item.key)"
                :class="returnClass(item)"
              >
                <el-date-picker
                  v-if="item.type === 'DatePicker'"
                  ref="datePicker"
                  :key="item.key"
                  v-model="useData.initData[item.key]"
                  :class="item.class"
                  type="date"
                  align="center"
                  :append-to-body="false"
                  :placeholder="item.placeholder || '选择日期'"
                  :value-format="item.format || 'yyyyMMdd'"
                  :picker-options="item.options"
                  @change="(val) => onTrigger(useData.initData, item, val)"
                  @input.native="(val) => onDatePickerInput(val)"
                >
                </el-date-picker>
                <el-select
                  v-else-if="item.type === 'Select'"
                  v-model="useData.initData[item.key]"
                  :class="item.class"
                  :disabled="item.disabled"
                  :filterable="item.filterable"
                  :remote="item.remote"
                  :clearable="item.clearable"
                  :multiple="item.multiple"
                  :popper-append-to-body="false"
                  :collapse-tags="item.multiple"
                  :filter-method="
                    item.filterMethod && ((val) => getFilterMethod(val, item))
                  "
                  :remote-method="
                    (val) => getRemoteMethod(val, item, useData.initData)
                  "
                  :reserve-keyword="item.reserveKeyword"
                  placeholder="请选择"
                  @change="onTrigger(useData.initData, item, '')"
                  @visible-change="
                    (val) => onVisibleTrigger(useData.initData, item, val)
                  "
                  @clear="onClear(useData.initData, item)"
                >
                  <!-- 多选适配全选与取消全选功能，如果需要全选项，renderForm 加上 optionsHasSelectAll: true -->
                  <el-checkbox
                    v-if="showSelectAll(item)"
                    v-model="item.checked"
                    class="ml20"
                    @change="selectAll(useData.initData, item)"
                    >全选</el-checkbox
                  >
                  <el-option
                    v-for="(i, indexs) in item.options || []"
                    :key="i.code + '' + indexs"
                    :label="i.name"
                    :value="i.code"
                  ></el-option>
                </el-select>
                <el-input
                  v-else-if="item.type === 'Input'"
                  v-model="useData.initData[item.key]"
                  :placeholder="item.placeholder"
                  :disabled="item.show"
                  :readonly="item.readonly"
                  :show-password="item.password"
                  autocomplete="new-password"
                  :onfocus="item.onfocus"
                  :maxlength="item.maxlength"
                >
                </el-input>
                <el-input-number
                  v-else-if="item.type === 'InputNumber'"
                  v-model="useData.initData[item.key]"
                  :min="0"
                  :precision="2"
                >
                </el-input-number>
                <div v-else-if="item.type === 'Reminder'" class="Reminder">
                  {{ item.key }}
                </div>
                <div v-show="item.notes" class="Reminder">{{ item.notes }}</div>
              </el-form-item>
            </template>
            <slot
              v-else
              :name="item.slotName"
              :data="useData.initData"
              :rowItem="item"
            ></slot>
          </el-col>
          <!-- 按钮在行内 -->
          <el-col
            v-if="btnPositionInner(rowItem)"
            :class="positionRightClass"
            :span="6"
          >
            <div>
              <el-button
                v-for="(btnItem, btnIndex) in renderButtons"
                :key="btnIndex"
                :size="btnItem.size"
                :type="btnItem.btnType"
                @click="trigger(btnItem.onClick)"
                >{{ btnItem.label }}</el-button
              >
              <slot name="otherBtn" />
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 按钮另起一行 -->
      <el-row v-if="btnPositionBottom" class="form-border-bottom">
        <el-col :span="24" class="fold-box">
          <span>
            <el-button
              v-for="(btnItem, btnIndex) in renderButtons"
              :key="btnIndex"
              :type="btnItem.btnType"
              @click="trigger(btnItem.onClick)"
              >{{ btnItem.label }}</el-button
            >
            <slot name="otherBtn" />
          </span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component // 声明为一个组件
export default class BaseForm extends Vue {
  /** ---data--- */
  show = true;
  optionsCopy: any = {};
  useData: any = {};
  renderControl: any = [];
  defaultControl: any = [];
  renderButtons: any = [];
  list: any = [];
  input: any = null;

  /** ---props--- */
  @Prop() private formData!: any;
  @Prop({ default: 80 }) labelWidth!: number;
  @Prop() private setOptions!: any;

  /** ---生命周期--- */
  private created() {
    this.init();
    this.initOptions();
    this.useData = this.formData;
  }

  /** ---计算属性--- */
  public get positionRightClass() {
    return this.defaultControl.length % 4 <= 3 &&
      this.defaultControl.length % 4 >= 1
      ? "text-right"
      : "";
  }

  // 按钮另起一行
  public get btnPositionBottom() {
    return this.defaultControl.length % 4 === 0;
  }

  /** ---组件内方法--- */
  private init() {
    this.renderControl = this.formData.renderFrom.filter(
      (i: any) => i.type !== "Buttons"
    );
    this.defaultControl = this.renderControl;
    // 初始化的时候(页面切换或者tab切换时)，把有全选功能的select checked重置为false
    this.renderControl = this.renderControl.map((item: any) => {
      if (item.optionsHasSelectAll) {
        item.checked = false;
      }
      return item;
    });
    this.renderButtons = this.formData.renderFrom.find(
      (i: any) => i.type === "Buttons"
    ).children;
    this.useData = JSON.parse(JSON.stringify(this.formData));
    this.list = this.renderControl.map((item: any) => {
      return item;
    });
  }

  private initOptions() {
    let opt = this.formData.renderFrom.filter((i: any) => i.type !== "Buttons");
    opt.map((i: any) => {
      this.optionsCopy[i.key] = i.options || [];
    });
  }

  // 查询按钮在行内
  public btnPositionInner(rowItem: any) {
    if (rowItem !== this.useData.maxRow) return false;
    return (
      this.defaultControl.length % 4 <= 3 && this.defaultControl.length % 4 >= 1
    );
  }

  // 处理renderControl
  public filterRenderControl(arr: any, item: any) {
    const data = arr.filter((i: any) => i.rowId === item);
    return data;
  }

  // col span 计算
  public searchSapn(item: any) {
    const { allRow, span } = item;
    const widthVal = allRow ? 24 : span || 24 / this.useData.maxCol;
    return widthVal;
  }

  // 以下为日期校验方法 - 非交易日跳最近的交易日
  public onDatePickerInput(val: any) {
    // 日期组件input事件，获取输入的内容
    this.input = val.target.value;
  }

  // 动态添加表单prop属性
  public setProp(key: any) {
    const { rules } = this.useData;
    if (rules) {
      let propsName = Object.keys(this.useData.rules);
      if (propsName.length > 0 && propsName.includes(key)) {
        return key;
      } else {
        return "";
      }
    }
  }

  public returnClass(item: any) {
    return item.type === "Reminder" ? "formItemS" : "formItem";
  }

  // 下拉多选+可搜索+全选时，自定义搜索方法
  @Emit() getFilterMethod(val: any, item: any) {
    let { key } = item;
    let arr =
      this.optionsCopy[key].length > 0 ? this.optionsCopy : this.setOptions;
    let setOpt = {};
    if (val) {
      let opt = arr[key].filter((i: any) => i.name.includes(val));
      setOpt = {
        ...this.optionsCopy,
        [key]: opt,
      };
    } else {
      setOpt = { ...arr };
    }
    this.setDataOptions(setOpt);
  }
  public setDataOptions(data: any) {
    let keyAry = Object.keys(data);
    keyAry.forEach((i) => {
      if (this.renderControl.length > 0) {
        const index = this.renderControl.findIndex(
          (item: any) => item.key === i
        );
        if (index !== -1) {
          this.$set(this.renderControl[index], "options", data[i]);
        }
      }
    });
  }
  // select远程搜索方法
  public getRemoteMethod(val: any, item: any, initData: any) {
    this.$emit("getRemoteMethod", val, item, initData);
  }
  @Emit("trigger") onTrigger(data: any, item: any, val: any) {
    // change方法判断 select 全选状态
    const { type, optionsHasSelectAll, key, options } = item;
    if (type === "Select" && optionsHasSelectAll) {
      let length = options.length;
      if (
        (data[key] && data[key].length) === (options && length) &&
        data[key].length !== 0 &&
        length !== 0
      ) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    }
    // 日期组件加了非交易日校验，需要在change的时候再赋值
    if (type === "DatePicker") {
      data[key] = val;
    }
    if (data.type === 1) {
      let arr = ["path", "sort"];
      this.renderControl = this.renderControl.filter((item: any) => {
        return !arr.includes(item.key);
      });
    } else {
      this.renderControl = this.list;
    }
  }
  public trigger(fn: any) {
    const { initData } = this.useData;
    let returnData: any = {};
    if (this.useData.Folding) {
      //  去掉折叠数据
      for (const key in this.useData.initData) {
        if (this.renderControl.map((i: any) => i.key).includes(key)) {
          returnData[key] = initData[key];
        }
      }
    } else {
      returnData = initData;
    }
    fn(returnData, this.useData, this);
  }

  @Emit("selectVisible") onVisibleTrigger(data: any, item: any, val: any) {
    // 下拉隐藏的时候，处理下拉数据初始化
    let { type, remote, key, options, multiple } = item;
    if (
      val &&
      type === "Select" &&
      !remote &&
      multiple &&
      this.optionsCopy[key]
    ) {
      // trigger方法 select 有输入值的时候，以及不是远程搜索，以及是多选
      let length = options.length;
      const hasOptions = !options || length < 1;
      const optionsQuiteCopyOptions =
        !hasOptions && length !== this.optionsCopy[key].length;
      if (optionsQuiteCopyOptions || hasOptions) {
        let opt =
          this.optionsCopy[key].length > 0 ? this.optionsCopy : this.setOptions;
        let setOpt = {
          ...opt,
          [key]: opt[key],
        };
        this.setDataOptions(setOpt);
      }
    }
  }

  @Emit("handleClear") onClear(initData: any, item: any) {
    console.log(initData, item);
  }

  public showSelectAll(item: any) {
    const { options, optionsHasSelectAll } = item;
    return options && options.length && optionsHasSelectAll;
  }
  // select 全选 或 取消全选
  public selectAll(initData: any, item: any) {
    let selectedArr: any = [];
    const { key, options, checked } = item;
    if (checked) {
      options.map((i: any) => {
        selectedArr.push(i.code);
      });
    } else {
      selectedArr = [];
    }
    initData[key] = selectedArr;
  }
}
</script>

<style lang="scss" scoped>
.mainBox {
  background: #ffffff;
  border-radius: 2px;
}
.form-border-top {
  padding: 16px 16px 0;
  margin-top: 10px;
  // border: 1px solid #e6e9eb;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.form-border-bottom {
  padding: 0px 0px 16px !important;
  margin: 0 10px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.el-button {
  height: 32px;
  font-size: 14px;
  line-height: 0;
  border-radius: 2px;
}

.el-button--primary {
  background: #2f6aff;
  border-color: #2f6aff;
}

.el-button--default {
  border: 1px solid rgba(183, 186, 193, 1);
}

.Reminder {
  padding-left: 10px;
  font-size: 10px;
  line-height: 20px;
  color: #409eff;
}

.el-form-item {
  margin-bottom: 12px;
  ::v-deep.el-form-item__error {
    padding-top: 0 !important;
  }
}

.text-right {
  // margin-top: 3px;
  text-align: right;
  float: right;
}

.formItem {
  margin-left: 5px;

  .el-cascader,
  .el-input,
  .el-date-editor,
  .el-select {
    width: 100%;
  }

  .el-cascader {
    ::v-deep .el-input {
      .el-input__inner {
        height: 36px !important;
      }
    }
  }
}

.fold-box {
  text-align: right;

  .fold {
    display: inline-block;
    margin-left: 10px;
    font-size: 12px;
    color: #409eff;
    cursor: pointer;
    transition: 1s;

    .spin {
      transition: 0.5s;
      transform: rotate(0deg);
    }

    .homing {
      transition: 0.5s;
      transform: rotate(180deg);
    }
  }
}

::v-deep .el-input-number__decrease {
  display: none !important;
}
::v-deep .el-input-number__increase {
  display: none !important;
}
::v-deep .el-input-number {
  width: 305px !important;
}

::v-deep .el-form-item {
  margin-left: 5px !important;

  .el-select {
    width: 100% !important;
  }
  .detectZoom150 {
    position: relative;
    .el-select-dropdown {
      left: 1255px !important;
    }
    .el-cascader__dropdown {
      left: 1255px !important;
    }
  }
  .detectZoom300 {
    position: relative;
    .el-select-dropdown {
      left: 1220px !important;
    }
    .el-cascader__dropdown {
      left: 1220px !important;
    }
  }
}
</style>
<style>
.formItemS .el-form-item__content {
  margin-left: 0 !important;
}

.el-form-item--small.el-form-item {
  margin-bottom: 16px !important;
}
.el-form-item__label,
.el-button {
  font-size: 14px;
  color: #3f495c;
}
.el-input__inner,
.el-input__inner {
  font-size: 14px;
  color: #3f495c;
  border: 1px solid rgba(183, 186, 193, 1);
  border-radius: 2px;
}
</style>
