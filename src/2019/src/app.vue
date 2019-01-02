<template lang="pug">
v-app
  v-navigation-drawer(v-model='drawer', fixed, app)
    v-list(dense)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title
            router-link(to="/")
              | ホーム
      v-list-tile(@click="")
        v-list-tile-action
          v-icon contact_mail
        v-list-tile-content
          v-list-tile-title
            router-link(to="/message")
              | 新年のご挨拶
      v-list-tile(@click="")
        v-list-tile-action
          v-icon contact_mail
        v-list-tile-content
          v-list-tile-title
            router-link(to="/achievement")
              | 獲得一覧
  v-toolbar(color='primary', dark, fixed, app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title
      | イOシシスロット
  v-content
    router-view
  v-footer(color="primary", app)
    v-layout(justify-center)
      span.white--text © IWABUCHI Yu(u)ki 2019
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },
  props: {
    source: String
  }
};
</script>

<style lang="sass">
html
  font-size: 100px

body
  font-size: 0.1rem
</style>
