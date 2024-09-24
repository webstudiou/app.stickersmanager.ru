// noinspection JSUnusedGlobalSymbols

import { defineNuxtModule, addComponentsDir, addImportsDir, createResolver, addPlugin } from '@nuxt/kit'
import { version } from '../../package.json'
import createTemplates from './templates'

const MODULE_NAME = 'app-ui'

export interface ModuleOptions {
  prefix?: string
  global?: boolean
  safelistColors?: string[]
  disableGlobalStyles?: boolean
  routerOptions?: boolean
  customScrollbars?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: MODULE_NAME,
    version,
    configKey: 'ui',
    compatibility: {
      nuxt: '>=3.10.0',
    },
  },
  defaults: {
    prefix: 'els',
    safelistColors: ['primary'],
    disableGlobalStyles: false,
    routerOptions: undefined as boolean | undefined,
    customScrollbars: true,
  },
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    if (_options.routerOptions || _options.routerOptions === undefined) {
      _nuxt.hook('pages:routerOptions', ({ files }: { files: Array<any> }) => {
        const customRouterOptions = files.find(file => /\/app\/router\.options\.(ts|js)$/.exec(file.path))
        if (_options.routerOptions === undefined && customRouterOptions) {
          console.warn(`You seem to have a custom router.options file \`${customRouterOptions.path}\`\nThe scrollBehavior will be overriden with ui-pro own router.options unless you set \`app-ui: { routerOptions: false }\` in your nuxt.config\nSet \`app-ui: { routerOptions: true }\` to disable this warning`)
        }
        files.push({
          path: resolve('runtime/app/router.options.ts'),
          optional: true,
        })
      })
    }

    if (_options.customScrollbars) {
      addPlugin({
        src: resolve('runtime/plugins/03.scrollbar.client.ts'),
      })

      _nuxt.options.css.push(resolve('runtime/assets/css/scrollbars.css'))
    }

    // Transpile runtime
    const runtimeDir = resolve('./runtime')
    _nuxt.options.build.transpile.push(runtimeDir)

    _nuxt.options.alias['#app-ui'] = runtimeDir

    if (!_options.disableGlobalStyles) {
      _nuxt.options.css.push(resolve(runtimeDir, 'ui.css'))
    }

    // Set defaults
    _nuxt.options.appConfig.ui = {
      primary: 'blue',
      colors: {
        light: {
          red: {
            50: '#fff2f1',
            100: '#ffe1df',
            200: '#ffc8c5',
            300: '#ffa29d',
            400: '#ff6c64',
            DEFAULT: '#ff3b30',
            500: '#ff3b30',
            600: '#ed2015',
            700: '#c8170d',
            800: '#a5170f',
            900: '#881a14',
            950: '#4b0804',
          },
          orange: {
            50: '#fffbea',
            100: '#fff1c5',
            200: '#ffe485',
            300: '#ffcf46',
            400: '#ffb91b',
            DEFAULT: '#ff9500',
            500: '#ff9500',
            600: '#e26e00',
            700: '#bb4a02',
            800: '#983908',
            900: '#7c2f0b',
            950: '#481600',
          },
          yellow: {
            50: '#fffee7',
            100: '#fffec1',
            200: '#fff886',
            300: '#ffec41',
            400: '#ffdb0d',
            DEFAULT: '#ffcc00',
            500: '#ffcc00',
            600: '#d19500',
            700: '#a66a02',
            800: '#89530a',
            900: '#74430f',
            950: '#442304',
          },
          green: {
            50: '#f1fcf3',
            100: '#dff9e5',
            200: '#c0f2cc',
            300: '#8fe6a4',
            400: '#57d175',
            DEFAULT: '#34c759',
            500: '#34c759',
            600: '#22973f',
            700: '#1e7735',
            800: '#1d5e2e',
            900: '#194e28',
            950: '#082b13',
          },
          mint: {
            50: '#eefffc',
            100: '#c6fff8',
            200: '#8efff2',
            300: '#4dfbeb',
            400: '#19e8db',
            DEFAULT: '#00c7be',
            500: '#00c7be',
            600: '#00a4a1',
            700: '#028381',
            800: '#086767',
            900: '#0c5555',
            950: '#003234',
          },
          teal: {
            50: '#effcfc',
            100: '#d6f3f7',
            200: '#b1e8f0',
            300: '#7cd6e4',
            DEFAULT: '#30b0c7',
            400: '#30b0c7',
            500: '#249eb6',
            600: '#20809a',
            700: '#21677d',
            800: '#235667',
            900: '#214858',
            950: '#112e3b',
          },
          cyan: {
            50: '#f1f9fe',
            100: '#e2f2fc',
            200: '#bfe3f8',
            300: '#87cef2',
            DEFAULT: '#32ade6',
            400: '#32ade6',
            500: '#209cd7',
            600: '#127db7',
            700: '#106494',
            800: '#11557b',
            900: '#144766',
            950: '#0d2d44',
          },
          blue: {
            50: '#edfaff',
            100: '#d6f2ff',
            200: '#b5eaff',
            300: '#83dfff',
            400: '#48cbff',
            500: '#1eacff',
            600: '#068eff',
            DEFAULT: '#007aff',
            700: '#007aff',
            800: '#085dc5',
            900: '#0d519b',
            950: '#0e315d',
          },
          indigo: {
            50: '#f0f4fd',
            100: '#e3eafc',
            200: '#ccd7f9',
            300: '#adbcf4',
            400: '#8c99ed',
            500: '#7178e3',
            DEFAULT: '#5856d6',
            600: '#5856d6',
            700: '#4a46bc',
            800: '#3d3b98',
            900: '#363779',
            950: '#202046',
          },
          purple: {
            50: '#fbf6fe',
            100: '#f6eafd',
            200: '#eed8fc',
            300: '#e1baf8',
            400: '#ce8ef2',
            500: '#bb62ea',
            DEFAULT: '#af52de',
            600: '#af52de',
            700: '#9130c0',
            800: '#7a2c9d',
            900: '#63257e',
            950: '#450f5c',
          },
          pink: {
            50: '#fff0f1',
            100: '#ffe2e6',
            200: '#ffcad2',
            300: '#ff9fad',
            400: '#ff6982',
            DEFAULT: '#ff2d55',
            500: '#ff2d55',
            600: '#ed1145',
            700: '#c8083b',
            800: '#a80938',
            900: '#8f0c37',
            950: '#500119',
          },
          gray: {
            DEFAULT: '#8E8E93',
            1: '#8E8E93',
            2: '#AEAEB2',
            3: '#C7C7CC',
            4: '#C7C7CC',
            5: '#E5E5EA',
            6: '#F2F2F7',
          },
        },
        dark: {
          red: {
            50: '#fff2f1',
            100: '#ffe1df',
            200: '#ffc8c5',
            300: '#ffa29d',
            400: '#ff6d64',
            DEFAULT: '#ff453a',
            500: '#ff453a',
            600: '#ed2115',
            700: '#c8170d',
            800: '#a5170f',
            900: '#881a14',
            950: '#4b0804',
          },
          orange: {
            50: '#fffcea',
            100: '#fff3c5',
            200: '#ffe785',
            300: '#ffd346',
            400: '#ffbe1b',
            DEFAULT: '#ff9f0a',
            500: '#ff9f0a',
            600: '#e27300',
            700: '#bb4e02',
            800: '#983c08',
            900: '#7c320b',
            950: '#481800',
          },
          yellow: {
            50: '#fefde8',
            100: '#fffcc2',
            200: '#fff687',
            300: '#ffe943',
            DEFAULT: '#ffd60a',
            400: '#ffd60a',
            500: '#efbe03',
            600: '#ce9300',
            700: '#a46804',
            800: '#88510b',
            900: '#734210',
            950: '#432205',
          },
          green: {
            50: '#f1fcf3',
            100: '#defae4',
            200: '#bef4cb',
            300: '#8beaa2',
            400: '#51d772',
            DEFAULT: '#30d158',
            500: '#30d158',
            600: '#1d9c3d',
            700: '#1a7b32',
            800: '#1a612d',
            900: '#175027',
            950: '#072c12',
          },
          mint: {
            50: '#f0fdfc',
            100: '#cdfaf6',
            200: '#9cf3ed',
            DEFAULT: '#63e6e2',
            300: '#63e6e2',
            400: '#32cfcf',
            500: '#19b1b3',
            600: '#118b90',
            700: '#126f73',
            800: '#13585c',
            900: '#15494c',
            950: '#052a2e',
          },
          teal: {
            50: '#eefdfd',
            100: '#d3f7fa',
            200: '#aceef5',
            300: '#73dfed',
            DEFAULT: '#40cbe0',
            400: '#40cbe0',
            500: '#16aac4',
            600: '#1689a4',
            700: '#186e86',
            800: '#1d5a6d',
            900: '#1c4b5d',
            950: '#0d313f',
          },
          cyan: {
            50: '#f0f9ff',
            100: '#dff3ff',
            200: '#b8e8ff',
            DEFAULT: '#64d2ff',
            300: '#64d2ff',
            400: '#33c6fd',
            500: '#09aeee',
            600: '#008ccc',
            700: '#006fa5',
            800: '#045e88',
            900: '#0a4e70',
            950: '#06314b',
          },
          blue: {
            50: '#edf9ff',
            100: '#d7f0ff',
            200: '#b9e7ff',
            300: '#88daff',
            400: '#50c3ff',
            500: '#28a5ff',
            DEFAULT: '#0a84ff',
            600: '#0a84ff',
            700: '#0a6feb',
            800: '#0f58be',
            900: '#134d95',
            950: '#112f5a',
          },
          indigo: {
            50: '#eff2fe',
            100: '#e2e7fd',
            200: '#cad2fb',
            300: '#aab4f7',
            400: '#888ef1',
            DEFAULT: '#5e5ce6',
            500: '#5e5ce6',
            600: '#5d50db',
            700: '#5041c1',
            800: '#41379c',
            900: '#39337c',
            950: '#221e48',
          },
          purple: {
            50: '#fbf4ff',
            100: '#f5e8ff',
            200: '#ecd0fe',
            300: '#dfaafd',
            400: '#ce78fa',
            DEFAULT: '#bf5af2',
            500: '#bf5af2',
            600: '#9d25d4',
            700: '#841bb0',
            800: '#6e1890',
            900: '#5e1976',
            950: '#3b034f',
          },
          pink: {
            50: '#fff0f1',
            100: '#ffe2e6',
            200: '#ffcad3',
            300: '#ff9fae',
            400: '#ff6983',
            DEFAULT: '#ff375f',
            500: '#ff375f',
            600: '#ed1147',
            700: '#c8083d',
            800: '#a8093a',
            900: '#8f0c38',
            950: '#500119',
          },
          gray: {
            DEFAULT: '#8E8E93',
            1: '#8E8E93',
            2: '#636366',
            3: '#48484A',
            4: '#3A3A3C',
            5: '#2C2C2E',
            6: '#1C1C1E',
          },
        },
      },
      strategy: 'merge',
      header: 65,
      sidebar: {
        master: 65,
        slave: 300,
      },
      rows: 44,
      toolbar: 50,
      footer: 50,
    }

    createTemplates(_nuxt)

    // Plugins
    addPlugin({
      src: resolve(runtimeDir, 'plugins', '01.vars'),
    })
    addPlugin({
      src: resolve(runtimeDir, 'plugins', '02.vars'),
    })
    addPlugin({
      src: resolve(runtimeDir, 'plugins', '04.slideovers'),
    })

    // Components
    await addComponentsDir({
      path: resolve(runtimeDir, 'components'),
      prefix: _options.prefix,
      global: _options.global,
      watch: false,
    })

    // Utils
    addImportsDir(resolve(runtimeDir, 'utils'))

    // Composables
    addImportsDir(resolve(runtimeDir, 'composables'))
  },
})
