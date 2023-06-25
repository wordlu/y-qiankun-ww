<template>
  <div class="dropdown">
    <el-dropdown @command="handleCommand">
      <el-button v-if="buttonName">{{ buttonName }}</el-button>
      <span v-else>{{ textName }}
        <!-- <svg class="icon svg-icon" aria-hidden="true"> -->
                    <!-- <use xlink:href="#xe673;"></use> -->
              <span class="icon iconfont">&#xe673;</span>
        <!-- </svg> -->
      </span>
      <el-dropdown-menu slot="dropdown" class="box" :class="buttonName ? 'boxTwo' : ''">
        <el-dropdown-item :command="item.value" v-for="item in dropdownList" :key="item.value">{{ item.name
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script >
export default {
  props: {
    buttonName: {
      type: String,
      default: ''
    },
    textName: {
      type: String,
      default: ''
    },
    dropdownList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleCommand(data) {
      this.$emit('handleCommand', data)
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  margin: 0;
  margin-top: 5px !important;
  padding: 0 0 4px 0;
  border-radius: 0;

  ::v-deep .popper__arrow {
    display: none;
  }

  ::v-deep .el-dropdown-menu__item {
    &:hover {
      background-color: #eaf0ff;
      color: #2F6AFF;

    }

  }
}
    ::v-deep .el-dropdown-selfdefine {
      display: flex;
    }
.boxTwo {
  min-width: 88px !important;
}
</style>
