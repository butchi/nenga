<template lang="pug">
v-card.sm12(max-width="400", style="margin: 0 auto;")
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
    h3.title(v-if="isHidden")
      | ？？？？
    h3.title(v-else)
      v-badge
        span(v-if="count > 1" slot="badge")
          | {{ count }}
        span
          | {{ iOshishi.name || "？？？？" }}
  v-card-text
    p.grey--text.description(v-if="isHidden")
      | 未開放
    p.grey--text.description(v-else, style="min-height: 75px;")
      | {{ iOshishi.description || "ここに説明が入ります" }}
  v-card-actions.share(v-if="!isHidden && iOshishi.friendly_id")
    v-layout(row, justify-center)
      v-btn(color="#55acee", small, dark, @click="tweet")
        v-icon.mr-2(size="16")
          | fab fa-twitter
        span.caption
          | ツイート
      v-btn(color="#3B5998", small, dark, @click="shareFacebook")
        v-icon.mr-2(size="20")
          | fab fa-facebook
        span.caption
          | シェア
      v-btn(color="#00b900", small, dark, @click="sendLine")
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
import constants from "../assets/constants.json";

export default {
  props: {
    iOshishi: Object,
    countArr: Array,
    isHidden: Boolean,
    isDialog: Boolean
  },
  data() {
    return {
      baseUrl: constants.SITE_ORIGIN + constants.BASE_PATH.slice(1)
    }
  },
  computed: {
    imgSrc() {
      if (!this.iOshishi.friendly_id) {
        return "./ogp.png";
      }
      return `./i-oshishi/${this.iOshishi.friendly_id}.png`;
    },
    count() {
      return this.countArr[this.iOshishi.index];
    },
    url() {
      return `${this.baseUrl}share/${this.iOshishi.friendly_id}/`;
    },
    tweetText() {
      return `「${this.iOshishi.name}」${this.count < 2 ? '' : this.count + '回目'}ゲット！`;
    },
    hashtagStr() {
      return 'イOシシスロット';
    },
    twitterLink() {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.tweetText)}&url=${this.url}&hashtags=${encodeURIComponent(this.hashtagStr)}`;
    },
    facebookLink() {
      return `http://www.facebook.com/share.php?u=${this.url}`;
    },
    lineLink() {
      return `https://social-plugins.line.me/lineit/share?url=${this.url}`;
    }
  },
  methods: {
    tweet() {
      window.open(encodeURI(decodeURI(this.twitterLink)), "tweetWindow", "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1");
      return false;
    },
    shareFacebook() {
      window.open(encodeURI(decodeURI(this.facebookLink)), 'FBwindow', 'width=554, height=470, menubar=no, toolbar=no, scrollbars=yes');
      return false;
    },
    sendLine() {
      window.open(encodeURI(decodeURI(this.lineLink)), "lineWindow", "width=650, height=470, personalbar=0, toolbar=0, scrollbars=1, sizable=1");
      return false;
    }
  }
};
</script>
