import { useNuxt, addTemplate } from '@nuxt/kit'

export default function createTemplates(nuxt = useNuxt()) {
  const template = addTemplate({
    filename: 'app-ui.colors.mjs',
    getContents: () => `export default ${JSON.stringify(nuxt.options.appConfig.ui.colors)};`,
    write: true,
  })
  const typesTemplate = addTemplate({
    filename: 'app-ui.colors.d.ts',
    getContents: () => `declare module '#app-ui-colors' { const defaultExport: ${JSON.stringify(nuxt.options.appConfig.ui.colors)}; export default defaultExport; }`,
    write: true,
  })

  nuxt.options.alias['#app-ui-colors'] = template.dst

  nuxt.hook('prepare:types', (opts) => {
    opts.references.push({ path: typesTemplate.dst })
  })
}
