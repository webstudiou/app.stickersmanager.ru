import { useStoreConfigs } from '~/stores'

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return

  const indicator = useLoadingIndicator()
  const nuxtApp = useNuxtApp()

  nuxtApp.hook('page:start', () => {
    indicator.start()
  })

  nuxtApp.hook('page:transition:finish', () => {
    indicator.finish()
  })

  nuxtApp.hook('page:finish', () => {
    if (to.path !== from.path && history.state.scroll) {
      setTimeout(() => window.scrollTo(history.state.scroll), 0)
    }
    else {
      setTimeout(() => window.scrollTo(0, 0), 0)
    }

    const path = String(to.name).split('-')
    const storeConfigs = useStoreConfigs()

    switch (path[0]) {
      default: {
        storeConfigs.service = 'dashboard'
        break
      }
      case 'knowledge': {
        storeConfigs.service = 'knowledge'
        break
      }
      case 'storage': {
        storeConfigs.service = 'storage'
        break
      }
      case 'staff': {
        storeConfigs.service = 'staff'
        break
      }
      case 'me': {
        storeConfigs.service = 'me'
        break
      }
      case 'settings': {
        storeConfigs.service = 'settings'
        break
      }
    }
  })
})
