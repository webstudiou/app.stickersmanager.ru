import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreConfigs = defineStore('StoreConfigs', {
  state: () => ({
    loading: ref<boolean>(true),
    service: ref<'dashboard' | 'knowledge' | 'staff' | 'settings' | 'storage' | 'me'>('dashboard'),
    configs: ref<Config>(),
  }),
  actions: {
    async init() {
      await $fetch<D_Config>('/api/configs')
        .then(res => this.configs = res.data)
        .catch(e => useErrorHandler(e))
        .finally(() => this.loading = false)
    },
  },
  getters: {
    app: state => state.configs?.app,
    org: state => state.configs?.org,
  },
  persist: true,
},
)
