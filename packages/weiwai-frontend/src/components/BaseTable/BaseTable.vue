<template>
  <div class="basetable">
    <div style="padding: 16px;">
      <div :class="showSlotClass ? 'slotMultiple' : ''">
        <div style="display: flex" class="btn">
          <slot name="multiple-operation" :selectionData="selectionData"></slot>
        </div>
      </div>
      <el-table :data="tableData" ref="baseTable" :selection="selection" :border="border" :row-key="rowKey" v-loading="loadingShow"
        :default-expand-all="defaultExpandAll" size="mini" :height="heightShow ? null : height || height1"
        :tree-props="treeProps" :highlight-current-row="highlightCurrentRow" @sort-change="sortChange"
        @selection-change="selectionChange" @select="rowSelect" @select-all="selectAll" @row-dblclick="handledbClickRow"
        @cell-click="handleCurrentChange" :row-class-name="tableRowClassName" header-cell-class-name="tableHeader" @header-dragend="dragend">
        <el-table-column v-if="selection === 'multiple'" fixed type="selection" align="center" width="50"
          :reserve-selection="rowKey ? true : false" :selectable="selectable" />
        <el-table-column v-if="serialShow" type="index" fixed label="序号" width="50" align="center" />
        <el-table-column v-for="item in tableColumn" :type="item.type" :key="item.prop" :prop="item.prop"
          :label="item.label" :align="item.align" :width="item.label === '操作' ? '130' : item.width" :fixed="item.fixed"
          :sortable="item.sortable" :column-key="item.prop" :filters="item.filters" :filter-method="item.filterTag"
          :show-overflow-tooltip="true" max-width="200">
          <template slot-scope="scope">
            <div v-if="item.dictCode" :style="colorFunction(scope.row[item.prop])">
              {{ filterStatus(item.dict, scope.row[item.prop]) }}
            </div>
            <div v-else-if="item.format">
              {{ item.format(scope.row) }}
            </div>
            <div v-else-if="item.icon">
              <i :class="scope.row[item.prop]"></i>
            </div>
            <div v-else-if="item.btnShow" class="btnClass">
              <slot name="btnshow" :row="scope.row"></slot>
            </div>
            <div v-else-if="item.statusShow" class="btnClass">
              <slot name="statusShow" :row="scope.row"></slot>
            </div>
            <div v-else-if="item.statusShow1" :style="filterStatusColor(scope.row[item.prop])">
              {{ filterStatus(item.dict, scope.row[item.prop]) }}
            </div>
            <div v-else-if="item.stateId">
              <slot name="stateId" :row="scope.row"></slot>
            </div>
            <div v-else-if="item.fileName">
              <slot name="fileName" :row="scope.row"></slot>
            </div>
            <!-- <div v-else-if="item.tooltip">
              <div class="oneLine ">
                {{ scope.row[item.prop] }}
              </div>
            </div> -->
            <div v-else-if="item.multiLine">
              <div class="multiLine">
                  {{ scope.row[item.prop] }}
                </div>
            </div>
              <div v-else>
                <div class="oneLine ">
                  {{ scope.row[item.prop] }}
              </div>
            </div>
          </template>
        </el-table-column>

      </el-table>
      <el-pagination v-if="pagination" class="pagination tablePage" small :pager-count="pagerCount"
        :page-sizes="pageSizes" :total="total" :page-size="pageInfo.pageSize || 10"
        :current-page="pageInfo.startPage || 1" :layout="layout" @size-change="sizeChange"
        @current-change="pageChange"></el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    colorFunction:{
      type:Function,
      default:(value)=>{
        return {'color': `${value===1 ? '#6FD13F' : '#FF4B33'}`}
      }
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: []
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
    showSlotClass: {
      type: Boolean,
      default: true
    },
    //表格数据是否超过8条特殊处理
    dataIsGreaterEight: {
      type: Boolean,
      default: true
    },
    // 分页显示哪些控件
    layout: {
      type: String,
      default: 'total,jumper,sizes,next,pager, prev'
    },
    heightShow: {
      type: Boolean,
      default: false
    },
    loadingShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectionData: [],
      height1: null
    }
  },
  mounted() {
    this.getHeight()
    window.addEventListener('resize', this.asd)
  },
  watch: {
    //固定列某些情况下会导致表格错位
    'tableData'() {
      this.$nextTick(() => {
        this.$refs.baseTable.doLayout()
      })
    },
    'tableColumn'() {
      this.$nextTick(() => {
        this.$refs.baseTable.doLayout()
      })
    },
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
      return "";
    },
    // 双击行
    handledbClickRow(row) {
      this.$emit('handledbClickRow', row)
    },
    // 单击行
    handleCurrentChange(row, cloumn, cell) {
      this.$emit('handleCurrentRowChange', row, cloumn, cell)
    },
    asd() {
      this.getHeight()
      this.dragend()
    },
    getHeight() {
      if (!this.dataIsGreaterEight && this.tableData.length >= 8) {
        this.$nextTick(() => {
          this.height1 = 325
        })
      } else if (!this.dataIsGreaterEight && this.tableData.length < 8) {
        this.height1 = null
      } else {
        this.$nextTick(() => {
          let dom = document.querySelector('.basetable').parentNode.children
          let list = Array.from(dom).filter(item => {
            return item.className !== 'basetable'
          }).reduce((p, item) => {
            return p + item.clientHeight
          }, 0)
          //顶部导航栏高度  body的内边距  页签的高度  页签的外边距  form表单的外边距  分页和分页的外边距  表格的内边距  按钮的下边距
          this.height1 = document.body.clientHeight - list - 56 - 32 - 40 - 10 - 16 - 32 - 16 - document.querySelector('.btn').clientHeight
          if (this.pagination) {
            this.height1 = this.height1 - 46
          }
        })
      }

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

    filterStatusColor(value) {
      if (value == '0') {
        return { "width": "54px", "height": "24px", "border-radius": "12px", "background": "#6F7685", "color": "#FFFFFF", "padding-left": "5px", "cursor": "pointer" }
      } else if (value == '1') {
        return { "width": "54px", "height": "24px", "border-radius": "12px", "background": "#3371FF", "color": "#FFFFFF", "padding-left": "5px", "cursor": "pointer" }
      } else if (value == '2') {
        return { "width": "54px", "height": "24px", "border-radius": "12px", "background": "#FF4B33", "color": "#FFFFFF", "padding-left": "12px", "cursor": "pointer" }
      } else if (value == '3') {
        return { "width": "54px", "height": "24px", "border-radius": "12px", "background": "#6FD13F", "color": "#FFFFFF", "padding-left": "5px", "cursor": "pointer" }
      }
    },
    filterTag(value, row) {
      return value === row.prop;
    },
    dragend(){
      this.$refs.baseTable.doLayout()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.asd)
  },
  activated(){
      this.dragend()
  },
  
}
</script>

<style scoped lang="less">
// ::v-deep .el-table--mini .el-table__cell {
//   padding: 2.5px 0;
// }
.basetable {
  background-color: #FFF;

  // 批量操作的样式
  .slotMultiple {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;

    ::v-deep .el-button {
      margin-left: 8px;
    }

    .el-button--default {
      padding: 8px 15px !important;
      border-radius: 2px !important;

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

    .el-button--primary {
      padding: 8px 15px !important;
      border-radius: 2px !important;
      background-color: #3371ff;
      border-color: #3371ff;

      &:hover {
        border-color: #3371ff;
      }
    }

    ::v-deep .el-dropdown {
      .el-button--primary {
        background-color: #3371ff;
      }

      .el-button--default {
        padding: 8px 15px !important;
        border-radius: 1px !important;

        &:hover {
        border-color: #EAF0FF;
        background-color: #EAF0FF;
        color: #2F6AFF;
        }
      }
    }
  }

  .el-table {
    border: 1px solid rgba(219, 221, 225, 1);

    ::v-deep .el-table__header th {
      .cell {
        padding: 0 8px !important;

        .caret-wrapper {
          height: 19px !important;

          .ascending {
            top: -2px !important;
          }

          .descending {
            bottom: -1px !important;
          }
        }
      }
    }


    ::v-deep .el-table__body td {
      // background-color: red;
      border-bottom: 1px solid rgba(219, 221, 225, 1);
      border-right: 1px solid rgba(219, 221, 225, 1);
      font-size: 14px;

      .cell {
        // padding: 0 8px !important;
        padding: 0 8px 0 8px !important;

      }

      .el-table__cell {
        border-bottom: 1px solid rgba(219, 221, 225, 1);
        border-right: 1px solid rgba(219, 221, 225, 1);
        font-size: 14px;


        .cell {
          padding: 0 16px 0 8px !important;
        }
      }
    }

    ::v-deep .btnClass {
      width: 100%;
      // display: flex;
      // align-items: center;
      // flex-wrap: wrap;
      // justify-content: space-between;
      margin-right: -11px;

      .dropdown {
        display: inline-block;
      }

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
        margin-left: 0px !important;
        margin-top: 0 !important;

        span {
          display: inline-block !important;
          text-align: left !important;
          width: 50px !important;
        }
      }

      .el-button.is-disabled {
        color: #C0C4CC;
        cursor: not-allowed;
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
    padding: 2px 0 2px 5px !important;
    .el-pagination__jump {
      float: right;
      margin-left: 10px !important;

      .el-pagination__editor {
        width: 56px;

        .el-input__inner {
          height: 32px;

          &:focus {
            border: 1px solid #2f6aff;
          }
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

      &:hover {
        color: #2f6aff;
      }

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

      .number {
        &:hover {
          color: #2f6aff;
        }
      }

      .active {
        color: #fff;
        cursor: default;
        background-color: #2f6aff;
        border: none !important;

        &:hover {
          color: #fff;

        }
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

      .btn-quicknext {
        &:hover {
          color: #2f6aff;
        }
      }
    }

    .el-pagination__sizes {
      float: right;

      .el-input__inner {
        height: 32px;
        margin-left: 11px !important;

        &:hover {
          border: 1px solid #2f6aff;
        }
      }
    }
  }
}

.oneLine {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.multiLine{
   white-space: normal;
}
// ::v-deep .el-table tbody tr:hover>td { background-color: red }
</style>
