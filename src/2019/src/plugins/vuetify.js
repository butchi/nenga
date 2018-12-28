import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

// Helpers
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: colors.deepOrange.darken4, // #BF360C
    secondary: colors.deepOrange.lighten4, // #FFCCBC
    accent: colors.orange.base // #FF9800
  }
});
