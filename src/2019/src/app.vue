<template lang="pug">
v-app
  v-navigation-drawer(v-model='drawer', fixed, app)
    v-list(dense='')
      v-list-tile(@click="")
        v-list-tile-action
          v-icon home
        v-list-tile-content
          v-list-tile-title
            | ホーム
      v-list-tile(@click="")
        v-list-tile-action
          v-icon contact_mail
        v-list-tile-content
          v-list-tile-title
            | 獲得一覧
  v-toolbar(color='primary', dark, fixed, app)
    v-toolbar-side-icon(@click.stop="drawer = !drawer")
    v-toolbar-title
      | イ○シシスロット
  v-content
    v-container(fluid, fill-height)
      v-layout(justify-center, align-center)
        v-flex(text-xs-center)
          | スロット
  v-footer(color='primary', app='')
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
