<template>
  <el-menu default-active="2" class="el-menu-vertical" menu-trigger="click">
    <template v-for="item in asideData">
      <template v-if="item.children">
        <el-submenu :key="item.meta.title" :index="item.meta.title" @click="handleClick(item)">
          <template slot="title">
            <span>{{ item.meta.title }}</span>
          </template>
          <Aside :asideData="item.children" @click="handleClick"></Aside>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="item.meta.title" :index="item.meta.title" @click="handleClick(item)">
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script lang="ts">

type DataItem = { path: string; name: string;[key: string]: any };

export default {
  name: 'Aside',
  props: {
    asideData: {
      type: Array as () => DataItem[]
    }
  },
  methods: {
    handleClick(item: DataItem) {
      this.$router.push({ path: item.path }, () => { });
    }
  },
  computed: {

  }
};
</script>

<style scoped>
.el-menu-vertical {
  height: 100%;
  box-sizing: border-box;
}
</style>
