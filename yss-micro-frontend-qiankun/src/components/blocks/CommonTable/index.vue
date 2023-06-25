<template>
  <div class="common-block">
    <!-- 工具栏 -暂未开发-->
    <div class="toolbar-block">
      <common-toolbar :toolbal="toolbal"></common-toolbar>
    </div>
    <!-- 搜索区域 -->
    <div class="search-block">
      <!-- <slot name="search"></slot> -->
      <common-search-form
        :form-config="searchItems"
        :formDataInit="searchInitValue"
        ref="queryForm"
      ></common-search-form>
    </div>
    <!-- 表格主体-暂未开发 -->
    <div class="table-block">
      <common-table-content
        :actionBar="actionBar"
        :columns="columns"
        :dataSource="dataSource"
        :pageInfo="pageInfo"
        :handleUtils="handleUtils"
        :rowKey="rowKey"
        :tableLoading="tableLoading"
      ></common-table-content>
    </div>
  </div>
</template>
<script>
  import CommonToolbar from './components/CommonToolbar';
  import CommonSearchForm from './components/CommonSearchForm';
  import CommonTableContent from './components/CommonTableContent';
  export default {
    name: 'CommonTable',
    components: {
      'common-toolbar': CommonToolbar,
      'common-search-form': CommonSearchForm,
      'common-table-content': CommonTableContent,
    },
    // 接收的参数
    props: {
      // 行操作配置项
      actionBar: {
        type: Object,
      },
      // 工具栏配置项
      toolbal: {
        type: Object,
      },
      // 搜索区域配置项
      searchItems: {
        type: Object,
      },
      // 搜索区域默认初始值
      searchInitValue: {
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
      // 分页信息
      pageInfo: {
        type: Object,
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
    methods: {
      // 获取查询的参数
      getQueryParams() {
        return this.$refs.queryForm.getValue();
      },
    },
  };
</script>
<style lang="scss" scoped>
  .common-block {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
    overflow: hidden;

    // 表格主体
    .table-block {
      flex: auto;
      height: 1px;
    }
  }
</style>
