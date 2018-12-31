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
              v-icon(v-if="iOshishi.star", v-for="i in iOshishi.star", :key="i")
                | star
          v-flex(xs12, text-xs-right, flexbox)
            span.information
              | No. {{ iOshishi.no || "?" }}
              | [{{ iOshishi.rarity_str || "?" }}]
    v-card-title.text-xs-left(primary-title)
      .card-content
        h3.title.mb-3
          v-badge
            span(v-if="countArr[iOshishi.index] > 1" slot="badge")
              | {{ countArr[iOshishi.index] }}
            span
              | {{ iOshishi.name || "？？？？" }}
        p.grey--text.description(style="min-height: 3em;")
          | {{ iOshishi.description || "スロットを回そう！" }}
    v-card-actions
      .share(v-if="iOshishi.friendly_id")
        v-btn(color="#55acee", small, dark)
          v-icon.mr-2(size="16")
            | fab fa-twitter
          span.caption
            | ツイート
        v-btn(color="#3B5998", small, dark)
          v-icon.mr-2(size="20")
            | fab fa-facebook
          span.caption
            | シェア
        v-btn(color="#00b900", small, dark)
          v-icon.mr-2(size="20")
            | fab fa-line
          span.caption
            | 送る

  v-layout.collection-index.text-xs-left.mb-2(row wrap, style="margin: 0 auto; max-width: 375px;")
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
    v-card.sm12(style="margin: 0 auto;")
      v-img(src="//placehold.it/1200x630")
        v-container(fill-height, fluid)
          v-layout(fill-height, align-end, justify-space-between)
            v-flex(xs12, text-xs-left, flexbox)
              .rarity
                v-icon(v-if="iOshishi.star", v-for="i in iOshishi.star", :key="i")
                  | star
            v-flex(xs12, text-xs-right, flexbox)
              span.information
                | No. {{ iOshishi.no || "?" }}
                | [{{ iOshishi.rarity_str || "?" }}]
      v-card-title.text-xs-left(primary-title)
        .card-content
          h3.title.mb-3
            v-badge
              span(v-if="countArr[iOshishi.index] > 1" slot="badge")
                | {{ countArr[iOshishi.index] }}
              span
                | {{ iOshishi.name || "？？？？" }}
          p.grey--text.description(style="min-height: 3em;")
            | {{ iOshishi.description || "スロットを回そう！" }}
      v-card-actions
        v-layout(justify-center)
          v-btn(flat, small, @click="dialog = false")
            v-icon
              | close
            | 閉じる
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
      playCount: 0,
      dialog: false
    };
  },
  computed: {
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

      this.countArr.splice(this.iOshishi.index, 1, this.countArr[this.iOshishi.index] + 1);

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
    test() {
      console.log(5);
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
