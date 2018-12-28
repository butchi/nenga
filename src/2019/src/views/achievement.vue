<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      v-card(v-for="ioshishi, index in ioshishiArr", :key="ioshishi.index")
        //- v-img(:src="imageSrc(index)")
        v-card-title(primary-title)
          div
            h3.title
              | {{ ioshishi.name }}
            .rarity
              | {{ ioshishi.rarity_str }}
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
    }
  }
};
</script>
