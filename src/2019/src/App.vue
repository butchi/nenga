<template lang="pug">
v-app
  v-content
    #nav
      router-link(to="/") Home
      router-link(to="/about") About
    router-view
</template>
