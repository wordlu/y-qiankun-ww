<template>
  <div class="editTable">
    <div class="tableTitle">
      <span>{{ title }}</span>
      <span class="addText" v-if="isEdit && recordCreatorProps?.record" @click="handleAddRow"><i></i> 添加</span>
    </div>

    <el-form :model="formData" ref="formTable">

      <el-table size="mini" class="table" @row-click="handleClickRow" @row-dblclick="handledbClickRow"
        :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" :data="formData.tableData">

        <el-table-column v-if="multipleSelection" type="selection" width="55"></el-table-column>

        <el-table-column v-for="(item, index) in tableColumnList" :key="index" :prop="item.prop" :label="item.label"
          :width="item.width" :show-overflow-tooltip="item.tooltip || true">

          <template slot-scope="scope">
            <el-form-item :prop="`tableData[${scope.$index}][${item.prop}]`" :rules="item.rules">

              <div class="cellText" v-if="editRowIndex !== scope.$index"> {{ scope.row[item.prop] }}</div>

              <el-select v-else-if="item.type === 'select'" aria-placeholder="请选择"
                :size="item?.fieldProps?.size || 'mini'" v-model="scope.row[item.prop]"
                :disabled="item?.disabled || false">
                <el-option v-for="option in item.options" :key="option.value" :label="option.label"
                  :value="option.value"></el-option>
              </el-select>
              <el-input v-else-if="item.type == 'input'" v-model="scope.row[item.prop]"
                :placeholder="item?.fieldProps?.placeholder || '请输入内容'" :size="item?.fieldProps?.size || 'mini'"
                :disabled="item?.disabled" :clearable="item?.fieldProps?.clearable"
                :maxlength="item?.fieldProps?.maxlength" :minlength="item?.fieldProps?.minlength"
                :show-word-limit="item?.fieldProps?.showWordLimit"></el-input>

            </el-form-item>
          </template>

        </el-table-column>

        <el-table-column label="操作" align="center" header-align="left" fixed="right" v-if="isEdit || showOption">
          <template slot-scope="scope">
            <slot name="operate" :row="scope.row" :editRowIndex="editRowIndex"></slot>
          </template>
        </el-table-column>
      </el-table>
    </el-form>

  </div>
</template>
<script lang="ts">

type RecordCreatorProps = {
  /**
   * 添加一行的默认数据
   */
  record: any,
  /**
  * 添在表格 首部 或 尾部 添加
  */
  position: 'top' | 'bottom'
}

export default {
  props: {
    title: String,
    isEdit: {
      type: Boolean,
      default: true
    },
    tableColumnList: Array as () => any[],
    // editTabel 总数居
    formData: {
      type: Object,
      default: () => ({ tableData: Array as () => any[] })
    },
    //添加一行
    recordCreatorProps: {
      type: Object as () => RecordCreatorProps,
      default: () => ({ record: {}, position: 'top' })
    },
    //多选
    multipleSelection: {
      type: Array as () => String[],
    },
    showOption: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      editRowIndex: null
    }
  },
  methods: {
    //添加一行
    handleAddRow() {
      const { record, position } = this.recordCreatorProps
      const newObj = { ...record }
      if (position === 'bottom') {
        this.formData.tableData.push(newObj)
        this.editRowIndex = this.formData.tableData.length - 1;
      } else {
        this.formData.tableData.unshift(newObj);
        this.editRowIndex = 0;
      }
    },
    //删除一行
    handleDelete(index: number) {
      let editIndex = Number(this.editRowIndex);
      this.editRowIndex =
        index === editIndex
          ? null
          : index > editIndex
            ? editIndex
            : editIndex - 1;
      this.formData.tableData.splice(index, 1);
    },
    // 双击事件
    handledbClickRow(row: { index: number }) {
      this.$emit('handledbClickRow', row)
    },
    //点击row
    handleClickRow(row: { index: number }) {
      if (this.isEdit) {
        this.editRowIndex = row.index;
      }
    },
    //赋值rowIndex
    tableRowClassName({ row, rowIndex }: any) {
      row.index = rowIndex;
    },
    //多选
    handleSelectionChange(selection: any[]) {
      this.handleSelectionChange?.(selection)
    },
  }
}
</script>

<style lang="less">
.cell {
  padding-left: 7px;
}

th.el-table__cell {
  border-color: #dbdde1;
  color: #0f1b33;

  // &:nth-last-child(2) {
  //   border-left: 1px solid #dbdde1;
  // }
}

.el-table th.el-table__cell>.cell {
  padding-left: 16px;
}

.el-table th.el-table-column--selection>.cell {
  padding-left: 14px;
}

td.el-table__cell {
  border-color: #dbdde1;

  // &:last-child {
  //   border-left: 1px solid #dbdde1;
  // }
}

.el-input--mini .el-input__inner {
  height: 32px;
  line-height: 32px;
  border-radius: 2px;
  padding-left: 7px;
}

.el-date-editor .el-input__inner {
  width: 100%;
}

.el-icon-delete {
  padding: 10px;
}
</style>

<style scoped lang="less">
.table {
  width: 100%;
  border: 1px solid #dbdde1;
  border-bottom: none;

  // :is(.cell) {
  //   padding-left: 7px;
  // }

  // :is(.el-table__header th.el-table__cell) {
  //   border-color: #dbdde1;
  //   color: #0f1b33;

  //   ::v-deep.cell {
  //     padding-left: 16px;
  //   }

  //   &:nth-last-child(2) {
  //     border-left: 1px solid #dbdde1;
  //   }
  // }

  // :is(.el-table__row td.el-table__cell) {
  //   border-color: #dbdde1;

  //   &:last-child {
  //     border-left: 1px solid #dbdde1;
  //   }
  // }


  // :is(.el-input__inner) {
  //   height: 32px;
  //   line-height: 32px;
  //   border-radius: 2px;
  //   padding-left: 7px;
  // }

  // :is(.el-icon-delete) {
  //   padding: 10px;
  // }

  .el-form-item {
    margin-bottom: 0;
  }

  .cellText {
    width: 100%;
    height: 40px;
    padding-left: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.tableTitle {
  display: flex;
  margin-bottom: 16px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #0f1b33;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: 500;

  >span {
    margin-right: 11px;
  }

  .addText {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #3371FF;
    letter-spacing: 0;
    font-weight: 400;
    cursor: pointer;

    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      color: #3371FF;
      background: url('@/assets/image/add.png') no-repeat;
      background-size: 100% 100%;
      margin-right: 7px;
    }
  }
}
</style>
