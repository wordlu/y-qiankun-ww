<template>
  <!-- 工具栏。。。暂未开发 -->
  <div class="common-toolbar">
    <yss-row>
      <yss-button
        v-for="(item, key) in toolbal"
        :key="key"
        size="mini"
        :type="item.type"
        :disabled="item.disabled"
        @click="(e) => issueEvent(item.method)"
        >{{ item.text }}</yss-button
      >
    </yss-row>
  </div>
</template>
<script>
  export default {
    name: 'CommonToolbar',
    props: {
      // 工具栏可操作的行数据
      currentRow: {
        type: Object,
      },
      // 工具栏配置项
      toolbal: {
        type: Object,
      },
    },
    methods: {
      issueEvent(mouseEvent) {
        if (mouseEvent) {
          return mouseEvent(this.currentRow ? { currentRow: this.currentRow } : {});
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .common-toolbar {
    padding: 12px;
    text-align: right;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
