<!-- 面包屑组件 -->
<template>
  <div>
    <yss-breadcrumb separator="/">
      <yss-breadcrumb-item v-for="(item, index) in routeArr" :key="index">{{
        item
      }}</yss-breadcrumb-item>
    </yss-breadcrumb>
  </div>
</template>

<script>
  import { treeFindPath, getObjByRoute } from '../../../tools/util/index';
  export default {
    name: 'BreadCrumb',
    data() {
      return {
        routeArr: [],
      };
    },

    //初始化也执行一次
    created: function () {
      this.changeroute();
    },

    methods: {
      //获取面包屑导航数组
      changeroute: function () {
        let menuArr = JSON.parse(localStorage.getItem('auth_routes') ?? []);
        let matchRouteName;
        let { path, params } = this.$route;
        if (path.split('/').includes('home')) return;
        if (!params.id) {
          let matchObj = getObjByRoute(menuArr, path);
          matchRouteName = matchObj.id;
        }
        this.routeArr = treeFindPath(
          menuArr,
          (data) => data.id === (params.id ?? matchRouteName),
          [],
          'name',
        );
      },
    },

    watch: {
      // 监听路由变化
      $route(to, from) {
        this.changeroute();
      },
    },
  };
</script>
