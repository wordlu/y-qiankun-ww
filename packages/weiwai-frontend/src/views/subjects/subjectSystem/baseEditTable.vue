<template>
  <div class="basetable">
    <div style="padding: 16px;">
      <div class="slotMultiple">
        <div style="display: flex" class="btn">
          <slot name="multiple-operation" :selectionData="selectionData"></slot>
        </div>
      </div>
    <el-form :model="formData" ref="formTable">
      <el-table 
        :data="formData.tableData"
        :selection="selection" 
        :border="border" 
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll" 
        size="mini" 
        :height="height || height1" 
        :tree-props="treeProps" 
        :row-class-name="tableRowClassName"
        header-cell-class-name="tableHeader"
        v-loading="loadingShow"
        @sort-change="sortChange"
        @selection-change="selectionChange" 
        @select="rowSelect" 
        @select-all="selectAll"
        @row-dblclick="handledbClickRow" 
        @row-click="handleClickRow"
        >
        <!-- 序号多选框 -->
        <el-table-column 
          fixed
          v-if="selection === 'multiple'" 
          type="selection" align="center" width="55"
          :reserve-selection="rowKey ? true : false" 
          :selectable="selectable" />
        <el-table-column 
          fixed
          v-if="serialShow" 
          type="index" label="序号" width="40" align="center" />

        <el-table-column 
          v-for="item in tableColumn"
          :type="item.type" 
          :key="item.prop" 
          :prop="item.prop"
          :label="item.label"
          :align="item.align" 
          :width="item.width" 
          :fixed="item.fixed" 
          :sortable="item.sortable"
          :column-key="item.prop" 
          :filters="item.filters" 
          :filter-method="item.filterTag" 
          :show-overflow-tooltip="item.tooltip">

          <template slot-scope="scope">
            <el-form-item 
              v-if="item.isEdit"
              :prop="`tableData[${scope.$index}][${item.prop}]`" 
              :rules="item.rules">

              <div class="cellText" v-if="editRowIndex !== scope.$index"> 
                {{ (item.dictShow && filterStatus1(item.options,
                scope.row[item.prop])) || scope.row[item.prop] }}
              </div>
              <div v-else style="display: flex">
                <span v-if="item.rules" style="color: red; padding: 0 3px;"> * </span>
                <el-select 
                  v-if="item.type === 'select'" 
                  aria-placeholder="请选择"
                  :size="item?.fieldProps?.size || 'mini'" 
                  v-model="scope.row[item.prop]"
                  @change="(val)=>handleSelect({index:scope.$index, val, row:scope.row})"
                  :disabled="item?.disabled || false">
                  <el-option 
                    v-for="option in item.options" 
                    :key="option.keyId" 
                    :label="option.keyName"
                    :value="option.keyId">
                  </el-option>
                </el-select>
                <el-input 
                  v-else-if="item.type == 'input'" 
                  v-model="scope.row[item.prop]"
                  :placeholder="item?.fieldProps?.placeholder || '请输入内容'" 
                  :size="item?.fieldProps?.size || 'mini'"
                  :disabled="item?.disabled" 
                  :clearable="item?.fieldProps?.clearable"
                  :maxlength="item?.fieldProps?.maxlength" 
                  :minlength="item?.fieldProps?.minlength"
                  @change="(val)=>handleChangeInput({index:scope.$index, val, row:scope.row})"
                  :show-word-limit="item?.fieldProps?.showWordLimit">
                </el-input>
              </div>
              
            </el-form-item>
            <div v-else-if="item.dictCode">
              {{ filterStatus(item.dict, scope.row[item.prop]) }}
            </div>
            <div v-else-if="item.format">
              {{ item.format(scope.row) }}
            </div>
            <div v-else-if="item.icon">
              <i :class="scope.row[item.prop]"></i>
            </div>
            <div v-else-if="item.btnShow" class="btnClass">
              <slot name="btnshow" :row="scope.row" :index="scope.$index"></slot>
            </div>
            <div v-else-if="item.tooltip">
              <div class="oneLine ">
                {{ scope.row[item.prop] }}
              </div>
            </div>
            <div v-else>
              {{ scope.row[item.prop] }}
            </div>
          </template>
        </el-table-column>

      </el-table>
    </el-form>
    <!-- <el-button v-if="isEdit && recordCreatorProps?.record" icon="el-icon-plus" type="text"
      @click="handleAddRow">添加</el-button> -->
    <el-pagination v-if="pagination" class="pagination tablePage" small :pager-count="pagerCount"
      :page-sizes="pageSizes" :total="total" :page-size="pageInfo.pageSize || 10"
      :current-page="pageInfo.pageCount || 1" layout="total,jumper,sizes,next,pager, prev" @size-change="sizeChange"
      @current-change="pageChange">
    </el-pagination>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    title: String,
    //添加一行
    recordCreatorProps: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: true
    },
    // editTabel 总数居
    formData: {
      type: Object,
      default: () => {}
    },
    border: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: String,
      default: ''
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    treeProps: {
      type: Array,
    },
    height: {
      type: [Number, String],
    },
    dict: {
      type: Array,
      default: () => []
    },
    tableColumn: {
      type: Array,
    },
    selection: {
      type: String,
      default: ''    //如果要显示传multiple
    },
    selectable: {
      type: Function
    },
    pagination: {
      type: Boolean,
      default: false
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    pageSizes: {
      type: Array,
      default: () => { [10, 20, 50, 100] }
    },
    total: {
      type: Number,
      default: 0
    },
    //是否显示序号
    serialShow: {
      type: Boolean,
      default: false
    },
    // 传递pageSize和pageCount
    pageInfo: {
      type: Object,
      default: () => ({})
    },
    loadingShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectionData: [],
      height1: null,

      editRowIndex: null
    }
  },
  mounted() {
    this.getHeight()
    window.addEventListener('resize', this.asd)
  },
  methods: {
    filterStatus(dict, value) {
      let list = dict
        .map((item) => {
          if (item.code === value) {
            return item.value;
          }
        })
        .filter((item) => {
          return item;
        });
      return list.join(",");
    },
    filterStatus1(dict, value) {
      let list = dict
        .map((item) => {
          if (item.keyId === value) {
            return item.keyName;
          }
        })
        .filter((item) => {
          return item;
        });
      return list.join(",");
    },
    // 修改select
    handleSelect({ index, val, row }) {
      if (row.id && !this.formData.tableData[index].isUpdate) {
        this.$set(this.formData.tableData, index, {
          ...this.formData.tableData[index],
          isUpdate: true,
        });
      }
    },
    // 修改input
    handleChangeInput({ index, val, row }) {
      console.log(this.formData.tableData[index]);
      if (row.id && !this.formData.tableData[index].isUpdate) {
        this.$set(this.formData.tableData, index, {
          ...this.formData.tableData[index],
          isUpdate: true,
        });
      }
    },
    //赋值rowIndex
    tableRowClassName({row, rowIndex}) {
      row.index = rowIndex;
    },
    //点击row
    handleClickRow(row) {
      console.log(row)
      if (Number(row.cChecked) === 1) {
        this.editRowIndex = null
        return;
      }
      if (this.isEdit) {
        this.editRowIndex = row.index;
      }
    },
    //添加一行
    handleAddRow(row) {
      const { record, position = 'bottom' } = this.recordCreatorProps
      const newObj = { ...row }
      if (position === 'bottom') {
        this.formData.tableData.push(newObj)
        this.editRowIndex = this.formData.tableData.length - 1;
      } else {
        this.formData.tableData.unshift(newObj);
        this.editRowIndex = 0;
      }
    },
    //删除一行
    handleDelete(row, index) {
      if (row.isAdd) {
        let editIndex = Number(this.editRowIndex);
        this.editRowIndex =
          index === editIndex
            ? null
            : index > editIndex
              ? editIndex
              : editIndex - 1;
        this.formData.tableData.splice(index, 1);
        this.$message({
          showClose: true,
          message: "删除成功~",
          type: "success",
        });
      } else {
        const params = [{ id: row.id }];
        console.log(params)
        this.formData.tableData = this.formData.tableData.filter(
          (item) => item.id !== row.id
        );
        this.$message({
          showClose: true,
          message: "删除成功~",
          type: "success",
        });
      }
    },
    // 双击事件
    handledbClickRow(row) {
      this.$emit('handledbClickRow', row)
    },
    asd() {
      this.getHeight()
    },
    getHeight() {
        this.$nextTick(()=>{
        let dom = document.querySelector('.basetable').parentNode.children
        let list = Array.from(dom).filter(item => {
          return item.className !== 'basetable'
        }).reduce((p, item) => {
          return p + item.clientHeight
        }, 0)
        this.height1 = document.body.clientHeight - list - 56 - 32 - 32 - 10 - 16 - 46 - 32 - 16 - document.querySelector('.btn').clientHeight
        })
    },
    sortChange(data) {
      this.$emit('sortChange', data)
    },
    selectionChange(data) {
      this.selectionData = data
      this.$emit('selectionChange', data)
    },
    rowSelect(data) {
      this.$emit('rowSelect', data)
    },
    selectAll(data) {
      this.$emit('selectAll', data)
    },
    sizeChange(data) {
      this.$emit('sizeChange', data)
    },
    pageChange(data) {
      this.$emit('pageChange', data)
    },
    filterTag(value, row) {
      return value === row.prop;
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.asd)
  }
}
</script>

<style scoped lang="less">
// ::v-deep .el-table--mini .el-table__cell {
//   padding: 2.5px 0;
// }

.el-form-item {
  margin-bottom: 0;
}
.basetable {
  background-color: #FFF;
  ::v-deep .el-form-item__content {
    line-height: 28px;
  }

  // 批量操作的样式
  .slotMultiple {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;

    ::v-deep .el-button {
      margin-left: 8px;
    }

    ::v-deep .el-button--primary,
    .el-button--default {
      padding: 8px 15px !important;
      border-radius: 2px !important;
    }

    .el-button--primary {
      background-color: #3371ff;
    }

    ::v-deep .el-dropdown {
      .el-button--primary {
        background-color: #3371ff;
      }

      .el-button--default {
        padding: 8px 15px !important;
        border-radius: 1px !important;

        &:hover {
          border-color: #dcdfe6;
        }
      }
    }
  }

  .el-table {
    border: 1px solid rgba(219, 221, 225, 1);

    // ::v-deep .has-gutter {
    //   .cell {
    //     padding: 0 4px !important;
    //   }

    ::v-deep .el-table__cell {
      border-bottom: 1px solid rgba(219, 221, 225, 1);
      border-right: 1px solid rgba(219, 221, 225, 1);
      font-size: 14px;

      .cell {
        padding: 0 4px !important;
      }
    }

    ::v-deep .btnClass {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .el-button--text,
      .el-dropdown-selfdefine {
        color: #3371ff;
        font-size: 14px;

        .el-icon--right {
          margin-left: 0px !important;
        }
      }

      .el-button--text {
        padding: 0 !important;
        margin-top: 3px;
        margin-right: 16px;
        margin-left: 0px !important;
      }
    }
  }

  // 表头的设置
  ::v-deep .tableHeader {
    background-color: #f5f8ff;
    font-size: 14px;
    color: #0f1b33;
    letter-spacing: 0;
    font-weight: 500;
  }

  //分页的样式
  ::v-deep .el-pagination {
    margin-top: 10px;

    .el-pagination__jump {
      float: right;
      margin-left: 10px !important;

      .el-pagination__editor {
        width: 56px;

        .el-input__inner {
          height: 32px;
        }
      }
    }

    .btn-prev {
      margin-right: 4px;
    }

    .btn-prev,
    .btn-next {
      float: right;
      height: 32px;
      width: 32px;
      border: 1px solid #ccc;
      text-align: center;

      .el-icon {
        margin-bottom: -4px;
        font-size: 14px;
        margin-left: 4px;
      }
    }

    .btn-next {
      .el-icon {
        margin-bottom: -4px;
        margin-left: -3px;
      }
    }

    .el-pager {
      float: right;

      .active {
        color: #fff;
        cursor: default;
        background-color: #2f6aff;
      }

      .number,
      .btn-quicknext {
        border: 1px solid #ccc;
        margin-right: 4px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        font-weight: 400;
      }
    }

    .el-pagination__sizes {
      float: right;

      .el-input__inner {
        height: 32px;
        margin-left: 11px !important;
      }
    }
  }
}
.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
