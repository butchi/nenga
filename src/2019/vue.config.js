const { BASE_PATH, SITE_ORIGIN, META } = require("./src/assets/constants.json")

const TEMPLATE_PARAMS = {
  SITE_ORIGIN,
  META,
  BASE_PATH,
  BASE_URL: SITE_ORIGIN + BASE_PATH.slice(1),
}

module.exports = {
  // Use `publicPath` so built assets reference the repo subpath on production
  // (BASE_PATH comes from src/assets/constants.json and is like '/nenga/2019/')
  publicPath: BASE_PATH,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@use "@/assets/scss/common.scss" as *;`,
      },
    },
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      return args.map(arg => {
        return Object.assign({}, arg, {
          templateParameters(params) {
            return Object.assign(
              {},
              arg.templateParameters(params),
              TEMPLATE_PARAMS
            )
          },
        })
      })
    })
  },
}
