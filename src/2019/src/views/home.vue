<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center)
    v-flex(text-xs-center)
      i-oshishi-slot
</template>

<script>
import iOshishiSlot from "../components/i-oshishi-slot.vue";

export default {
  components: {
    "i-oshishi-slot": iOshishiSlot
  }
};
</script>
