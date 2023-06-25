<!-- 分页选择器 -->
<template>
  <el-row>
    <el-col :span="24">
      <el-select
        ref="fuzzySearch"
        v-model="value"
        filterable
        clearable
        multiple
        remote
        collapse-tags
        reserve-keyword
        automatic-dropdown
        placeholder="请选择"
        value-key="code"
        name="Fuzzy"
        :style="'width:100%'"
        :remote-method="remoteMethod"
        @focus="blurValue"
        @change="changeValue"
        @clear="handlClear"
        @input.native="inputValue"
      >
        <el-option v-for="item in dataList" :key="item.code" :label="item.name" :value="item.code">
        </el-option>
        <el-col v-if="showPagination" :span="24">
          <div class="bottomPage">
            <el-pagination
              :current-page="entityPageInfo.pageNum"
              :page-size="entityPageInfo.pageSize"
              layout="total, prev, pager, next"
              :total="entityPageInfo.total"
              @current-change="handleCurrentChangeOrg"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-select>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'SelectPage',
  // 接收参数
  props: {
    // 请求地址
    getPageInfo: {
      type: Object,
      require: true,
      default: () => {
        return {
          pageNum: 1,
          pageSize: 6,
          total: 0
        }
      }
    },
    // el-option label展示字段名
    selectLabel: {
      type: String,
      default: 'name'
    },
    // 绑定select值
    selectVal: {
      type: [Array, String],
      default: () => []
    },
    // 绑定opiton值
    dataList: {
      type: Array,
      default: () => []
    },
    showPagination: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  data() {
    return {
      entityPageInfo: this.getPageInfo,
      value: [],
      isChange: false,
      isBlur: false,
      blurString: ''
    }
  },
  watch: {
    selectVal: {
      handler(nv) {
        this.value = nv
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 翻页
    handleCurrentChangeOrg(val) {
      // val获取点击页数，赋值刷新接口数据
      this.isChange = true
      this.entityPageInfo.pageNum = val
      this.$emit('handleCurrentChangeOrg', val)
    },
    changeValue(e) {
      this.isChange = true
      // e获取选择code 给父页面
      this.$emit('selectPageChange', e, this.$refs.fuzzySearch)
      if (!e || e.length === 0) {
        this.$nextTick(() => {
          this.$refs.fuzzySearch.focus()
        })
      }
    },
    blurValue(event) {
      this.isBlur = false
      const input = document.getElementsByClassName('el-select__input')
      input[0].style.caretColor = 'auto'
      this.$refs.fuzzySearch.$refs.input.blur = () => {
        this.$emit('onBlurValue', event)
        this.$refs.fuzzySearch.blur()
        this.isBlur = true
      }
    },
    remoteMethod(query) {
      this.$emit('getRemoteMethod', query)
    },
    handlClear() {
      this.isChange = true
      this.$emit('handlClear')
    },
    inputValue(e) {
      if (this.isBlur) {
        this.$refs.fuzzySearch.focus()
      }
    }
  }
}
</script>
<style scoped>
.bottomPage {
  display: flex;
  margin-bottom: 10px;
}
</style>
