<template>
  <div>
    <el-button @click="dialog = !dialog">新增</el-button>
    <Drawer title="新增" :min="true" :dialog="dialog" :onOpen="onOpen" :onCLose="onClose">
      <template>
        <el-form :model="form" label-position="top" :rules="rules">
          <el-form-item label="活动名称" prop="name">
            <el-input size="mini" v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select size="mini" v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" prop="name2">
            <el-input size="mini" v-model="form.name2" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="footBtn">
        <div>
          <el-button @click="onCancel">取 消</el-button>
          <el-button type="primary" @click="onOk" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </template>
    </Drawer>
  </div>
</template>
<script lang="ts">
import Drawer from "@/components/Drawer/index.vue";
export default {
  data() {
    return {
      loading: false,
      dialog: false,
      form: {
        name: '',
        name2: '',
        region: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
      },
      timer: null,
    }
  },
  components: {
    Drawer,
  },
  methods: {
    // 抽屉打开 函数
    onOpen() {
      this.dialog = true;
    },
    // 抽屉关闭 函数
    onClose() {
      this.dialog = false;
    },
    onCancel() {
      this.loading = false;
      this.onClose()
    },
    onOk() {
      this.loading = true;
    }
  }
}
</script>
