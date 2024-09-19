import { defineNuxtPlugin, useAppConfig, useNuxtApp, useHead } from '#imports'
import { get, hexToRgb } from '#app-ui/utils'

export default defineNuxtPlugin({
  enforce: 'post',
  setup() {
    const appConfig = useAppConfig()
    const nuxtApp = useNuxtApp()

    const root = computed(() => {
      const primary_light: Record<string, string> | undefined = get(appConfig.ui.colors.light, appConfig.ui.primary)
      const primary_dark: Record<string, string> | undefined = get(appConfig.ui.colors.dark, appConfig.ui.primary)

      return `:root {
                    ${Object.entries(primary_light || appConfig.ui.colors.light.blue).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`).join('\n')}
                }
        
                .dark {
                    ${Object.entries(primary_dark || appConfig.ui.colors.dark.blue).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`).join('\n')}
                }
            `
    })

    const headData: any = {
      style: [{
        innerHTML: () => root.value,
        tagPriority: -2,
        id: 'nuxt-app-ui-variables',
      }],
    }

    // SPA mode
    if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
      const style = document.createElement('style')

      style.innerHTML = root.value
      style.setAttribute('data-nuxt-app-ui-variables', '')
      document.head.appendChild(style)

      headData.script = [{
        innerHTML: 'document.head.removeChild(document.querySelector(\'[data-nuxt-app-ui-variables]\'))',
      }]
    }

    useHead(headData)

    if (import.meta.client) {
      watch(root, () => {
        window.localStorage.setItem('nuxt-ui-root', root.value)
      })

      appConfig.ui.primary = window.localStorage.getItem('nuxt-app-ui-primary') || appConfig.ui.primary
    }
    if (import.meta.server) {
      useHead({
        script: [
          {
            innerHTML: `
                if (localStorage.getItem('nuxt-app-ui-root')) {
                  document.querySelector('style#nuxt-app-ui-colors').innerHTML = localStorage.getItem('nuxt-app-ui-root')
                }`.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1,
          },
        ],
      })
    }
  },
})
