<template lang="pug">
v-card.sm12(max-width="400", style="margin: 0 auto;")
  v-card-title.text-xs-left(primary-title)
    h3.title.mb-3.red--text
      | あけま子ておめでとうございます。
  v-card-text.text-xs-left
    .description.mb-3
      p.caption.mb-2
        | 昨年もありがとうございました。
        br
        | お陰様で大変面白い一年となったので、苦境を乗り越えてもっと面白い一年となるよう楽しんでまいります。
        br
        | 本コンテンツのごとく、言語（言葉、コトダマ）で勝負です。
      p.caption
        | 昨年は年賀コンテンツがなかなか思いつかず、年の瀬の入浴中に降ってきたアイデアがここまで育ちました。
        br
        | 亥年に引き続きガチャっぽいコンテンツなので、いっぱい引いてみてください。
    p.mb-3
      | 令和2年1月1日  岩淵 勇樹
  v-card-actions(v-if="isDialog")
    v-layout(justify-center)
      v-btn(color="grey", @click="$emit('start')")
        | さっそく遊ぶ
</template>

<script>
export default {
  props: {
    isDialog: Boolean,
  },
};
</script>
