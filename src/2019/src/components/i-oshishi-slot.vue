<template lang="pug">
div
  v-card.slot(width="259", height="64", :data-is-playing="isPlaying", style="margin: 0 auto;")
    span.reel(:style="{ 'background-position': isPlaying ? '' : `0px ${-64 * (iOshishi.index || defaultIndex(0))}px` }")
    span.reel(:style="{ 'background-position': isPlaying ? '' : `-64px ${-64 * (iOshishi.index || defaultIndex(1))}px` }")
    span.reel(:style="{ 'background-position': isPlaying ? '' : `-128px ${-64 * (iOshishi.index || defaultIndex(2))}px` }")
    span.reel(:style="{ 'background-position': isPlaying ? '' : `-192px ${-64 * (iOshishi.index || defaultIndex(3))}px` }")

  v-btn(v-if="!isPlaying", color="primary", @click="start")
    | 回す
  v-btn(v-if="isPlaying", color="primary", @click="stop")
    | 止める


  i-oshishi-card.mb-3(max-width="375", :iOshishi="iOshishi", :countArr="countArr")

  v-layout.collection-index.text-xs-left.mb-2(row wrap, style="margin: 0 auto; max-width: 400px;")
    v-card.collection-item.text-xs-center(v-for="iOshishi in sortedIOshishiArr", :key="iOshishi.no", width="6.25%", :style="{ 'background-color': countColor(countArr[iOshishi.index])}")
      v-responsive.number(aspect-ratio="1", fill-height)
        .item.text-xs-center(style="margin: 0 auto; width: 18px; height: 18px; font-size: 10px; line-height: 18px;")
          | {{ iOshishi.no }}
    v-card.collection-item.text-xs-center(width="6.25%", :style="{ 'background-color': countColor(completeCount)}")
      v-responsive(aspect-ratio="1")
        .item.text-xs-center(style="margin: 0 auto; width: 18px; height: 18px; font-size: 10px; line-height: 18px;")
          v-icon(size="2")
            | fas fa-crown

  .play-count
    | 遊んだ回数: {{ playCount }}

  v-dialog(v-model="dialog", max-width="320")
    i-oshishi-card(:isDialog="true", @close="closeDialog", max-width="375", :iOshishi="iOshishi", :countArr="countArr")
</template>

<script>
import { mapState, mapActions } from "vuex";

import _ from "lodash";
import { sheet } from "../data/ioshishi-slot.json";

import iOshishiCard from "./i-oshishi-card.vue";

export default {
  components: {
    "i-oshishi-card": iOshishiCard
  },
  mounted() {
    this.playCount = parseInt(localStorage.playCount || 0);

    this.start();
  },
  data() {
    return {
      iOshishiArr: Object.values(sheet),
      kuji: null,
      iOshishi: {},
      isPlaying: false,
      playCount: null,
      dialog: false
    };
  },
  computed: {
    ...mapState(["countArr"]),
    pMax() {
      return _.last(this.iOshishiArr).p_acc;
    },
    sortedIOshishiArr() {
      return _.sortBy(this.iOshishiArr, "no");
    },
    completeCount() {
      return _.min(_.drop(this.countArr));
    }
  },
  methods: {
    ...mapActions(["setCountArr"]),
    star(rarity) {
      return {
        0: "★★★★★",
        1: "★★★★",
        2: "★★★",
        3: "★★",
        4: "★"
      }[rarity];
    },
    start() {
      this.isPlaying = true;

      this.kuji = _.random(this.pMax - 1);
    },
    stop() {
      this.isPlaying = false;

      this.playCount++;

      if (this.playCount % 100 === 0) {
        gtag("event", "play", {
          event_category: "Slot",
          event_label: this.playCount
        });
      }

      localStorage.setItem('playCount', this.playCount);

      this.iOshishi = this.iOshishiArr.filter(item => this.kuji < item.p_acc )[0];

      this.setCountArr(this.iOshishi.index);

      if (this.countArr[this.iOshishi.index] < 2) {
        this.dialog = true;
      }
    },
    defaultIndex() {
      return _.random(30) + 1;
    },
    countColor(n) {
      const val = 60 * (1 - Math.pow(0.5, n - 1));
      return n === 0 ? "white" : `hsl(${val}, 100%, 50%)`;
    },
    closeDialog() {
      this.dialog = false;
    }
  },
  watch: {
    completeCount() {
      gtag("event", "complete", {
        event_category: "Slot",
        event_label: this.completeCount
      });
    }
  }
};
</script>

<style lang="sass">
@for $i from 1 through 4
  @keyframes rotate-reel-#{$i}
    0%
      background-position: ($i * 64px) 0px

    100%
      background-position: ($i * 64px) 2048px

.reel
  display: inline-block

  position: relative

  width: 64px
  height: 64px

  background-image: url("../assets/reel.png")
  background-repeat: repeat

  border-left: 1px solid #ccc

  &:first-child
    border: none

.slot[data-is-playing="true"] .reel
  background-image: url("../assets/reel-blur.png")

@for $i from 1 through 4
  .slot[data-is-playing="true"] .reel:nth-of-type(#{$i})
    animation: rotate-reel-#{$i} 1s linear 0s infinite
    animation-delay: -0.1s * $i
</style>
