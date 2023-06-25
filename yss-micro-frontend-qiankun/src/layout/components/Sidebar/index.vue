<!-- 导航菜单组件 -->

<template>
  <div class="sidebar-box">
    <!--一级 菜单 -->
    <yss-menu
      class="el-menu__vertical"
      :default-active="activeMenu + ''"
      :collapse="isCollapse"
      :text-color="menuTextColor"
      :active-text-color="menuActiveTextColor"
      v-bind="$attrs"
      v-on="$listeners"
      @select="getSelectMenu"
    >
      <yss-menu-item
        v-for="meunListItem in shouldShow(menuList)"
        :key="meunListItem.id"
        :index="meunListItem.id + ''"
        @click="openMemu(meunListItem)"
      >
        <span class="menu-icon__span">
          <!-- <i
            style="margin-top: -2px"
            :class="[meunListItem.icon ? `iconfont ${meunListItem.icon}` : 'el-icon-edit']"
            :style="meunListItem.id == activeMenu ? getSpanIconStyle() : ''"
          ></i> -->
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${meunListItem.icon}`"></use>
          </svg>
          <span class="circle-graph" v-if="meunListItem.id == activeMenu"></span>
        </span>

        <span
          slot="title"
          :style="meunListItem.id == activeMenu ? getSpanIconStyle() : 'fontSize: 14px'"
        >
          {{ meunListItem.name }}
        </span>
      </yss-menu-item>

      <div class="collapse-btn" @click="changeSideWidth">
        <i :class="`el-icon-${isCollapse ? 'arrow-right' : 'arrow-left'}`"></i>
      </div>
    </yss-menu>
    <!-- 二级、三级菜单 -->
    <yss-drawer
      ref="drawer"
      direction="ltr"
      custom-class="menu-drawer"
      :visible.sync="drawer"
      :modal="false"
      :show-close="false"
      :wrapperClosable="false"
      :lock-scroll="false"
      @close="closeMenu"
    >
      <div class="menu-content">
        <i class="el-icon-close close-icon" @click="menuItemHandle" style="cursor: pointer"></i>
        <!-- <div class="menu-lately">
          <span>常用/最近/快捷</span>
          
        </div>
        <div class="menu-lately__list">
          <span class="menu-lately__list-text">
            {{ activeMenu }}
            <i class="el-icon-close"></i>
          </span>
        </div> -->

        <yss-input v-model="input" placeholder="查找菜单" suffix-icon="el-icon-search"></yss-input>

        <div class="meum-list__second-box">
          <div
            class="meum-list__second-item"
            v-for="items in shouldShow(currentMenuList)"
            :key="items.id"
            @click.stop="menuItemHandle(items)"
            :style="{ marginBottom: items.children ? '4px' : '24px' }"
          >
            <div class="meum-list__second-title">
              <!-- <i class="iconfont solid_size"></i> -->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#solid_size"></use>
              </svg>
              <span class="meum-list__second-titlename">{{ items.name }}</span>
            </div>

            <div class="meum-list__third-box">
              <div
                class="meum-list__third-title"
                v-for="thirdMenu in shouldShow(items.children)"
                :key="thirdMenu.value"
                @click.stop="menuItemHandle(thirdMenu)"
              >
                {{ thirdMenu.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </yss-drawer>
  </div>
</template>
<script>
import localStorage from '@/utils/localStorage';
import { getObjByRoute, treeFindPath } from '../../../tools/util/index';
import { MENU_ICON_COLOR, MENU_TEXT_COLOR, MENU_ACTIVE_TEXT_COLOR } from '@/const';
import store from '@/store';
export default {
  name: 'SidebarBlock',
  data() {
    return {
      isCollapse: false, //折叠菜单
      input: '', //输入框内容
      drawer: false, //Drawer显示开关
      activeMenu: '', //激活的菜单
      currentMenu: '', //选中的一级菜单key
      selectMenuItem: [], //选中的二级菜单数组
      menuList: [], //导航菜单配置
      menuTextColor: MENU_TEXT_COLOR,
      menuActiveTextColor: MENU_ACTIVE_TEXT_COLOR,
    };
  },

  //初始化菜单信息
  created: function () {
    let menuArr = localStorage.getItem('auth_routes') ?? [];
    let { path } = this.$route;
    this.menuList = menuArr;
    let arr = this.menuList.filter((obj) => this.currentMenu == obj.id);
    this.selectMenuItem = arr[0]?.children;
    if (path?.split('/').includes('home')) return;
    let currentRoute = getObjByRoute(menuArr, path);
    let routeMenu = treeFindPath(menuArr, (data) => data.id === currentRoute.id, [], 'id');
    this.activeMenu = routeMenu[0];
  },

  methods: {
    //打开Drawer
    openMemu: function ({ id, children, label, path }) {
      if (!children) {
        this.drawer = false;
        store?.commit('tabsModule/addTabs', { id, label, path });
        this.$router.push(path);
        return;
      }
      if (!this.drawer) this.drawer = true;
      if ([this.currentMenu].includes(id)) {
        this.drawer = false;
      }
      this.currentMenu = id;
    },
    //关闭Drawer
    closeMenu: function () {
      this.currentMenu = '';
    },
    //菜单激活事件
    getSelectMenu: function (index, indexPath) {
      this.activeMenu = index;

      //获取选中的菜单信息
      let arr = this.menuList.filter((obj) => index == obj.id);
      this.selectMenuItem = arr[0]?.children;
    },

    //二级三级菜单点击事件
    menuItemHandle: function (route) {
      this.drawer = false;
      if (route.id) {
        store?.commit('tabsModule/addTabs', route);
        this.$router.push(route.path);
      }
    },

    //改变父组件side宽度
    changeSideWidth: function () {
      this.isCollapse = !this.isCollapse;
      this.$emit('changeWidth', this.isCollapse ? '64px' : '256px');
    },

    getSpanIconStyle: function () {
      return {
        color: `${MENU_ICON_COLOR} !important`,
        fontSize: '14px',
      };
    },

    shouldShow: function (arr = []) {
      if (arr) return arr.filter((item) => item.type == 0);
    },
  },
  computed: {
    //搜索出来的菜单列表（包含二级三级）
    searchMenuList: function () {
      const val = this.input;
      const newSelectMenuItem = JSON.parse(JSON.stringify(this.selectMenuItem));
      let nameArr = [];
      let searchArr = newSelectMenuItem.filter(({ name, children }) => {
        if (name.indexOf(val) != -1) nameArr.push(name);
        let subarr = children?.filter((subItem) => {
          if (subItem.name.indexOf(val) != -1) {
            nameArr.push(name);
            return subItem;
          }
        });
        children = subarr;
        return nameArr.includes(name);
      });
      return searchArr;
    },
    //input存在就是用筛选列表，没输入就是用默认列表
    currentMenuList: function () {
      if (this.input) return this.searchMenuList;
      return this.selectMenuItem;
    },
  },
  watch: {
    isCollapse: function (val) {
      let drawerBox = document.getElementsByClassName('el-drawer');
      if (val && this.$refs.drawer) {
        drawerBox[0].style.left = '64px';
      } else {
        drawerBox[0].style.left = '256px';
      }
    },

    $route(to, from) {
      let { tabs } = this.$store.state.tabsModule;
      let activeTab = tabs?.filter((item) => item.active == true);
      let menuArr = localStorage.getItem('auth_routes') ?? [];
      if (activeTab.length > 0) {
        let routeMenu = treeFindPath(menuArr, (data) => data.id === activeTab[0].id, [], 'id');
        this.activeMenu = routeMenu[0];
      }
    },
  },
};
</script>

<!-- 注意：没有写scope -->
<style lang="scss">
.icon {
  width: 24px;
  height: 24px;
}

.sidebar-box:has(.el-menu__vertical):hover .collapse-btn{
  display: block;
}

.sidebar-box {
  position: relative;
  height: 100%;
  padding-top: 1px;

  /* 修改menu的样式 */
  .el-menu__vertical {
    position: relative;
    // z-index: 2500;
    z-index: 1901;
  }

  /* stylelint-disable selector-class-pattern */
  .el-menu__vertical:not(.el-menu--collapse) {
    width: 256px;
    height: 100%;
  }
  /* stylelint-enable selector-class-pattern */
  .el-menu {
    box-sizing: border-box;
    height: 100%;
    padding-top: 24px;
    padding-right: 8px;
    // overflow-y: scroll;
    border-right: none;
    box-shadow: 0 0 8px 0 rgb(63 73 92 / 10%);
  }

  .el-menu__vertical::-webkit-scrollbar {
    display: none;
  }

  .el-menu-item {
    height: 40px;
    margin-bottom: 8px;
    line-height: 40px;
    text-align: left;
    border-radius: 4px;
    user-select: none;
  }

  .menu-icon__span {
    width: auto !important;
    height: auto !important;
    visibility: inherit !important;
  }

  .el-menu-item [class^='el-icon-'] {
    width: auto !important;
    margin-right: 3px;
    font-size: 20px;
  }

  .el-menu-item:hover,
  .el-menu-item:focus {
    background-color: #f7f8f9 !important;
  }

  .circle-graph {
    position: absolute;
    top: 11px;
    right: 0;
    display: inline-block;
    width: 3px !important;
    height: 20px !important;
    background: #3371ff;
    border-radius: 4px 0 0 4px;
    visibility: inherit !important;
    transition: background-color 0.3s;
  }

  .collapse-btn {
    width: 24px;
    height: 24px;
    line-height: 26px;
    position: absolute;
    top: 24px;
    border-radius: 50%;
    right: -12px;
    background: #FCFCFD;
    box-shadow: 2px 0px 8px 0px rgba(63, 73, 92, 0.1);
    text-align: center;
    z-index: 99990;
    cursor: pointer;
    color: #3371FF;
    display: none;
  }

  /* 修改Drawer组件样式 */
  .el-drawer__wrapper {
    position: absolute;
    top: 1px;
    overflow: visible;
    z-index: 1900 !important;
  }

  .el-drawer__header {
    margin-bottom: 0;
    padding-top: 54px;
  }

  .menu-drawer {
    width: 560px !important;
    position: relative;
  }

  .el-drawer.ltr {
    top: -1px;
    left: 256px;
    background: #fff;
    border-top: none;
    box-shadow: 0 0 8px 0 rgb(63 73 92 / 10%);
    transition: 0.3s left ease-in-out;
  }

  /* 修改Drawer内容样式 */
  .menu-content {
    padding: 0 32px 16px;
    text-align: left;

    .close-icon {
      position: absolute;
      right: 32px;
      top: 40px;
    }

    .menu-lately {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #3f495c;
      font-weight: 500;
      font-size: 18px;
    }

    .menu-lately__list {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 14px 0;
      color: #3f495c;
      font-size: 14px;

      .menu-lately__list-text {
        display: inline-block;
        min-width: 50px;
        padding: 0 8px;
        line-height: 24px;
        background: #f1f2f3;
      }

      .el-icon-close {
        margin-left: 3px;
        color: #3f495c;
        cursor: pointer;
      }
    }
  }

  /* 修改el-input样式 */
  .el-input__inner,
  .el-input__icon {
    height: 32px;
    line-height: 32px;
  }

  .el-input__inner {
    border: 1px solid rgb(183 186 193 / 100%);
    border-radius: 2px;
  }

  /* 修改搜索列表样式 (瀑布流) */
  .meum-list__second-box {
    margin-top: 24px;
    columns: 232px 2;
    column-gap: 32px;

    .meum-list__second-item {
      margin-bottom: 24px;
      break-inside: avoid;
    }

    .meum-list__second-title,
    .meum-list__third-title {
      display: flex;
      align-items: center;
      height: 32px;
      cursor: pointer;
    }

    .meum-list__second-title {
      padding: 0 10px;
      color: #0f1b33;
      font-weight: 500;
      font-size: 16px;
      letter-spacing: 0;

      .meum-list__second-titlename {
        padding-left: 3px;
      }
    }

    .meum-list__third-title {
      margin-bottom: 4px;
      padding: 0 10px 0 28px;
      color: #3f495c;
      font-size: 14px;
    }

    .meum-list__third-box {
      margin-top: 10px;
    }

    .meum-list__second-title:hover,
    .meum-list__third-title:hover {
      color: #3371ff;
      background: #eaf0ff;
      border-radius: 4px;
    }
  }
}
</style>
