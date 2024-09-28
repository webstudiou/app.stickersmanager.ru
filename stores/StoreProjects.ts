import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreProjects = defineStore('StoreProjects', {
  state: () => ({
    loading: ref<boolean>(true),
    entries: ref<Portfolios.NavigatorItem[]>([]),
    filters: ref<Record<string, string | number | boolean>>(
      { archive: false },
    ),
  }),
  actions: {
    async init() {
      this.loading = true
      this.entries = []

      await $fetch<Portfolios.D_NavigatorItems>('/api/dashboard/browser/portfolio/navigator')
        .then(res => this.entries = this.entries.concat(res.data.data))
        .catch(e => useErrorHandler(e))
        .finally(() => this.loading = false)
    },
  },
  getters: {

  },
  persist: true,
},
)
