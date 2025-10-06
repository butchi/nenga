<template lang="pug">
v-container(fluid, fill-height)
  v-layout(justify-center, align-center)
    v-flex(text-xs-center)
      div(v-for="iOshishi in sortedIOshishiArr")
        i-oshishi-card.mb-3(max-width="375", :isHidden="countArr[iOshishi.index] < 1", :iOshishi="iOshishi", :countArr="countArr")

      v-dialog(v-model="dialogClearHistory")
        v-btn(slot="activator", color="warning")
          | プレイ履歴削除
        v-card
          v-card-title(justify-center)
            p
              | すべてのプレイ履歴が消えます。よろしいですか？
          v-card-actions
            v-layout(justify-center)
              v-btn(@click="dialogClearHistory = false")
                | いいえ
              v-btn(color="warning", @click="dialogOk")
                | はい
</template>

<script>
import { mapState, mapActions } from "vuex";

import iOshishiCard from "../components/i-oshishi-card.vue";

import { sheet } from "../data/ioshishi-slot.json";
import _ from 'lodash';

export default {
  components: {
    "i-oshishi-card": iOshishiCard
  },
  data() {
    return {
      iOshishiArr: Object.values(sheet),
      dialogClearHistory: false
    };
  },
  computed: {
    ...mapState(["countArr"]),
    sortedIOshishiArr() {
      return _.sortBy(this.iOshishiArr, "no");
    },
  },
  methods: {
    ...mapActions(["clearHistory"]),
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
    },
    dialogOk() {
      this.clearHistory();

      this.dialogClearHistory = false;
    }
  }
};
</script>
