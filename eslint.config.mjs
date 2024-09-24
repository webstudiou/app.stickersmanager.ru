import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 3 },
      },
    ],
  },
})
  .overrideRules({
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off',
    'import/first': 'off',
  })
