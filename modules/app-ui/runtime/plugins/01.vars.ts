import { defineNuxtPlugin, useAppConfig, useNuxtApp, useHead } from '#imports'
import { hexToRgb } from '#app-ui/utils'

export default defineNuxtPlugin(() => {
  const appConfig: UI = useAppConfig()
  const nuxtApp = useNuxtApp()

  const root = computed(() => {
    return `:root {
            --header-height: ${appConfig.ui.header}px;
            --toolbar-height: ${appConfig.ui.toolbar}px;
            --sidebar-master-width: ${appConfig.ui.sidebar.master}px;
            --sidebar-slave-width: ${appConfig.ui.sidebar.slave}px;
            --footer-height: ${appConfig.ui.footer}px;
            --row-min-height: ${appConfig.ui.rows}px;
            
            --color-backgrounds-master: ${hexToRgb('#0f172a')};
            --color-backgrounds-primary: ${hexToRgb('#fff')};
            --color-backgrounds-secondary: ${hexToRgb('#e2e8f0')};
            --color-backgrounds-tertiary: ${hexToRgb('#fff')};
            
            ${Object.entries(appConfig.ui.colors.light.red).map(([key, value]) => `--color-red-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.orange).map(([key, value]) => `--color-orange-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.yellow).map(([key, value]) => `--color-yellow-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.green).map(([key, value]) => `--color-green-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.mint).map(([key, value]) => `--color-mint-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.teal).map(([key, value]) => `--color-teal-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.cyan).map(([key, value]) => `--color-cyan-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.blue).map(([key, value]) => `--color-blue-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.indigo).map(([key, value]) => `--color-indigo-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.purple).map(([key, value]) => `--color-purple-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.pink).map(([key, value]) => `--color-pink-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.gray).map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.light.blue).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value as string)};`).join('\n')}
            
            --separators-alpha: 34%;
            --color-separators-opaque: ${hexToRgb('#C6C6C8')};
            --color-separators-non-opaque: ${hexToRgb('#545456')};
            
            --color-labels-primary: ${hexToRgb('#000')};
            --color-labels-base: ${hexToRgb('#3C3C43')};
            --color-labels-secondary: var(--color-labels-base);
            --color-labels-tertiary: var(--color-labels-base);
            --labels-quarternary-alpha: 18%;
            --color-labels-quarternary: var(--color-labels-base);
    }

        .dark {
            --color-backgrounds-master: ${hexToRgb('#000')};
            --color-backgrounds-primary: ${hexToRgb('#000')};
            --color-backgrounds-secondary: ${hexToRgb('#1C1C1E')};
            --color-backgrounds-tertiary: ${hexToRgb('#2C2C2E')};
            
            ${Object.entries(appConfig.ui.colors.dark.red).map(([key, value]) => `--color-red-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.orange).map(([key, value]) => `--color-orange-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.yellow).map(([key, value]) => `--color-yellow-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.green).map(([key, value]) => `--color-green-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.mint).map(([key, value]) => `--color-mint-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.teal).map(([key, value]) => `--color-teal-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.cyan).map(([key, value]) => `--color-cyan-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.blue).map(([key, value]) => `--color-blue-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.indigo).map(([key, value]) => `--color-indigo-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.purple).map(([key, value]) => `--color-purple-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.pink).map(([key, value]) => `--color-pink-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.gray).map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value as string)};`).join('\n')};
            ${Object.entries(appConfig.ui.colors.dark.blue).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value as string)};`).join('\n')}
            
            --separators-alpha: 60%;
            --color-separators-opaque: ${hexToRgb('#38383A')};
            
            --color-labels-primary: ${hexToRgb('#fff')};
            --color-labels-base: ${hexToRgb('#EBEBF5')};
            --labels-quarternary-alpha: 16%;
        }`
  })

  // Head
  const headData: any = {
    style: [{
      innerHTML: () => root.value,
      tagPriority: -2,
      id: 'nuxt-app-ui-colors',
    }],
  }

  // SPA mode
  if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
    const style = document.createElement('style')

    style.innerHTML = root.value
    style.setAttribute('data-nuxt-app-ui-colors', '')
    document.head.appendChild(style)

    headData.script = [{
      innerHTML: 'document.head.removeChild(document.querySelector(\'[data-nuxt-app-ui-colors]\'))',
    }]
  }

  useHead(headData)
})
