<template>
  <div class="login-wrap">
    <div class="left-area-wrap">
      <div class="left-img"></div>
    </div>
    <div class="right-area-wrap">
      <div class="login-title">委外资产数据管理平台</div>
      <div class="login-form-wrap">
        <span class="title">账号登录</span>
        <yss-form
          @keyup.enter.native="handValidAndleLogin"
          :model="loginFormData"
          ref="loginForm"
          :rules="loginFromRules"
          label-width="0"
        >
          <yss-form-item prop="username">
            <yss-input v-model.trim="loginFormData.username" placeholder="请输入用户名" clearable>
              <i slot="prefix" class="user-prefix-icon"></i>
            </yss-input>
          </yss-form-item>
          <yss-form-item prop="password">
            <yss-input
              type="password"
              v-model.trim="loginFormData.password"
              placeholder="请输入密码"
              show-password
              clearable
            >
              <i slot="prefix" class="password-prefix-icon"></i>
            </yss-input>
          </yss-form-item>
          <yss-form-item>
            <yss-button type="primary" @click="handValidAndleLogin" :loading="loading"
              >登录</yss-button
            >
          </yss-form-item>
        </yss-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { mapState, mapActions } from 'vuex';
  import { ILoginFormValues } from './type';

  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        loginFormData: {} as ILoginFormValues,
        loginFromRules: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        },
      };
    },
    computed: {
      ...mapState('loginModule', ['loginBackPath']),
    },
    methods: {
      ...mapActions('loginModule', ['handleLogin']),
      // 登陆前的校验逻辑
      async beforeLoginValid() {
        return new Promise((resolve) => {
          this.$refs['loginForm']?.validate(resolve);
        });
      },
      async handValidAndleLogin() {
        try {
          this.loading = true;
          window.localStorage.clear()
          // 校验
          const isValid = await this.beforeLoginValid();
          if (!isValid) return;

          // 登录
          const loginSucceeded = await this.handleLogin(this.loginFormData);
          // 跳转到loginBackPath路由
          loginSucceeded && this.$router.push({ path: '/weiwai/homepage' });
          // loginSucceeded && this.$router.push({ path: this.loginBackPath });
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
<style scoped lang="scss">
  .login-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 2vw;
    background: url('@/assets/image/login/login_bg.png') no-repeat center center;
    background-size: cover;

    .left-area-wrap {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-top: 4vh;
      padding-right: 6vw;
      margin-left: 10vw;

      .left-img {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40vw;
        height: 56vh;
        background: url('@/assets/image/login/login_left.png') no-repeat center center;
        background-size: contain;
      }
    }

    @media screen and (width <= 900px) {
      .left-area-wrap {
        display: none;
      }
    }

    .right-area-wrap {
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .login-title {
        color: #3371ff;
        font-weight: 700;
        font-size: 48px;
        white-space: nowrap;
      }

      .login-form-wrap {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 380px;
        height: 464px;
        margin-top: 55px;
        padding: 64px 48px;
        background: #fff;
        border-radius: 2px;
        box-shadow: 8px 8px 40px 0 rgb(51 113 255 / 12%);

        .title {
          position: relative;
          display: flex;
          justify-content: center;
          height: 22px;
          margin-bottom: 40px;
          color: #0f1b33;
          font-weight: bold;
          font-size: 16px;

          &::after {
            position: absolute;
            bottom: -4px;
            width: 22px;
            height: 3px;
            margin-left: -11px;
            overflow: hidden;
            background: #3371ff;
            border-radius: 2px;
            content: '';
          }
        }

        %icon {
          display: flex;
          width: 16px;
          height: 16px;
        }

        .user-prefix-icon {
          @extend %icon;

          background: url('@/assets/image/login/user.svg') no-repeat;
        }

        .password-prefix-icon {
          @extend %icon;

          background: url('@/assets/image/login/lock.svg') no-repeat;
        }
      }

      .password-suffix-icon {
        @extend %icon;

        background: url('@/assets/image/login/eye.svg') no-repeat;
      }

      .last-form-item {
        margin: 0;

        ::v-deep .el-form-item__content {
          line-height: 0px;
        }
      }

      ::v-deep .el-input__prefix {
        display: flex;
        align-items: center;
      }

      ::v-deep .el-input__suffix {
        display: flex;
        align-items: center;
      }

      ::v-deep .el-input__inner {
        background: #f5f8ff;
        border-color: #f5f8ff;
        border-radius: 2px;
      }

      ::v-deep .el-button {
        width: 100%;
        margin-top: 56px;
        color: #fff;
        background-color: #3371ff;
        border-radius: 2px;
      }

      ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #3f495c;
      }
    }
  }
</style>
