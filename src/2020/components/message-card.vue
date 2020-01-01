<template lang="pug">
v-card.sm12(max-width="400", style="margin: 0 auto;")
  v-tabs(v-model="tab")
    v-tab.caption
      | あいさつ
    v-tab.caption
      | 子ん子ん子とばとは？
  v-tabs-items(v-model="tab")
    v-tab-item
      v-card
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
              | 昨年は年賀コンテンツがなかなか思いつかず、年の瀬の入浴中に降ってきたアイデアが急激にここまで育ちました。
              br
              | 亥年に引き続きガチャっぽいコンテンツなので、いっぱい引いてみてください。
          p.mb-3
            | 令和2年1月1日  岩淵 勇樹
        v-card-actions(v-if="isDialog")
          v-layout(justify-center)
            v-btn(color="grey", @click="$emit('start')")
              | さっそく遊ぶ
    v-tab-item
      v-card
        v-card-text
          h2.mb-3
            | 子子子子子子子子子子子子
          p.caption
            | 「ねこのここねこ ししのここじし」と読む、「子」の複数の読み方を使った言葉遊びがあります。ここでの「ね」「こ」「し（じ）」の読みを単語に無理やり当てはめてガチャにしたのが「子ん子ん子とば」（しんねんことば）です。
            br
            | 辞書データとWikipedia項目名を収集し、10万以上の言葉を引けるようにしました。
            br
            | ちなみに、「子子子子子子子子子子子子」自体もWikipediaにあるので運がよければ引けますよ。

          h3
            | 参考
          v-btn.mt-1(color="grey lighten-1", small)
            | ウィキペディアの説明
          v-btn.mt-1(color="grey lighten-1", small)
            | アンサイクロペディアの説明
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
  data() {
    return {
      tab: null,
    }
  },
};
</script>
