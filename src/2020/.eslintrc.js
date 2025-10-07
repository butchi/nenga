module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['layouts/error.vue'],
      rules: {
        'vue/comment-directive': 'off',
      },
    },
  ],
  // add your custom rules here
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-parens': ['error', 'as-needed'],
  },
}
