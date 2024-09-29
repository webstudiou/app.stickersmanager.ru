import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreProjects = defineStore('StoreProjects', {
  state: () => ({
    loading: ref<boolean>(true),
    entries: ref<Portfolios.NavigatorItem[]>([]),
    entry: ref<Projects.Project>(),
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
    favourites(state) {
      const items: Portfolios.NavigatorItem[] = []

      function recs(i: Portfolios.NavigatorItem) {
        if (i.favourite) items.push(i)

        if (i.children) {
          i.children.forEach(j => recs(j))
        }
      }

      state.entries.forEach(i => recs(i))

      return items
    },
  },
  persist: true,
},
)
