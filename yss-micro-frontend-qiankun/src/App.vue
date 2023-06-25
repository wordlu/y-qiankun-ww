<template>
  <div id="yssMainApp" class="yss-main-app">
    <router-view />
  </div>
</template>

<script lang="ts">
  // 执行微应用文件
  // import './microAppSetting';

  export default {
    name: 'YssMainApp',
  };
</script>
<style lang="scss">
  @import '~@/styles/index';

  .yss-main-app {
    width: 100%;
    height: 100%;
    background: #f5f8ff;
  }
</style>
