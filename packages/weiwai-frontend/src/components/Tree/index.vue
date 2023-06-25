<template>
  <div class="select">
    <el-input placeholder="输入关键词以查找" size="small" @keyup.enter.native="filterTree" v-model="filterText">
      <i slot="suffix" class="el-icon-search" @click="filterTree"></i>
    </el-input>
    <div class="opt-icons" v-if="showOptIcons">
      <i class="el-icon-d-arrow-left icon" v-show="treeExpand" @click="() => setAllExpand(false)"></i>
      <i class="el-icon-d-arrow-right icon" v-show="!treeExpand" @click="() => setAllExpand(true)"></i>
      <i class="el-icon-refresh icon" @click="syncAll"></i>
    </div>
    <el-tree 
      ref="tree" class="select-tree" node-key="id"
      :data="treeList" 
      :show-checkbox="showCheck" 
      highlight-current
      v-loading="loadingShow"
      :expand-on-click-node="expandOnNode"
      :default-expand-all="defaultExpandAll" 
      :default-expanded-keys="expandedKeys" 
      :default-checked-keys="keys" 
      :props="defaultProps"
      :filter-node-method="filterNode" 
      @check-change="handleNodeClick" 
      @node-click="handleClickTree"
      :style="[{ 'height': `${height}px` },{'overflow':'auto'}]">
    </el-tree>
  </div>
</template>
<!-- <script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class Tree extends Vue {
  /**
   * treeList => 数据列表
   * checkedKeys => 选中的数据
   * expandedKeys => 父级选中数据(一般不用传, 组件会根据子集自动选中父级)
   * resetScroll => 重置滚动条(仅在弹窗上有效，关联弹窗的status)
   * showFilter => 是否开启tree顶部搜索框
   * 禁用需要在tree里面使用disabled进行禁用
   */
  @Prop({
    default: [],
    required: true,
  })
  treeList!: Array<string>;
  /*
      数据结构为{
          label: 'title',
          id: 1,
          children: [子集]
      }
   */
  @Prop({
    default: false,
    required: true,
  })
  showCheck!: boolean;
  @Prop({
    default: [],
    required: true,
  })
  checkedKeys!: Array<string>;
  @Prop({
    default: () => [],
    required: true,
  })
  expandedKeys!: Array<any>;
  @Prop({
    default: false,
    required: true,
  })
  resetScroll!: boolean;
  @Prop({
    default: false,
    required: true,
  })
  hasParent!: boolean;

  private defaultProps: object = {
    children: "children",
    label: "label",
  };
  private maxHeight = 500;
  public filterText = "";
  private keys = [];

  // private mounted() {
  //   this.keys = this.checkedKeys.length ? [...this.checkedKeys] : [];
  //   // 根据浏览器高度来确定显示的最大高度
  //   this.maxHeight = parseInt(document.documentElement.clientHeight * 0.4);
  // }
  @Watch("child")
  // 重置滚动条
  resetScroll1(value: any) {
    if (value) {
      (this.$refs.tree as Vue).$el.scrollTop = 0;
      this.filterText = "";
    }
  }
  // filterText(val) {
  //   this.$refs.tree.filter(val);
  // },
  // 重置内容
  checkedKeys1(val: any, oldVal: any) {
    (this.keys as any) = this.checkedKeys.length ? [...this.checkedKeys] : [];
    const flag = JSON.stringify(val) === JSON.stringify(oldVal);
    if (!this.checkedKeys.length && flag) {
      this.$nextTick(() => {
        (this.$refs.tree as any).setCheckedKeys([]);
      });
    }
  }

  private handleNodeClick(data: any, checked: any) {
    // console.log(data, checked)
    let removalList = (this.$refs.tree as any).getCheckedKeys();
    let tempSelectList = [...removalList];
    // if (!this.hasParent) {
    // }
    this.$emit("treeChange", tempSelectList);
  }
  private filterNode(value: any, data: { label: string | any[] }) {
    if (!value) return true;
    return data.label.includes(value);
  }

  private filterTree() {
    (this.$refs.tree as any).filter(this.filterText);
  }
}
</script> -->

<script>
export default {
  name: "Tree",
  /**
   * treeList => 数据列表
   * checkedKeys => 选中的数据
   * expandedKeys => 父级选中数据(一般不用传, 组件会根据子集自动选中父级)
   * resetScroll => 重置滚动条(仅在弹窗上有效，关联弹窗的status)
   * showFilter => 是否开启tree顶部搜索框
   * 禁用需要在tree里面使用disabled进行禁用
   */
  props: {
    loadingShow: {
      type: Boolean,
      default: false
    },
    expandedLevel: {
      type: String,
      default: 'all',
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandOnNode: {
      type: Boolean,
      default: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
    treeList: {
      type: Array,
      default: () => [],
      /*
      数据结构为{
          label: 'title',
          id: 1,
          children: [子集]
      }
*/
    },
    checkedKeys: {
      type: Array,
      default: () => [],
    },
    expandedKeys: {
      type: Array,
      default: () => [],
    },
    // 是否重置滚动条
    resetScroll: {
      type: Boolean,
      default: false,
    },
    // 是否需要父级id
    hasParent: {
      type: Boolean,
      default: false,
    },
    // 是否展示多选框
    showCheck: {
      type: Boolean,
      default: true,
    },
    defaultProps: {
      type: Object,
      default: () => (
        {
          children: "children",
          label: "label",
        }
      )
    },
    filterName: {
      type: String,
      default: 'label'
    },
    showOptIcons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // maxHeight: 100% ,
      filterText: "",
      keys: [],
      height: null,
      treeExpand: false,
    };
  },
  mounted() {
    this.keys = this.checkedKeys.length ? [...this.checkedKeys] : [];
    // 根据浏览器高度来确定显示的最大高度
    // this.maxHeight = parseInt(document.documentElement.clientHeight * 0.4);
  },
  watch: {
    // 重置滚动条
    resetScroll(value) {
      if (value) {
        this.$refs.tree.$el.scrollTop = 0;
        this.filterText = "";
      }
    },
    // filterText(val) {
    //   this.$refs.tree.filter(val);
    // },
    // 重置内容
    checkedKeys(val, oldVal) {
      this.keys = this.checkedKeys.length ? [...this.checkedKeys] : [];
      const flag = JSON.stringify(val) === JSON.stringify(oldVal);
      if (!this.checkedKeys.length && flag) {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
        });
      }
    },
  },
  methods: {
    handleSetCheckedKeys(data) {
      this.$refs.tree.setCheckedKeys(data)
    },
    handleClickTree(data) {
      this.$emit("handleClickTree", data)
    },
    syncAll() {
      this.$emit('syncAll')
    },
    setAllExpand(state) {
      this.treeExpand = state
      if (state && this.expandedLevel === '1' && this.treeList[0]) {
        this.expandedKeys.push(this.treeList[0].id)
        return;
      }
      var nodes = this.$refs.tree.store.nodesMap
      for (var i in nodes) {
        nodes[i].expanded = state;
      }
    },
    handleNodeClick(data, checked) {
      let removalList = this.$refs.tree.getCheckedNodes();
      let tempSelectList = [...removalList];
      if (!this.hasParent) {
      }
      this.$emit("treeChange", tempSelectList);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.filterName].includes(value);
    },

    filterTree() {
      this.$refs.tree.filter(this.filterText);
    },
  },
  mounted() {
    this.$nextTick(() => {
      let list = Array.from(document.querySelector('.select').parentNode.children)
      let height = list.filter((item) => {
        // return item._prevClass !== "select"
        return item._prevClass !== "select"
      }).reduce((p, i) => {
        return p + i.clientHeight
      }, 0)
      this.height = document.body.clientHeight - height - 56 - 32 - 40 - 10 - 15 - 32 - 12 - 15
      if (this.showOptIcons) {
        this.height = this.height - 70
      }
    })


  }
};
</script>
<style lang="less">
.select {
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }

  .el-tree-node__content {
    height: 36px;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #fff;
  }

  .el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }

  .el-input__suffix {
    top: 25% !important;
  }
}
</style>
<style lang="less" scoped>
.select {
  .select-tree {
    overflow: auto;
    margin-top: 12px;
  }

  .opt-icons {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0;
    border-bottom: 1px solid rgba(219, 221, 225, 1);
    height: 50px;
    box-sizing: border-box;

    .icon {
      margin-left: 24px;
      cursor: pointer;
    }

    .el-icon-d-arrow-left {
      transform: rotate(88deg);
    }

    .el-icon-d-arrow-right {
      transform: rotate(88deg);

    }
  }
}

::v-deep .el-tree>.el-tree-node {
  display: inline-block;

}
</style>
