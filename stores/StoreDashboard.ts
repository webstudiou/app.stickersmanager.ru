import { defineStore } from 'pinia'
import debounce from 'lodash/debounce'
import { useErrorHandler } from '~/composables'

export const useStoreDashboard = defineStore('StoreDashboard', {
  state: () => ({
    entries: ref<Dashboards.NavigatorItem[]>([]),
    loading: ref<boolean>(true),
  }),
  actions: {
    init(): Promise<void> {
      this.loading = true
      this.entries = []

      return new Promise<void>((resolve) => {
        $fetch('/api/dashboard/init')
          .then((res) => {
            this.entries = this.entries.concat(res.data)
          })
          .catch(e => useErrorHandler(e))
          .finally(() => {
            this.loading = false
            resolve()
          })
      })
    },

    change(id: string): Promise<void> {
      return new Promise<void>(() => {
        $fetch<api.MetApiResponse>('/api/me/settings', {
          method: 'PATCH', body: {
            name: 'dashboard_id',
            value: id,
          },
        })
          .then(async () => await redirect())
          .catch(e => useErrorHandler(e))
      })
    },

    /* refresh_entries(): Promise<void> {
      this.entries = []

      return new Promise<void>((resolve) => {
        $fetch('/api/dashboard/init').then((res) => {
          this.entries = this.entries.concat(res.data.data.dashboards)
        })

        resolve()
      })
    },

    changes: debounce((param: string, val: string) => {
      return new Promise<void>((resolve, reject) => {
        if (val === '' || val === ' ' || typeof val === 'object') resolve()

        $fetch<api.MetApiResponse>('/api/dashboard/settings', {
          method: 'PATCH', body: {
            name: param,
            value: val,
          },
        })
          .catch(() => {
            reject()
          })

        resolve()
      })
    }, 300), */
  },
  getters: {
    // subscription: state => state.current.data.relationships.subscription,
  },
  persist: true,
})
