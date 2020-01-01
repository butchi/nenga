<template lang="pug">
  v-content
    v-container(grid-list-md)
      v-layout(row, wrap)
        v-flex
          v-layout
            v-flex
              v-layout
                v-chip.ma-1
                  v-avatar.caption.yellow.darken-3(left)
                    <ruby>子<rp>(</rp><rt>ね</rt><rp>)</rp></ruby>
                  | {{ neCnt }}
                v-chip.ma-1
                  v-avatar.caption.red(left)
                    <ruby>子<rp>(</rp><rt>こ</rt><rp>)</rp></ruby>
                  | {{ koCnt }}
                v-chip.ma-1
                  v-avatar.caption.cyan(left)
                    <ruby>子<rp>(</rp><rt>し</rt><rp>)</rp></ruby>
                  | {{ shiCnt }}
              v-layout
                v-chip.ma-1
                  v-avatar.grey(left)
                    v-icon(small)
                      | fas fa-mouse
                  | {{ chuCnt }}
                v-chip.ma-1
                  v-avatar.green(left)
                    | 計
                  | {{ nekoshiCnt }}
          v-card.mt-3(v-if="kotoba", color="grey lighten-3")
            v-card-title
              | {{ kotoba.nekoshi }}
            v-card-text
              | {{ kotoba.name }}
            v-card-actions
              v-btn(v-if="kotoba.source === 2", text,
                :href="kotoba.href", target="_blank"
                style="text-transform: none;"
              )
                | Wikipediaで調べる
              v-btn(v-else, text,
                :href="kotoba.href", target="_blank"
              )
                | 辞書を調べる
              v-btn(dark,
                color="#55acee"
                :href="kotoba.intentHref", target="_blank"
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
              | {{ kotoba.nekoshi }} ({{ kotoba.name }})
              v-btn(v-if="kotoba.source === 2", icon,
                :href="kotoba.href", target="_blank"
              )
                v-icon(small)
                  | fab fa-wikipedia-w
              v-btn(v-else, icon,
                :href="kotoba.href", target="_blank"
              )
                v-icon(small)
                  | fas fa-book
              v-btn(icon,
                :href="kotoba.intentHref", target="_blank"
              )
                v-icon(small)
                  | fab fa-twitter
    v-bottom-navigation(dark, fixed)
      v-btn(color="red", @click="getGacha")
        span
          | 引く
        v-icon
          | fas fa-dice-one
      //- v-btn(v-if="kotobaArr.length > 99", @click="getGacha100")
      //- v-btn(v-if="kotobaArr.length >= 0", @click="getGacha100")
        | 100連
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
    getCount(item, searchStr) {
      const regExp = new RegExp(searchStr, 'g')

      return (item.reading.match(regExp) || []).length
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
      const kotoba = lodash.sample(this.nekoshiArr)

      const item = {
        len: kotoba.reading.length,
        nekoshi: this.nekoshiReplace(this.kataToHira(kotoba.reading)),
        href: kotoba.source === 2 ? `https://ja.wikipedia.org/wiki/${kotoba.name}` : `https://kotobank.jp/gs/?q=${kotoba.name}`,
        intentHref: `https://twitter.com/intent/tweet?text=${this.nekoshiReplace(this.kataToHira(kotoba.reading))} (${kotoba.name})&hashtags=${'子ん子ん子とば'}`,
        ne: this.getCount(kotoba, 'ネ'),
        ko: this.getCount(kotoba, 'コ'),
        shi: this.getCount(kotoba, 'シ'),
        chu: this.getCount(kotoba, 'チュウ|チュー'),
        total: this.getCount(kotoba, '[ネコシ]|チュウ|チュー'),
        rate: this.getCount(kotoba, '[ネコシ]|チュウ|チュー') / kotoba.reading.length,
      }

      Object.assign(item, kotoba)

      this.addKotoba(item)
    },
    getGacha100() {
      for(let i = 0; i < 100; i++) {
        this.getGacha()
      }
    },
  },
}
</script>
