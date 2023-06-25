<template>
  <div id="system-manage-micro-app-container"></div>
</template>

<script lang="ts">
import { mapMutations, mapState } from 'vuex';
import store from '@/store';
export default {
  name: 'SystemManageView',
  data() {
    return {
      observer: null,
    };
  },
  computed: {
    ...mapState('systemManageModule', ['systemManageMicroAppStyles']),
  },
   beforeCreate() {
    try {
      const systemManageMicroAppStyles =
        store?.state?.['systemManageModule']?.systemManageMicroAppStyles;
      if (systemManageMicroAppStyles?.length) {
        window?.location?.reload();
      }
    } catch (error) {
      console.error(error);
    }
  },
  mounted() {
    const microAppContainer = document.getElementById('microAppContainer');
    this.observer = new MutationObserver(this.handleUpdataStyle);
    this.observer.observe(microAppContainer, { childList: true });
    this.handleUpdataStyle();
  },
  beforeRouteLeave(to, from, next) {
    try {
      const qiankunHeadStyles = document.querySelectorAll('qiankun-head style') || [];
      if (qiankunHeadStyles?.length) {
        const newVal = [...this.systemManageMicroAppStyles, ...Array.from(qiankunHeadStyles)];
        this.setSystemManageMicroAppStyles(newVal);
      }
    } catch (error) {
      console.error(error);
    } finally {
      next();
    }
  },

  methods: {
    ...mapMutations('systemManageModule', ['setSystemManageMicroAppStyles']),
    handleUpdataStyle() {
      try {
        const microAppContainer = document.getElementById('microAppContainer');
        const qiankunHead = microAppContainer.querySelectorAll('qiankun-head')?.[0];
        if (!qiankunHead) return;
        this.systemManageMicroAppStyles.forEach((systemManageStyle) => {
          qiankunHead?.appendChild(systemManageStyle);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  destroyed() {
    this.observer = null;
  },
};
</script>
