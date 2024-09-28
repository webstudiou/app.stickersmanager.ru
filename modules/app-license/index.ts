import { consola } from 'consola'
import { colors } from 'consola/utils'
import { defineNuxtModule } from '@nuxt/kit'
import { version } from '../../package.json'
// import { validateLicense } from './license'

const MODULE_NAME = 'app-license'

export interface ModuleOptions {
  license?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: MODULE_NAME,
    version,
    configKey: 'appLicense',
    compatibility: {
      nuxt: '^3.10.0',
    },
  },
  defaults: {
    license: '',
  },
  setup(options, nuxt) {
    const theme = { env: 'WSTUDIOU_LICENSE', link: 'https://wstudiou.ru' }
    const key = process.env[theme.env] || (nuxt.options as any).appLicense?.license
    if (nuxt.options.dev || nuxt.options._prepare || nuxt.options.test) {
      if (nuxt.options.dev && !key) {
        consola.box(
          colors.greenBright('Web Studio U') + '\n\n'
          + `Missing \`${theme.env}\` env variable, please add it to your \`.env\`.` + '\n\n'
          + colors.blueBright(`Purchase license at ${theme.link} to build your app in production.`),
        )
      }
      return
    }
    nuxt.hook('build:before', async () => {
      // await validateLicense({ key, theme, dir: nuxt.options.rootDir })
    })
  },
})
