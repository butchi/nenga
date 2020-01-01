<template lang="pug">
  v-content
    v-container(grid-list-md)
      v-layout(row, wrap, mt-5)
        v-flex
          v-layout
            v-btn(@click="getGacha")
              | 引く
            v-btn(v-if="kotobaArr.length > 99", @click="getGacha100")
              | 100連
          v-layout
            v-flex
              v-layout
                v-chip
                  v-avatar.caption.yellow.darken-3(left)
                    <ruby>子<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>
                  | {{ neCnt }}
                v-chip
                  v-avatar.caption.red(left)
                    <ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>
                  | {{ koCnt }}
                v-chip
                  v-avatar.caption.cyan(left)
                    <ruby>子<rp>(</rp><rt>し</rt><rp>)</rp></ruby>
                  | {{ shiCnt }}
              v-layout
                v-chip
                  v-avatar.grey(left)
                    v-icon(small)
                      | fas fa-mouse
                  | {{ chuCnt }}
                v-chip
                  v-avatar.green(left)
                    | 計
                  | {{ nekoshiCnt }}
          v-card(v-if="kotoba")
            v-card-title
              | {{ nekoshiReplace(kataToHira(kotoba.reading)) }}
            v-card-text
              | {{ kotoba.name }}
            v-card-actions
              v-btn(v-if="kotoba.source === 2", text,
                :href="`https://ja.wikipedia.org/wiki/${kotoba.name}`", target="_blank"
                style="text-transform: none;"
              )
                | Wikipediaで調べる
              v-btn(v-else, text,
                :href="`https://kotobank.jp/gs/?q=${kotoba.name}`", target="_blank"
              )
                | 辞書を調べる
              v-btn(dark,
                color="#55acee"
                :href="`https://twitter.com/intent/tweet?text=${nekoshiReplace(kataToHira(kotoba.reading))} (${kotoba.name})&hashtags=${'子ん子ん子とば'}`", target="_blank"
              )
                | ツイートする
          v-card(v-else)
            v-card-title
              | 「引く」をタップ！
            v-card-text
              | 子子（ここ）に結果が表示されます。
          v-timeline(v-if="logArr.length", dense)
            v-timeline-item(
              :color="getNekoshiCol(getNekoshiCount(kataToHira(kotoba.reading)))"
              v-for="(kotoba, index) in logArr", :key="index")
              template(v-slot:icon)
                .white--text
                  | {{ getNekoshiCount(kataToHira(kotoba.reading)) }}
              | {{ nekoshiReplace(kataToHira(kotoba.reading)) }} ({{ kotoba.name }})
              v-btn(v-if="kotoba.source === 2", icon,
                :href="`https://ja.wikipedia.org/wiki/${kotoba.name}`", target="_blank"
              )
                v-icon(small)
                  | fab fa-wikipedia-w
              v-btn(v-else, icon,
                :href="`https://kotobank.jp/gs/?q=${kotoba.name}`", target="_blank"
              )
                v-icon(small)
                  | fas fa-book
              v-btn(icon,
                :href="`https://twitter.com/intent/tweet?text=${nekoshiReplace(kataToHira(kotoba.reading))} (${kotoba.name})&hashtags=${'子ん子ん子とば'}`", target="_blank"
              )
                v-icon(small)
                  | fab fa-twitter
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import lodash from 'lodash'
import nekoshiDbJson from '@/assets/nekoshi-database.min.json'

export default {
  data() {
    return {
      kanaOffset: 'ア'.charCodeAt() - 'あ'.charCodeAt(),
    }
  },
  computed: {
    ...mapGetters({
      kotobaArr: 'kotoba/getArr',
    }),
    nekoshiArr() {
      return nekoshiDbJson.map(item => ({
        name: item[0],
        reading: item[1],
        source: item[2],
      }))
    },
    neCnt() {
      return lodash.sum(this.kotobaArr.map(kotoba => (kotoba.reading.match(/ネ/g) || []).length))
    },
    koCnt() {
      return lodash.sum(this.kotobaArr.map(kotoba => (kotoba.reading.match(/コ/g) || []).length))
    },
    shiCnt() {
      return lodash.sum(this.kotobaArr.map(kotoba => (kotoba.reading.match(/[シジ]/g) || []).length))
    },
    chuCnt() {
      return lodash.sum(this.kotobaArr.map(kotoba => (kotoba.reading.match(/チュウ|チュー/g) || []).length))
    },
    nekoshiCnt() {
      return lodash.sum(this.kotobaArr.map(kotoba => (kotoba.reading.match(/[ネコシジ]|チュウ|チュー/g) || []).length))
    },
    kotoba() {
      return lodash.last(this.kotobaArr)
    },
    logArr() {
      return this.kotobaArr.slice(0, -1).reverse().slice(0, 99)
    },
  },
  methods: {
    ...mapMutations({
      addKotoba: 'kotoba/add',
    }),
    kataToHira(str) {
      return str.split('').map(char => char.match(/^[ァ-ヶ]/) ? String.fromCharCode(char.charCodeAt() - this.kanaOffset) : char).join('')
    },
    getNekoshiCount(str) {
      return (str.match(/[ねこしじ]|ちゅう|ちゅー/g) || []).length
    },
    getNekoshiCol(n) {
      if (n <= 0) {
      } else if (n === 1) {
        return 'yellow darken-1'
      } else if (n === 2) {
        return 'yellow darken-2'
      } else if (n === 3) {
        return 'orange'
      } else if (n === 4) {
        return 'orange darken-1'
      } else {
        return 'red'
      }
    },
    nekoshiReplace(str) {
      return str.replace(/[ねこしじ]/g, '子').replace(/ちゅう/g, 'チュウ').replace(/ちゅー/g, 'チュー')
    },
    getGacha() {
      this.addKotoba(lodash.sample(this.nekoshiArr))
    },
    getGacha100() {
      for(let i = 0; i < 100; i++) {
        this.getGacha()
      }
    },
  },
}
</script>
