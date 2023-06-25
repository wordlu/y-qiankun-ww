<template>
  <div class="headBox">
    <div class="login">委外资产数据管理平台</div>
    <div class="settingBox">
      <i class="el-icon-lock"></i>
      <i class="el-icon-bell"></i>
      <div class="user">
        <el-avatar> 张三 </el-avatar>
      </div>
      <div class="logout" @click.stop="onLogout($router)">退出</div>
    </div>
  </div>
</template>

<script lang="ts">


export default {
  props: {
    onLogout: Function
  },
}
</script>
<style scoped lang="less">

.headBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  background: #fff;

  .login {
    margin-left: 16px;
    font-size: 22px;
    font-weight: bold;
    color: #3371FF;
    width: 300px;
  }

  .settingBox {
    display: flex;
    align-items: center;
    cursor: pointer;

    >i {
      padding: 0 16px;
    }

    .user {
      padding: 0 16px;
    }

    .logout {
      display: flex;
      padding: 0 16px;
      color: #3371FF;
      // font-weight: bold;
      cursor: pointer;
    }

  }
}
</style>
