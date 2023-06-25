<template>
  <span>
    <el-drawer :title="title" :open="onOpen" :before-close="onClose" :visible="dialog" direction="rtl" ref="drawer"
      :size="true ? 409 : 795" :wrapperClosable="wrapperClosable">
      <div class="drawerBox" :class="min ? 'minWidth' : 'maxWidth'">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footBtn"></slot>
      </div>
    </el-drawer>

  </span>
</template>

<script lang="ts">

export default {
  props: {
    /**
     * 提示 title
     */
    title: String,
    /**
     * 抽屉显示/隐藏
     */
    dialog: {
      type: Boolean,
      default: false
    },
    /**
      * 抽屉宽度 true: 一栏 false:两栏
      */
    min: {
      type: Boolean,
      default: true
    },
    /**
    *   抽屉 打开 事件
    */
    onOpen: Function,
    /**
    *   抽屉 关闭 事件
    */
    onClose: Function,
    /**
     * 点击遮罩层是否可以关闭 Drawer
     */
    wrapperClosable: {
      type: Boolean,
      default: false
    },

  },
}
</script>
<style lang="less">
.drawerBox {
  width: 100%;
  height: calc(100% - 56px);
  padding: 0 24px;
  background: #FFFFFF;
  box-sizing: border-box;
  box-shadow: -12px 0px 40px 0px rgba(63, 73, 92, 0.2);
  overflow-y: auto;
  font-family: '微软雅黑';
}

.el-drawer__container {
  font-family: '微软雅黑';
}

.el-drawer__header {
  margin-bottom: 0;
  padding: 22px 24px 24px 24px;

  span {
    color: #0F1B33;
    font-weight: 500;
  }
}

.footer {
  display: flex;
  justify-content: flex-end;
  height: 32px;
  padding: 0 24px;
  margin-bottom: 24px;
  background: #FFFFFF;


  button {
    height: 32px;
    padding: 4px 16px;
    border-radius: 2px;
  }

}

.el-button--primary {
  background-color: #2f6aff !important;
  border-color: #2f6aff !important;
}

.el-select-dropdown.el-popper {
  width: 200px;
}

.el-upload {
  .el-button {
    width: 88px;
    padding: 8px 13px;
    font-size: 14px;
  }
}

.el-upload-list__item {
  height: 32px;
  line-height: 32px;
  border-bottom: 1px solid #DBDDE1;
  color: #3F495C;
  cursor: pointer;

  &:hover {
    background: #EAF0FF;
  }

  .el-upload-list__item-name {
    padding-left: 10px;
  }

  .el-icon-close {
    top: 9px;
    right: 8px;
    color: #3F495C;
  }
}

.commom {
  .el-form-item__label {
    height: 24px;
    font-size: 16px;
    color: #3F495C;
    margin-bottom: 8px;
    padding: 0;
    line-height: 24px;
  }

  .el-form-item__content {
    line-height: 32px;
  }

  .el-select {
    width: 100%;
  }

  .el-input--mini .el-input__inner {
    width: 100%;
    height: 32px;
    line-height: 32px;
  }

  .el-upload-list__item {
    width: 100% !important;
  }

  .el-date-editor {
    width: 100%;

    //日期、时间选择器前面有icon
    .el-input__inner {
      padding-left: 28px;
    }
  }
}

.minWidth {
  .el-form-item {
    .commom;
  }
}

.maxWidth {
  .el-form {
    display: flex;
    flex-wrap: wrap;
  }

  .el-form-item {
    width: 362px;
    flex-shrink: 0;
    box-sizing: border-box;
    .commom;

    &:nth-child(odd) {
      margin-right: 20px;
    }
  }
}

.visibleInput {
  position: absolute;
  z-index: -1;
  visibility: hidden;
  height: 0;
}

label {
  font-weight: 400;
}
</style>
