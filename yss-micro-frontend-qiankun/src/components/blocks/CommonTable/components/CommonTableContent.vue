<template>
  <div class="table-module">
    <yss-table
      ref="tableBox"
      v-bind="$attrs"
      v-on="$listeners"
      :data="dataSource"
      height="100%"
      v-loading="tableLoading"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @current-change="handleSelectionChange"
    >
      <yss-table-column v-if="multiple" type="selection" width="55"> </yss-table-column>
      <yss-table-column
        v-for="item in columns"
        :key="item.dataIndex"
        :prop="item.dataIndex"
        :label="item.title"
        :align="item.align"
        :fixed="item.fixed"
        :width="item.width"
        :type="item.type"
      >
      </yss-table-column>
      <yss-table-column fixed="right" align="center" label="操作" width="100">
        <template slot-scope="scope">
          <common-toolbar :toolbal="actionBar" :currentRow="scope.row"></common-toolbar>
        </template>
      </yss-table-column>
    </yss-table>
    <yss-pagination
      v-if="pageInfo"
      class="pagination-module"
      v-bind="$attrs"
      v-on="$listeners"
      :page-sizes="[10, 20, 50, 100, 200, 500, 1000, 2000]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.currentPage"
      :total="pageInfo.totalCount"
    >
    </yss-pagination>
  </div>
</template>
<script>
  import CommonToolbar from './CommonToolbar';
  export default {
    name: 'CommonTableContent',
    components: {
      'common-toolbar': CommonToolbar,
    },
    props: {
      multiple: {
        type: Boolean,
        default: true,
      },
      // 行操作配置项
      actionBar: {
        type: Object,
      },
      // 分页信息
      pageInfo: {
        type: Object,
      },
      columns: {
        type: Array,
        default: () => [],
      },
      dataSource: {
        type: Array,
        default: () => [],
      },
      // 表格数据主键
      rowKey: {
        type: String,
        default: 'id',
      },
      // 表格加载状态
      tableLoading: {
        type: Boolean,
        default: false,
      },

      // 方法集合-增删改查、审核等
      handleUtils: {
        type: Object,
      },
    },
    watch: {
      pageInfo(newValue, oldValue) {
        // 分页信息的页数或每页展示条数变化时需要触发查询
        if (
          newValue?.pageSize !== oldValue?.pageSize ||
          newValue?.currentPage !== oldValue?.currentPage
        ) {
          this.handleUtils.query();
        }
      },
    },
    methods: {
      // 页数切换时
      handleCurrentChange(val) {
        // 更新分页数据
        this.handleUtils.setData({
          pageInfo: {
            ...(this.handleUtils.getData()?.pageInfo || {}),
            currentPage: val,
          },
        });
      },
      handleSizeChange(val) {
        // 更新分页信息数据
        this.handleUtils.setData({
          pageInfo: {
            ...(this.handleUtils.getData()?.pageInfo || {}),
            pageSize: val,
          },
        });
      },

      // 表格选中时-区分单选或多选
      handleSelectionChange(val) {
        let values;
        if (val instanceof Array) {
          // 多选
          values = val.map((itme) => {
            return itme[this.rowKey];
          });
        } else if (val && !this.multiple) {
          // 单选
          values = [val?.[this.rowKey]];
        }

        if (values) {
          this.handleUtils.setData({
            selectedRowKeys: values,
          });
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .table-module {
    display: flex;
    flex-flow: column;
    height: 100%;
  }
</style>
