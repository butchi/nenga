<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      v-card.mb-2(v-for="ioshishi, index in ioshishiArr", :key="ioshishi.index", width="320")
        //- v-img(:src="imageSrc(index)")
        v-card-title(primary-title)
          .card-content
            h3.title
              | {{ ioshishi.name }}
            .rarity
              | {{ star(ioshishi.rarity) }}
            .description
              | {{ ioshishi.description }}
</template>

<script>
import { sheet } from "../data/ioshishi-slot.json";

export default {
  data() {
    return {
      ioshishiArr: Object.values(sheet)
    };
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
