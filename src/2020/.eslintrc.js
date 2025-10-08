module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'prettier', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['layouts/error.vue'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
    // Disable multi-word requirement for Nuxt pages/layouts (single-word names are common)
    {
      files: ['layouts/*.vue', 'pages/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'as-needed'],
  },
}
