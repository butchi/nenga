<template lang="pug">
  v-content
    v-container(grid-list-md)
      v-layout(v-for="(name, key) in rankingLi", :key="key", row, wrap, mt-5)
        v-card(v-if="getRankingArray(key).length")
          v-toolbar(dark)
            v-card-title
              | {{ name }}ランキング
          v-card-text
            v-card(v-for="(kotoba, index) in getRankingArray(key)", :key="index")
              v-card-title
                | {{ index + 1 }}. {{ kotoba.nekoshi }} ({{ key === 'rate' ? Math.round(kotoba.rate * 100) + '%' : kotoba[key] }})
              v-card-text
                | {{ kotoba.name }}
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

      v-layout(row, wrap, mt-5)
        h2
          | 子ん子ん子とばログ
        v-data-table(
          v-if="kotobaArr.length"
          :headers="headerArr"
          :items="kotobaArr"
          :custom-sort="customSort"
        )
          template(v-slot:item.rate="{ item }")
            | {{ Math.round(item.rate * 100) / 100 }}
          template(v-slot:item.link="{ item }")
            v-btn(v-if="item.source === 2", icon,
              :href="item.href", target="_blank"
            )
              v-icon(small)
                | fab fa-wikipedia-w
            v-btn(v-else, icon,
              :href="item.href", target="_blank"
            )
              v-icon(small)
                | fas fa-book
          template(v-slot:item.intent="{ item }")
            v-btn(icon,
              :href="item.intentHref", target="_blank"
            )
              v-icon(small)
                | fab fa-twitter
</template>

<script>
import { mapGetters } from 'vuex'

import lodash from 'lodash'

export default {
  data() {
    return {
      kanaOffset: 'ア'.charCodeAt() - 'あ'.charCodeAt(),
      rankingLi: {
        total: '合計',
        ne: '子（ね）',
        ko: '子（こ）',
        shi: '子（し）',
        chu: 'チュウ',
        rate: '密度',
        len: '長さ',
      },
      headerArr: [
        {
          text: '子とば',
          sortable: false,
          value: 'nekoshi',
        },
        {
          text: '言葉',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'リンク', value: 'link', sortable: false },
        { text: '投稿', value: 'intent', sortable: false },
        { text: '長さ', value: 'len' },
        { text: '子（ね）', value: 'ne' },
        { text: '子（こ）', value: 'ko' },
        { text: '子（し）', value: 'shi' },
        { text: 'チュウ', value: 'chu' },
        { text: '密度', value: 'rate' },
        { text: '計', value: 'total' },
      ],
    }
  },
  computed: {
    ...mapGetters({
      kotobaArr: 'kotoba/getArr',
    }),
  },
  methods: {
    kataToHira(str) {
      return str.split('').map(char => char.match(/^[ァ-ヶ]/) ? String.fromCharCode(char.charCodeAt() - this.kanaOffset) : char).join('')
    },
    getNekoshiCount(str) {
      return (str.match(/[ねこしじ]|ちゅう|ちゅー/g) || []).length
    },
    nekoshiReplace(str) {
      return str.replace(/[ねこしじ]/g, '子').replace(/ちゅう/g, 'チュウ').replace(/ちゅー/g, 'チュー')
    },
    kotobaFilter(char) {
      return this.kotobaArr.filter(kotoba => kotoba.reading[0] === char)
    },
    getRankingArray(key) {
      return lodash(this.kotobaArr).filter(item => item[key] > 0).orderBy(item => item[key], 'desc').take(3).value()
    },
    customSort(arr, index, isDesc) {
      arr.sort((a, b) => {
        if(!isDesc) {
          return a[index] < b[index] ? -1 : 1;
        } else {
          return b[index] < a[index] ? -1 : 1;
        }
      });
      return arr;
    },
  },
}
</script>
