<template>
      <!-- :label-width="labelWidth + 'px'" -->

  <div class="mainBox">
    <el-form
      v-if="show"
      ref="myForm"
      size="small"
      :model="useData.initData"
      :rules="useData.rules"
      label-position="right"
      label-width="auto"
      class="grid"
      @submit.native.prevent
    >
      <div class="form-border-top">
        <el-row v-for="(rowItem, rowIndex) in useData.maxRow" :key="rowIndex" :gutter="gutterNumber">
          <el-col
            v-for="(item, index) in filterRenderControl(renderControl, rowItem)"
            :key="index"
            :span="searchSpan(item)"
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
                  :placeholder="item.placeholder || datePlaceHolder"
                  :value-format="item.format || 'yyyyMMdd'"
                  :picker-options="item.options"
                  @change="(startdate) => onStartDateChange(startdate, item.key, 'formItem')"
                >
              </el-date-picker>
                <el-date-picker
                  v-if="item.type === 'DatePickerDisableAfterToday'"
                  ref="datePicker"
                  :key="item.key"
                  v-model="useData.initData[item.key]"
                  :class="item.class"
                  type="date"
                  align="center"
                  :append-to-body="false"
                  :placeholder="item.placeholder || datePlaceHolder"
                  :value-format="item.format || 'yyyyMMdd'"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
                  <el-date-picker v-if="item.type === 'DatePickerDaterange'" :key="item.key"
                    v-model="useData.initData[item.key]" type="daterange" :range-separator="item.rangeSeparator || '至'"
                    :start-placeholder="item.startPlaceholder || '开始日期'" :end-placeholder="item.endPlaceholder || '结束日期'"
                    :class="item.class" :value-format="item.format || 'yyyyMMdd'">
                  </el-date-picker>

                <!-- :filter-method="
                  item.filterMethod && ((val) => getFilterMethod(val, item))
                " -->
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
                  :remote-method="(val) => getRemoteMethod(val, item)"
                  :reserve-keyword="item.reserveKeyword"
                  :placeholder="item.placeholder || selectPlaceHolder"
                  @change="onTrigger(useData.initData, item)"
                  @visible-change="
                    (val) => onVisibleTrigger(useData.initData, item, val)
                  "
                  @clear="onClear(useData.initData, item)"
                >
                  <el-option
                    v-for="(i, indexs) in item.options || []"
                    :key="i[optionsKey.key] + '' + indexs"
                    :label="i[optionsKey.value]"
                    :value="i[optionsKey.key]"
                  >
                   <el-tooltip effect="dark" :content="i[optionsKey.value]" placement="top" v-if="item.tooltip">
                      <span class="optionText">{{ i[optionsKey.value] }}</span>
                    </el-tooltip>
                </el-option>
                </el-select>
                <el-input
                  v-else-if="item.type === 'Input'"
                  v-model="useData.initData[item.key]"
                  :disabled="item.show"
                  :clearable="item.clearable"
                  :readonly="item.readonly"
                  :show-password="item.password"
                  :placeholder="item.placeholder || inputPlaceHolder"
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
          <el-col
            v-if="btnPositionInner(rowItem)"
            :class="positionRightClass"
            :span="searchButtonSpan()"
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
      <el-row v-if="btnPositionBottom && btnShow" class="form-border-bottom">
        <el-col :span="24" class="fold-box">
          <span>
            <el-button
              v-for="(btnItem, btnIndex) in renderButtons"
              :key="btnIndex"
              :size="btnItem.size"
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

<script>
import { cloneDeep } from 'lodash';

export default {
  name: "base-form",
  data() {
    return {
      show: true,
      optionsCopy: {},
      useData: {},
      renderControl: [],
      defaultControl: [], // 默认值，展开收起用默认值来判断查询按钮位置
      renderButtons: [],
      selectName: '',
      numberValidateForm: {
        age: "",
      },
      inputPlaceHolder: "请输入",
      selectPlaceHolder: "请选择",
      datePlaceHolder: "选择日期",
      pickerOptions: {
       disabledDate(time){
        return time.getTime() > Date.now()
      }
    },
    };
  },
  created() {
    this.init();
    this.initOptions();
    this.useData = cloneDeep(this.formData);
  },
  computed: {
    // 如果搜索条件小于等于3个，按钮置于第一行右侧
    positionRightClass() {
      // return this.defaultControl.length % 4 <= this.useData.maxCol - 1
      //   ? "text-right"
      //   : "";
      if (!this.btnShow) {
        return "text-right"
      }
      return this.defaultControl.length % 4 <= 3 &&
        this.defaultControl.length % 4 >= 1
        ? "text-right"
        : "";
    },
    // 按钮在下方
    btnPositionBottom() {
      // return this.defaultControl.length % 4 > this.useData.maxCol - 1;
      return this.defaultControl.length % 4 === 0;
    },


  },
  props: {
    gutterNumber: {
      type: Number,
      default: 80,
    },
    optionsKey: {
      type: Object,
      default: function () {
        return {
          key: "keyId",
          value: "keyName"
        };
      },
    },
    formData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    labelWidth: {
      type: Number,
      default: 80,
    },
    setOptions: {
      type: Object,
      default: () => {},
      deep: true
    },
    btnShow:{
      type:Boolean,
      default:true
    }
  },
  watch: {
    setOptions: {
      handler(nv) {
        // this.setDataOptions(nv)
      },
      deep: true
    },
    'useData.initData': {
      handler(val) {
        if (!val.parentId && !val.curveId) {
          this.selectName = ''
        }
      },
      deep: true
    }
  },
  methods: {
    setFormData(data, type) {
      if (type === 'subject') {
        this.useData.initData.orgId = data.orgId
        this.useData.initData.subjSystem = data.subjSystemCode
        this.$emit("inquire", this.useData.initData)
      }
    },
    // 查询按钮在行内
    btnPositionInner(rowItem) {
      // const bool =
      //   this.defaultControl.length % 4 <= this.useData.maxCol - 1 &&
      //   this.useData.maxRow === rowItem;
      // return bool;
      if (!this.btnShow) {
        return true
      }
      return (
        this.defaultControl.length % 4 <= 3 &&
        this.defaultControl.length % 4 >= 1
      );
    },
    init() {
      this.renderControl = this.formData.renderFrom.filter(
        (i) => i.type !== "Buttons"
      );
      this.defaultControl = this.renderControl;
      // 初始化的时候(页面切换或者tab切换时)，把有全选功能的select checked重置为false
      this.renderControl = this.renderControl.map((item) => {
        if (item.optionsHasSelectAll) {
          item.checked = false;
        }
        return item;
      });
      this.renderButtons = this.formData.renderFrom.find(
        (i) => i.type === "Buttons"
      ).children;
      this.useData = cloneDeep(this.formData);
      this.list = this.renderControl.map((item) => {
        return item;
      });
    },
    initOptions() {
      let opt = this.formData.renderFrom.filter((i) => i.type !== "Buttons");
      opt.map((i) => {
        this.optionsCopy[i.key] = i.options || [];
      });
    },
    // 处理renderControl
    filterRenderControl(arr, item) {
      const data = arr.filter((i) => i.rowId === item);
      return data;
    },
    searchButtonSpan() {
      if (this.renderButtons.length > 3) return 12
      return 6
    },
    // col span 计算
    searchSpan(item) {
      const { allRow, span } = item;
      const widthVal = allRow ? 24 : span || 24 / this.useData.maxCol;
      return widthVal;
    },
    // 动态添加表单prop属性
    setProp(key) {
      const { rules } = this.useData;
      if (rules) {
        let propsName = Object.keys(this.useData.rules);
        if (propsName.length > 0 && propsName.includes(key)) {
          return key;
        } else {
          return "";
        }
      }
    },
    returnClass(item) {
      return item.type === "Reminder" ? "formItemS" : "formItem";
    },
    // 下拉多选+可搜索+全选时，自定义搜索方法
    getFilterMethod(val, item) {
      debugger
      let { key } = item;
      let arr =
        this.optionsCopy[key].length > 0 ? this.optionsCopy : this.setOptions;
      let setOpt = {};
      if (val) {
        let opt = arr[key].filter((i) => i.name.includes(val));
        setOpt = {
          ...this.optionsCopy,
          [key]: opt,
        };
      } else {
        setOpt = { ...arr };
      }
      // this.setDataOptions(setOpt);
      this.$emit("getFilterMethod", val, item);
    },
    // setDataOptions(data) {
    //   let keyAry = Object.keys(data);
    //   keyAry.forEach((i) => {
    //     if (this.renderControl.length > 0) {
    //       const index = this.renderControl.findIndex((item) => item.key === i);
    //       if (index !== -1) {
    //         this.$set(this.renderControl[index], "options", data[i]);
    //       }
    //     }
    //   });
    // },
    // select远程搜索方法
    getRemoteMethod(val, item, initData) {
      this.$emit("getRemoteMethod", val, item, initData);
    },
    onTrigger(data, item, val) {
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
        this.renderControl = this.renderControl.filter((item) => {
          return !arr.includes(item.key);
        });
      } else {
        this.renderControl = this.list;
      }
      this.$emit("trigger", data, item);
    },
    trigger(fn) {
      const { initData } = this.useData;
      let returnData = {};
      if (this.useData.Folding) {
        //  去掉折叠数据
        for (const key in this.useData.initData) {
          if (this.renderControl.map((i) => i.key).includes(key)) {
            returnData[key] = initData[key];
          }
        }
      } else {
        returnData = initData;
      }
      fn(returnData, this.useData, this);
    },
    onVisibleTrigger(data, item, val) {
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
            this.optionsCopy[key].length > 0
              ? this.optionsCopy
              : this.setOptions;
          let setOpt = {
            ...opt,
            [key]: opt[key],
          };
          // this.setDataOptions(setOpt);
        }
      }
      this.$emit("selectVisible", data, item, val);
    },
    onClear(initData, item) {
      this.$emit("handleClear", initData, item);
    },
    showSelectAll(item) {
      const { options, optionsHasSelectAll } = item;
      return options && options.length && optionsHasSelectAll;
    },
    // select 全选 或 取消全选
    selectAll(initData, item) {
      let selectedArr = [];
      const { key, options, checked } = item;
      if (checked) {
        options.map((i) => {
          selectedArr.push(i.code);
        });
      } else {
        selectedArr = [];
      }
      initData[key] = selectedArr;
    },
    handle(fn, val) {
      fn(val, this);
    },
    onStartDateChange(a,b,c){
      this.$emit('onStartDateChange',{name:a,code:b})
    }
  },
};
</script>

<style lang="less" scoped>
.mainBox {
  background: #ffffff;
  border-radius: 2px;
  margin-bottom: 16px;
}
.form-border-top {
  padding: 16px 16px 0;
  // overflow: hidden;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.form-border-bottom {
  padding: 0px 0px 16px !important;
  margin: 0 16px;
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
  background: #3371ff;
  border-radius: 2px;
  border: 1px solid #3371ff;
}
.el-button--default {
    padding: 8px 15px !important;
    border-radius: 2px !important;
    border: 1px solid rgba(183, 186, 193, 1);

    &:hover {
      border-color: #EAF0FF;
      background-color: #EAF0FF;
      color: #2F6AFF;
    }

    &:focus {
      border-color: #EAF0FF;
      background-color: #EAF0FF;
      color: #2F6AFF;
    }
  }
.butt-border {
  height: 36px;
  margin: 8px 10px;
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

  ::v-deep.el-form-item__content {
    height: 32px;
  }
}

.select-tree {
  ::v-deep .el-input__suffix {
    display: inline-block;
    width: 30px;
  }
}

.text-right {
  // margin-top: 3px;
  text-align: right;
  float: right;
}

.ml-20 {
  margin-top: 3px;
  margin-left: 20px;
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

.search-action {
  text-align: right;
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

.butDataL {
  // display: inline-block;
  float: left;
  padding-left: 10px;

  div {
    height: 36px;
    line-height: 36px;
    color: red;
  }
}

.butDataR {
  float: right;
  padding-left: 10px;

  div {
    height: 36px;
    line-height: 36px;
    color: red;
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
  .el-select-dropdown__item {
    max-width: 300px;
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
  height: 32px;
}

.popper .el-cascader-panel .el-radio {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 20;
  width: 100%;
  height: 100%;
}
.popper .el-cascader-panel .el-checkbox {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 20;
  width: 100%;
  height: 100%;
}

.popper .el-cascader-panel .el-cascader-node__label {
  margin-left: 10px;
}
.popper .el-cascader-panel .el-radio__input {
  margin-top: 10px;
  margin-left: 8px;
}
.popper .el-cascader-panel .el-checkbox__input {
  margin-top: 2px;
  margin-left: 8px;
}
.popper .el-cascader-panel .el-cascader-node__postfix {
  top: 10px;
}
.el-form-item--small.el-form-item {
  margin-bottom: 16px !important;
}
.el-input__inner,
.el-input__inner {
  font-size: 14px;
  color: #3f495c;
  border: 1px solid rgba(183, 186, 193, 1);
  border-radius: 2px;
}
.optionText {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
