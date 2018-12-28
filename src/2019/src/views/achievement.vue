<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      | {{ json }}
</template>

<script>
import json from "../data/ioshishi-slot.json";

export default {
  data() {
    return {
      json
    };
  }
};
</script>
