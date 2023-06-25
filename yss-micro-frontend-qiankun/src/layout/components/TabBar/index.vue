<template>
  <div class="tab-bar">
    <div class="tabs-contain">
      <yss-tabs
        ref="tabs"
        v-model="activeTab"
        type="card"
        height="32px"
        @tab-click="tabClick"
        @tab-remove="closeTab"
      >
        <yss-tab-pane
          :key="item.path"
          v-for="item in tabs"
          :name="item.path"
          :closable="item.closeAble"
        >
          <template slot="label">
            {{ item.title }}
            <span v-if="item.active">
              <!-- <i class="el-icon-refresh-right" @click="refreshPage" />
              <i class="el-icon-full-screen" @click="fullScreen" /> -->
            </span>
          </template>
        </yss-tab-pane>
      </yss-tabs>
    </div>
    <!-- 操作按钮 -->
    <div class="menu-button" @click="menuButonClick()">
      <i class="el-icon-arrow-down" />
    </div>
    <!-- 操作菜单 -->
    <ul class="menu" v-show="menuShow">
      <li class="menu-item" v-for="item in menu" :key="item.code" @click="clickMenuItem(item.code)">
        <i :class="item.icon" />
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script>
  import store from '@/store';
  import { createMicroApp, closeMicroApp, closeMultipleMicroApp } from '@/config/microAppConfig';
  export default {
    name: 'TabBar',
    components: {
      // TabMenu
    },
    data() {
      return {
        microApp: null,
        tabs: [],
        menu: [
          { title: '关闭左侧', code: 'menuCloseLeft', icon: 'el-icon-back' },
          { title: '关闭右侧', code: 'menuCloseRight', icon: 'el-icon-right' },
          { title: '关闭其他', code: 'menuCloseOther', icon: 'el-icon-close' },
          { title: '关闭全部', code: 'menuCloseAll', icon: 'el-icon-circle-close' },
        ],
        menuShow: false,
        activeTab: '',
      };
    },
    computed: {},
    methods: {
      treeDataFindPath(tree, func) {
        if (!tree) return;
        for (const data of tree) {
          const { children } = data;
          const flag = func(data);
          if (flag) {
            return data;
          }
          if (children) {
            const findChildren = this.treeDataFindPath(children, func);
            if (findChildren) return findChildren;
          }
        }
      },
      tabClick(el) {
        let indexFlag;
        this.tabs.forEach((item, index) => {
          if (item.path === el.name) {
            item.active = true;
            indexFlag = index;
          } else {
            item.active = false;
          }
        });
        this.setStoreTabs();
        this.goToPage(indexFlag);
      },
      closeTab(el) {
        let indexFlag;
        let currentTab;
        this.tabs.forEach((item, index) => {
          if (item.path == el) {
            currentTab = item;
            this.tabs.splice(index, 1);
            // 处理微应用
            closeMicroApp(item, this.tabs);
            indexFlag = index - 1;
          }
        });
        if (this.tabs[indexFlag]) {
          this.tabs[indexFlag].active = true;
          this.setStoreTabs();
          if (currentTab.path === this.activeTab) {
            this.goToPage(indexFlag);
          }
        }
      },
      goToPage(index) {
        const { id, title, path } = this.tabs[index];
        createMicroApp(path).then(() => {
          this.$router.push({
            path: path,
            params: { name: title },
          });
        });
      },
      setStoreTabs() {
        store?.commit('tabsModule/setTabs', this.tabs);
      },
      menuButonClick() {
        this.menuShow = !this.menuShow;
      },
      clickMenuItem(code) {
        this.hideMenu();
        switch (code) {
          case 'menuClose':
            this.menuClose();
            break;
          case 'menuCloseLeft':
            this.menuCloseLeft();
            break;
          case 'menuCloseRight':
            this.menuCloseRight();
            break;
          case 'menuCloseOther':
            this.menuCloseOther();
            break;
          case 'menuCloseAll':
            this.menuCloseAll();
            break;
        }
      },
      menuCloseLeft() {
        this.tabs.forEach((e, i) => {
          if (e.active) {
            const closeTabs = this.tabs.splice(1, i - 1);
            // 批量关闭页签处理微应用
            closeMultipleMicroApp(closeTabs, this.tabs);
          }
        });
        this.setStoreTabs();
      },
      menuCloseRight() {
        this.tabs.forEach((e, i) => {
          if (e.active) {
            const closeTabs = this.tabs.splice(i + 1);
            // 批量关闭页签处理微应用
            closeMultipleMicroApp(closeTabs, this.tabs);
          }
        });
        this.setStoreTabs();
      },
      menuCloseOther() {
        const closeTabs = this.tabs.filter((item, index) => {
          return index != 0 && !item.active;
        });
        this.tabs = this.tabs.filter((item, index) => {
          return index === 0 || item.active;
        });
        // 批量关闭页签处理微应用
        closeMultipleMicroApp(closeTabs, this.tabs);
        this.setStoreTabs();
      },
      menuCloseAll() {
        const closeTabs = this.tabs.splice(1);
        // 批量关闭页签处理微应用
        closeMultipleMicroApp(closeTabs, this.tabs);
        this.tabs[0].active = true;
        this.setStoreTabs();
        this.goToPage(0);
      },
      hideMenu() {
        this.menuShow = false;
      },
      refreshPage() {
        this.$router.go(0);
      },
      fullScreen() {
        console.error('aaa');
      },
    },
    created() {
      const localStorageTabs = JSON.parse(localStorage.getItem('tabs'));
      if (localStorageTabs) {
        store?.commit('tabsModule/setTabs', localStorageTabs);
      } else {
        store?.commit('tabsModule/setTabs', [
          // { id: 1900554, title: '首页', path: '/home', closeAble: false, active: true },
          {"id":1900495,"title":"首页","path":"/weiwai/homepage","closeAble":false,"active":true}
        ]);
      }
    },
    mounted() {
      this.tabs = this.$store.state.tabsModule.tabs;
    },
    watch: {
      '$store.state.tabsModule.tabs': function () {
        this.tabs = this.$store.state.tabsModule.tabs;
        const activeTabItem = this.tabs.forEach((item) => {
          if (item.active) {
            this.activeTab = item.path;
          }
        });
      },
      $route(to, from) {
        const hasFlag = this.tabs.filter((item) => item.path === to.path);
        if (hasFlag.length > 0) {
          this.tabs.forEach((item) => {
            item.active = false;
            if (item.path === to.path) {
              item.active = true;
              this.activeTab = item.path;
            }
          });
        } else {
          const menuArr = JSON.parse(localStorage.getItem('auth_routes')) ?? [];
          const routeMenu = this.treeDataFindPath(menuArr, (data) => data.path === to.path);
          store?.commit('tabsModule/addTabs', routeMenu);
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .tab-bar {
    position: relative;
    width: 100%;
    height: 40px;
    margin-bottom: 10px;

    .tabs-contain {
      display: inline-block;
      width: calc(100% - 40px);
    }

    .menu-button {
      display: inline-block;
      height: 40px;
      padding: 5px;
      line-height: 40px;
      vertical-align: top;
      background-color: #fff;
      border-radius: 4px 4px 0 0;
    }
  }

  ::v-deep .is-active {
    font-weight: bold;
  }

  ::v-deep .el-tabs {
    border: none !important;
  }

  ::v-deep .el-tabs__header {
    border: none !important;
  }

  ::v-deep .el-tabs__nav {
    border: none !important;
  }

  ::v-deep .el-tabs__item {
    margin: 0 5px;
    background-color: #f1f2f3;
  }

  ::v-deep .el-tabs__nav-prev {
    background-color: #f1f2f3;
  }

  ::v-deep .el-tabs__nav-next {
    background-color: #f1f2f3;
  }

  .menu {
    position: absolute;
    top: 35px;
    right: 2px;
    z-index: 4;
    width: 100px;
    padding: 0;
    background-color: #fff;
    box-shadow: 3px 3px 3px rgba($color: #ccc, $alpha: 100%);
    transition: 0.3s;

    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 32px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: #2998e8;
      }
    }
  }
</style>
