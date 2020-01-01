export const state = _ => ({
  arr: [],
})

export const mutations = {
  add(state, item) {
    state.arr.push(item)
  },
}

export const getters = {
  getArr: state => state.arr,
}
