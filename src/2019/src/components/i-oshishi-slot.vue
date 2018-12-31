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


  v-card.sm12.mb-3(max-width="375", style="margin: 0 auto;")
    v-img(src="//placehold.it/1200x630")
      v-container(fill-height, fluid)
        v-layout(fill-height, align-end, justify-space-between)
          v-flex(xs12, text-xs-left, flexbox)
            .rarity
              v-icon(v-if="iOshishi.star", v-for="i in new Array(iOshishi.star).fill(1)", :key="i")
                | star
          v-flex(xs12, text-xs-right, flexbox)
            span.information
              | No. {{ iOshishi.no || "?" }}
              | [{{ iOshishi.rarity_str || "?" }}]
    v-card-title.text-xs-left(primary-title)
      .card-content
        h3.title
          v-badge
            span(v-if="countArr[iOshishi.index] > 1" slot="badge")
              | {{ countArr[iOshishi.index] }}
            span
              | {{ iOshishi.name || "？？？？" }}
        p.grey--text.description(style="min-height: 3em;")
          | {{ iOshishi.description || "スロットを回そう！" }}
    v-card-actions
      v-btn(color="blue")
        | Share

  .collection-index.text-xs-left.mb-2(style="margin: 0 auto; max-width: 375px")
    v-card.collection-item.text-xs-center(v-for="iOshishi in sortedIOshishiArr", :key="iOshishi.index", width="6.25%", :style="{ 'display': 'inline-block', 'background-color': countColor(countArr[iOshishi.index])}")
      .box(style="padding-top: 100%;")
      .center-box(style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; margin: auto; width: 20px; height: 20px; font-size: 10px; line-height: 20px;")
        .number(style="position: absolute; left: 0; top: 0; width: 100%; height: 100%;")
        | {{ iOshishi.no }}

  .play-count
    | 遊んだ回数: {{ playCount }}
</template>

<script>
import _ from "lodash";
import { sheet } from "../data/ioshishi-slot.json";

export default {
  data() {
    return {
      iOshishiArr: Object.values(sheet),
      kuji: null,
      iOshishi: {},
      isPlaying: false,
      countArr: new Array(32).fill(0),
      playCount: 0
    };
  },
  computed: {
    pMax() {
      return _.last(this.iOshishiArr).p_acc;
    },
    sortedIOshishiArr() {
      return _.sortBy(this.iOshishiArr, "no");
    }
  },
  methods: {
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

      this.playCount++;
    },
    stop() {
      this.isPlaying = false;

      this.iOshishi = this.iOshishiArr.filter(item => this.kuji < item.p_acc )[0];

      this.countArr[this.iOshishi.index]++;
    },
    defaultIndex() {
      return _.random(30) + 1;
    },
    countColor(n) {
      const val = 60 * (1 - Math.pow(0.5, n - 1));
      return n === 0 ? "white" : `hsl(${val}, 100%, 50%)`;
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
