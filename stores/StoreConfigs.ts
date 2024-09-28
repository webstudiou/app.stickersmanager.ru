import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreConfigs = defineStore('StoreConfigs', {
  state: () => ({
    loading: ref<boolean>(true),
    service: ref<'dashboard' | 'knowledge' | 'staff' | 'settings' | 'storage' | 'me'>('dashboard'),
    browser: ref<'default' | 'month' | 'week' | 'gantt' | 'matrix'>('week'),
    columns: ref<StickerBrowserDefaultColumns>([
      { key: 'title', visible: true, width: 350 },
      { key: 'project', visible: true, width: 175 },
      { key: 'board', visible: true, width: 175 },
      { key: 'column', visible: true, width: 175 },
      { key: 'executor', visible: true, width: 175 },
      { key: 'dates', visible: true, width: 175 },
      { key: 'priority', visible: true, width: 125 },
      { key: 'tags', visible: true, width: 225 },
    ]),
    configs: ref<Config>(),
  }),
  actions: {
    async init() {
      this.loading = true

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
