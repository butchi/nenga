<template lang="pug">
  v-app
    v-app-bar(app, fixed, dark)
      v-toolbar-title.ma-0
        nuxt-link(to="/", style="color: white; text-decoration: inherit;")
          | 子ん子ん子とば
    nuxt
    v-footer
      p.caption.mb-0
        | 子とばがすこ子へんですけどゆる子てください。
      p.caption.mb-0
        | &copy; IWABUCHI Yu(u)ki butchi
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css'

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
