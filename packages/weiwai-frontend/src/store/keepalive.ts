import { defineStore } from 'pinia'

export default defineStore('keepalive', {
  state: () => {
    return {
      keepalive: []
    }
  },
  persist: true,
  getters: {
    getKeepalive: (state) => state.keepalive
  },
  actions: {
    setKeepalive(keepalive:Array<string>) {
      this.keepalive = keepalive
    },
    clearKeepalive(clearnArr:Array<string>){
      this.keepalive = this.keepalive.filter(item => !clearnArr.includes(item))
    }
  }
})
