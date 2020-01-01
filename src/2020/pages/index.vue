<template lang="pug">
  v-content
    v-container(grid-list-md)
      v-layout(row, wrap, mt-5)
        v-flex
          v-btn(@click="getGacha")
            | 引く
          v-btn(v-if="kotobaArr.length > 99", @click="getGacha100")
            | 100連
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
              :color="getNekoshiCol(nekoshiCount(kataToHira(kotoba.reading)))"
              v-for="(kotoba, index) in logArr", :key="index")
              template(v-slot:icon)
                .white--text
                  | {{ nekoshiCount(kataToHira(kotoba.reading)) }}
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
import lodash from 'lodash'
import nekoshiDbJson from '@/assets/nekoshi-database.min.json'

export default {
  data() {
    return {
      kanaOffset: 'ア'.charCodeAt() - 'あ'.charCodeAt(),
      kotobaArr: [],
    }
  },
  computed: {
    nekoshiArr() {
      return nekoshiDbJson.map(item => ({
        name: item[0],
        reading: item[1],
        source: item[2],
      }))
    },
    kotoba() {
      return lodash.last(this.kotobaArr)
    },
    logArr() {
      return this.kotobaArr.slice(0, -1).reverse().slice(0, 99)
    },
  },
  methods: {
    kataToHira(str) {
      return str.split('').map(char => char.match(/^[ァ-ヶ]/) ? String.fromCharCode(char.charCodeAt() - this.kanaOffset) : char).join('')
    },
    nekoshiCount(str) {
      return str.match(/[ねこしじ]|ちゅう|ちゅー/g).length
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
      this.kotobaArr.push(lodash.sample(this.nekoshiArr))
    },
    getGacha100() {
      for(let i = 0; i < 100; i++) {
        this.getGacha()
      }
    },
  },
}
</script>
