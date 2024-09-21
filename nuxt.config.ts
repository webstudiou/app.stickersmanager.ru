import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.NODE_ENV !== 'production' },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#007aff' },
        { name: 'theme-color', content: '#ffffff' },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'mask-icon',
          color: '#007aff',
          href: '/safari-pinned-tab.svg',
        },
      ],
    },
  },
  css: ['@/assets/fonts/style.css', '@/assets/sass/style.scss'],
  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
    'nuxt-typed-router',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  auth: {
    globalAppMiddleware: {
      allow404WithoutAuth: true,
      isEnabled: true,
    },
    sessionRefresh: {
      enableOnWindowFocus: true,
      enablePeriodically: 86400000,
    },
    provider: {
      type: 'authjs',
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  piniaPersistedstate: {
    debug: process.env.NODE_ENV !== 'production',
    storage: 'localStorage',
    cookieOptions: {
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'production',
    },
  },
  i18n: {
    baseUrl: process.env.WEB_URL,
    locales: [{ code: 'ru', name: 'Русский', file: 'ru.json' }],
    defaultLocale: 'ru',
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      redirectOn: 'root',
      useCookie: true,
      cookieKey: 'i18n',
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    componentName: 'ColorScheme',
    classSuffix: '',
    storageKey: 'app-design',
    disableTransition: true,
  },
  tailwindcss: {
    configPath: '~/configs/tailwind.config.ts',
    exposeConfig: true,
    editorSupport: process.env.NODE_ENV !== 'production',
    viewer: {
      endpoint: '/sass', exportViewer: process.env.NODE_ENV !== 'production',
    },
  },
  headlessui: {
    prefix: 'hls',
  },
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'ElsForm',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  vite: {
    optimizeDeps: {
      include: ['pusher-js'],
    },
  },
  build: {
    transpile: ['pinia-plugin-persistedstate'],
  },
  nitro: {
    compressPublicAssets: true,
  },
  runtimeConfig: {
    public: {
      appURL: process.env.APP_URL,
      apiURL: process.env.SRV_URL,
    },
  },
})
