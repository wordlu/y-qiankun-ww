<template>
  <section class="main-container">
    <!-- 只显示主体部分 -->
    <!-- <section v-if="mainBodyShow" class="route-section">
      <router-view></router-view>
    </section> -->
    <!-- 头部、侧边栏、主体 -->
    <!-- <section v-else-if="!mainBodyShow" class="body-section">
      <Header :onLogout="onLogout" />
      <el-row class="app-ontainer">
        <el-col class="left-meun" :xs="4" :sm="4" :md="4" :lg="4" :xl="3">
          <Aside :asideData="asideData" />
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="21" class="content">
          <router-view></router-view>
        </el-col>
      </el-row>
    </section> -->
    <section class="route-section content">
      <!-- <button @click="aaa">111111</button>
      <button @click="bbb">222222</button> -->
      <!-- <keep-alive :include="keepalive"> -->
        <base-keep-alive :include="keepalive">
          <router-view  :key="$route.fullPath"></router-view>
        </base-keep-alive>
      <!-- </keep-alive> -->
    </section>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import Header from "@/components/Header/index.vue";
import Aside from "@/components/Aside/index.vue";
import { mapState } from 'pinia'
import keepalive from '@/store/keepalive';

export default Vue.extend({
  components: { Aside, Header },
  data() {
    return {
      asideData: []
    };
  },
  methods: {
    aaa(){
      console.error(this.keepalive)
    },
    bbb(){
      this.keepalive.splice(0,1)
      console.error(this.keepalive)
    },
    getAsideData() {
      const allRouter = this.$router.options.routes;
      this.asideData = allRouter?.filter(o => !o.meta?.hidden)?.map((item) => {
        const {
          name,
          meta: { title },
          path,
          children
        } = item;

        children?.forEach((citem => {
          citem.path = path + '/' + citem.path
        }))
        return { ...item, key: title + name, title };
      });
    },
  },
  created() {
    this.getAsideData();
  },
  computed: {
    ...mapState(keepalive,['keepalive']),
    mainBodyShow() {
      return this.$route.meta.mainBodyShow || false;
    },
  }
});
</script>
<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body-section {
  height: 100%;
}

.main-container {
  // padding: 10px 24px;
  height: 100%;
  background: #F5F8FF;

  .app-ontainer {
    flex: 1;
    display: flex;
  }

  .container {
    background: #ffffff;
    color: #2f6aff;
    box-shadow: 0px 1px 0px 0px rgb(53 64 82 / 10%);
  }

  .left-meun {
    background: #ffffff;
    box-shadow: 2px 0px 8px 0px rgb(63 73 92 / 10%);
    height: calc(100vh - 60px);
    width: 256px;
    // min-width: 256px;
    overflow: auto;
  }

  .content {
    // padding: 24px;
    box-sizing: border-box;
    // height: calc(100vh - 60px);
  }
}
</style>
