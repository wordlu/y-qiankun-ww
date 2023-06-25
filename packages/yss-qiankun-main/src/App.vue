<template>
  <div>
    <div>
      主项目：下面的是子项目
    </div>
    <div id="yourContainer2"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'MyComponent',
  props: {
    title: String,
    content: String
  },
  methods: {
    tt(){
    },
    onClick() {
      this.tt()
    }
  }
});
</script>
