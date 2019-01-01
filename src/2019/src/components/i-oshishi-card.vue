<template lang="pug">
v-card.sm12(style="margin: 0 auto;")
  v-img(:src="isHidden ? 'https://placehold.it/8x1' : imgSrc")
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
      h3.title.mb-3(v-if="isHidden")
        | ？？？？
      h3.title.mb-3(v-else)
        v-badge
          span(v-if="countArr[iOshishi.index] > 1" slot="badge")
            | {{ countArr[iOshishi.index] }}
          span
            | {{ iOshishi.name || "？？？？" }}
      p.grey--text.description(v-if="isHidden")
        | 未開放
      p.grey--text.description(v-else, style="min-height: 3em;")
        | {{ iOshishi.description || "ここに説明が入ります" }}
  v-card-actions.share(v-if="!isHidden && iOshishi.friendly_id")
    v-layout(row, justify-center)
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
        v-icon.mr-2(size="22")
          | fab fa-line
        span.caption
          | 送る
  v-card-actions(v-if="isDialog")
    v-layout(justify-center)
      v-btn(flat, small, @click="$emit('close')")
        v-icon
          | close
        | 閉じる
</template>

<script>
export default {
  props: {
    iOshishi: Object,
    countArr: Array,
    isHidden: Boolean,
    isDialog: Boolean
  },
  computed: {
    imgSrc() {
      if (!this.iOshishi.friendly_id) {
        return "./ogp.png";
      }
      return `./i-oshishi/${this.iOshishi.friendly_id}.png`;
    }
  }
};
</script>
