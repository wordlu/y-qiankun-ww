<template>
  <div>
    <slot :open="open"></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    /**
     * 提示 title
     */
    title: String,
    /**
     * 提示 内容
     */
    message: {
      type: String,
      default: () => '确定要删除内容吗？'
    },
    /**
    *  确认文案
    */
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    /**
    *  取消文案
    */
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    /**
    *   是否显示取消按钮
    */
    showCancelButton: {
      type: Boolean,
      default: true
    },
    /**
    *   是否可通过点击遮罩关闭 MessageBox
    */
    closeOnClickModal: Boolean,
    /**
    *   是否显示取消关闭icon
    */
    showClose: {
      type: Boolean,
      default: true
    },
    /**
    *   弹窗关闭前 回调
    */
    beforeClose: Function,
    /**
    *   自定义确认事件
    */
    onOk: Function,
    /**
      *   自定义取消事件
      */
    onCancel: Function
  },
  methods: {
    open() {
      this.$msgbox({
        title: this.title || '',
        message: this.message,
        showClose: this.showClose,
        closeOnClickModal: this.closeOnClickModal,
        showCancelButton: this.showCancelButton,
        confirmButtonText: this.confirmButtonText,
        cancelButtonText: this.cancelButtonText,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.onOk?.(instance, done);
          } else {
            this.onCancel?.(instance, done)
          }
          done()
        },
      }).then(() => {
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang="less">
.el-message-box {
  width: 410px;
  border: none;
  background: #FFFFFF;
  box-shadow: 0px 12px 40px 0px rgba(63, 73, 92, 0.2);
  border-radius: 4px;
}

.el-message-box__headerbtn {
  width: 24px;
  height: 24px;
  top: 16px;
  right: 24px;
}

.el-message-box__headerbtn .el-message-box__close {
  color: #3F495C;
}

.el-message-box__content {
  padding: 23px 16px 24px 16px;
}

.el-message-box__message {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #9398A3;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: 400;
}

.el-message-box__btns {
  padding: 0 16px;
}

.el-button--primary {
  background: @color-primary;
}

.el-message-box {
  padding-bottom: 16px;
}
</style>
