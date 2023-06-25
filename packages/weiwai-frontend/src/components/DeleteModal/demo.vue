<template>
  <DeleteModal :onOk="onOk">
    <template slot-scope="{open}">
      <el-button type="text" size="mini" @click="open">删除</el-button>
    </template>
  </DeleteModal>
</template>
<script lang="ts">
import Vue from "vue";
import DeleteModal from "@/components/DeleteModal/index.vue";

export default Vue.extend({
  data() {
    return {}
  },
  components: {
    DeleteModal
  },
  methods: {

    onOk(instance: any, done: Function) {
      console.log(instance, 'thisixng')
    },
    onCancel(instance: any, done: Function) {
      console.log(instance, 'thisixng')
    },
  }
})
</script>
