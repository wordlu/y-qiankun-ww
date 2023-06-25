<template>
  <div class="common-search-form" v-if="formConfig">
    <yss-form ref="searchForm" inline :model="formData" label-width="80px">
      <yss-row>
        <!-- 后续再添加容器宽度监听 -->
        <yss-col
          :span="6"
          :xs="12"
          :sm="12"
          :md="8"
          :lg="6"
          v-for="(item, key) in formConfig"
          :key="key"
        >
          <yss-form-item :label="item.label" :prop="key" :style="item.style">
            <yss-input
              v-model="formData[key]"
              :disabled="item.disabled"
              :type="item.inputType ? item.inputType : 'text'"
              :placeholder="item.placeholder || `请输入${item.label}`"
              clearable
              @focus="(e) => issueEvent(e, item.onFocus)"
              @blur="(e) => issueEvent(e, item.onBlur)"
              @change="(e) => issueEvent(e, item.onChange)"
            />
          </yss-form-item>
        </yss-col>
      </yss-row>
    </yss-form>
  </div>
</template>

<script>
  export default {
    name: 'CommonSearchForm',
    props: {
      // 表单项配置
      formConfig: {
        type: Object,
        default: () => {
          return {};
        },
      },
      // 表单项数据
      formDataInit: {
        type: Object,
        default: () => {
          return {};
        },
      },
    },
    data() {
      return {
        formData: this.formDataInit,
        // 记录需要分多少列-后期监听容器宽高时的需要用到
        colSpan: 6,
      };
    },
    methods: {
      //重点在issueEvent函数，可以给事件绑定一个空函数避免报错，如果有外部传入的自定义函数则返回这个函数
      /*组件内函数负责分发表单项事件 */
      issueEvent(value, mouseEvent) {
        if (mouseEvent) {
          return mouseEvent(value);
        }
      },

      getValue() {
        return this.formData;
      },
      reset() {
        this.$refs.formDom.resetFields();
      },
    },
    created() {
      // console.log("formConfig", this.formConfig);
    },
  };
</script>

<style lang="scss" scoped>
  .common-search-form {
    padding: 12px 12px 0;
    border-bottom: 1px solid #f5f5f5;

    .el-form-item {
      display: flex;
      white-space: nowrap;
    }

    /v-deep/ {
      .el-form-item__content {
        flex: auto;
        width: 1px;
      }
    }
  }
</style>
