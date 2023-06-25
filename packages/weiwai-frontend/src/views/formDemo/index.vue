<template>
  <div>
    <BaseForm
      :form-data="formData"
      :set-options="setOptions"
      @inquire="inquire"
    />
  </div>
</template>

<script lang="ts">
import BaseForm from "@/components/BaseForm/index.vue";
import { formData } from "./data";

export default {
  name: "test-demo",
  data() {
    return {
      msg: "hahah",
      setOptions: {},
      formData,
    };
  },
  created() {
    console.log("this is wodelu test");
  },
  methods: {
    inquire(data: any) {
      console.log(data);
    },
  },
  components: {
    BaseForm,
  },
};
</script>
