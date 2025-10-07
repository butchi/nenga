<template lang="pug">
v-card.sm12(max-width="400", style="margin: 0 auto;")
  v-card-title.text-xs-left(primary-title)
    h3.title.mb-3.red--text
      | あけましておめでとうございます。
  v-card-text.text-xs-left
    .description.mb-3
      p.mb-2
        | 昨年は皆様に支えられ、恵まれた1年を過ごすことができました。
        br
        | いろいろチャレンジしたことは多いながらも、やり切れなかった事も山積だったので、今年はもう少し狙いを定めて成功を手にしたいという抱負で一年を始めようと思います。
      p
        | 毎年コツコツ作っている年賀コンテンツ、今年はスロットゲームを頑張ってつくってみました。
        | 結果はなんと31種類！
        br
        span.font-italic
          | まあ、スロットとかいいつつ実質ガチャなんですけどね・・・。
        br
        | それはともかく、コンプ目指していっぱい回してくれると嬉しいです！
    p.mb-3
      | 平成31年1月1日  岩淵 勇樹
  v-card-actions(v-if="isDialog")
    v-layout(justify-center)
      v-btn(color="primary", @click="$emit('start')")
        | スロットを始める
</template>

<script>
export default {
  props: {
    isDialog: Boolean,
  },
};
</script>
