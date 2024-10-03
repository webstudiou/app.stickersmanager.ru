import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorHandler } from '~/composables'

export const useStoreAuth = defineStore('StoreAuth', {
  state: () => ({
    loading: ref<boolean>(true),
    user: ref<Users.User>(),
  }),
  actions: {
    async init() {
      this.loading = true

      await $fetch<Users.D_User>('/api/me/init')
        .then((res) => {
          this.user = res.data

          if (import.meta.client) {
            window.localStorage.setItem('nuxt-app-ui-root', this.user.data.relationships.settings.data.attributes.color)

            const switcher = useColorMode()
            switcher.preference = this.user.data.relationships.settings.data.attributes.theme
          }
        })
        .catch(e => useErrorHandler(e))
        .finally(() => this.loading = false)
    },
    async signout() {
      const { signOut } = useAuth()

      await $fetch('/api/sign-out', { method: 'POST' }).finally(async () => {
        await signOut()
        window.localStorage.clear()
        window.sessionStorage.clear()
      })
    },
  },
  getters: {
    settings: state => <Users.Setting>state.user?.data.relationships.settings || undefined,
    dashboard: state => <Dashboards.Dashboard>state.user?.data.relationships.dashboard || undefined,
    subscription: state => <Subscriptions.Subscription>state.user?.data.relationships.dashboard.data.relationships.subscription || undefined,
  },
  persist: true,
},
)
