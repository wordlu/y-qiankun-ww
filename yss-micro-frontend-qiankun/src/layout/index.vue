<template>
  <div class="app-wrapper">
    <yss-header :height="headerHeight">
       <!-- <div class="left-nav"><yss-link href="/"><img src="../assets/logo.svg" /></yss-link></div> -->
       <img src="../assets/logo.svg" />
      <div class="right-nav">
        <yss-dropdown @command="logoutFn">
          <span class="yss-dropdown-link"
            >{{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <yss-dropdown-menu slot="dropdown">
            <yss-dropdown-item>退出登录</yss-dropdown-item>
          </yss-dropdown-menu>
        </yss-dropdown>
      </div>
    </yss-header>
    <yss-container>
      <yss-aside :width="asideWidth" class="sidebar-container"
        ><sidebar @changeWidth="changeSideWidth"
      /></yss-aside>
      <yss-main>
        <div class="main-body">
          <TabBar></TabBar>
          <!-- <bread-crumb /> -->
          <!-- 主应用页面 -->
          <div v-show="!isMicroApp">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </div>
          <!-- 子应用页面 -->
          <div v-show="isMicroApp">
            <div
              :id="item.container.substring(1)"
              v-for="item in microAppList"
              :key="item.container.substring(1)"
              v-show="$route.path.startsWith(item.activeRule)"
            ></div>
          </div>
        </div>
      </yss-main>
    </yss-container>
  </div>
</template>
<script lang="ts">
  import { Sidebar, TabBar } from './components';
  import { mapState, mapMutations } from 'vuex';
  import { createMicroApp, microAppList, isMicroApp } from '@/config/microAppConfig';
  export default {
    name: 'LayoutBlock',
    components: {
      Sidebar,
      TabBar,
    },
    data() {
      return {
        headerHeight: '56px',
        asideWidth: '256px',
        microAppContainerId: 'microAppContainer',
        username: JSON.parse(localStorage.getItem('user_info')).username,
        microAppList,
      };
    },
    created() {
      createMicroApp(this.$route.path);
    },
    computed: {
      ...mapState('loginModule', ['user_info']),
    },
    methods: {
      ...mapMutations('loginModule', ['logout']),
      changeSideWidth: function (_width) {
        this.asideWidth = _width;
      },
      logoutFn: function () {
        this.logout();
        // this.$router.push('/login');
        window.location.href='/login'
      },
      isMicroApp() {
        return isMicroApp(this.$route.path);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .app-wrapper {
    width: 100%;
    height: 100%;

    .el-header {
      position: relative;
      z-index: 1001;
      display: flex;
      align-items: center;
      width: 100%;
      background: #fff;
      box-shadow: 0 1px 0 0 rgb(53 64 82 / 10%);

      .left-nav {
        display: flex;
        flex: 1;
        align-items: center;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .right-nav {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
      }
    }

    .el-container {
      width: 100%;
      height: calc(100% - 56px);
    }

    .el-aside {
      width: 100%;
      height: 100%;
      overflow: visible;
      background: #fff;
      border-top: 1px solid rgb(53 64 82 / 10%);
      transition: 0.3s width ease-in-out;
    }

    .el-main {
      height: 100%;
      padding: 0;

      .main-body {
        width: 100%;
        height: 100%;
        padding: 8px 24px 24px 24px;
      }
    }
  }
</style>
