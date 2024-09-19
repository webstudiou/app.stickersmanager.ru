import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(

)
  .overrideRules({
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/multi-word-component-names': 'off',
    'import/first': 'off',
  })
