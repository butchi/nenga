<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      div(v-for="iOshishi in sortedIOshishiArr")
        i-oshishi-card.mb-3(max-width="375", :isHidden="countArr[iOshishi.index] < 1", :iOshishi="iOshishi", :countArr="countArr")
</template>

<script>
import { mapState } from "vuex";

import iOshishiCard from "../components/i-oshishi-card.vue";

import { sheet } from "../data/ioshishi-slot.json";

export default {
  components: {
    "i-oshishi-card": iOshishiCard
  },
  data() {
    return {
      iOshishiArr: Object.values(sheet)
    };
  },
  computed: {
    ...mapState(["countArr"]),
    sortedIOshishiArr() {
      return _.sortBy(this.iOshishiArr, "no");
    },
  },
  methods: {
    imageSrc(index) {
      return `img/${this.ioshishiArr[index].friendly_id}.png`;
    },
    star(rarity) {
      return {
        0: "★★★★★",
        1: "★★★★",
        2: "★★★",
        3: "★★",
        4: "★"
      }[rarity];
    }
  }
};
</script>
