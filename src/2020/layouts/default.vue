<template lang="pug">
  v-app
    v-app-bar(app, fixed, dark)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title.ma-0
        nuxt-link(to="/", style="color: white; text-decoration: inherit;")
          | 子ん子ん子とば
    v-navigation-drawer(v-model="drawer", absolute, temporary)
      v-list(dense)
        v-list-item(
          v-for="item in items"
          :key="item.title"
          link
        )
          v-list-item-icon
            v-icon
              | {{ item.icon }}
          v-list-item-content
            v-list-item-title
              nuxt-link(:to="item.to")
                | {{ item.title }}
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
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'fa-trophy',
          title: 'コレクション',
          to: '/achievement',
        },
        {
          icon: 'fa-envelope',
          title: '新年の挨拶',
          to: '/message',
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
