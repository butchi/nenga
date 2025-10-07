<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      message-card
</template>

<script>
import messageCard from "../components/message-card.vue";

export default {
  components: {
    "message-card": messageCard,
  },
};
</script>
