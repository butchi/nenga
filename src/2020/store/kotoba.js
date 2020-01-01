export const state = _ => ({
  messageDialog: true,
  arr: [],
})

export const mutations = {
  add(state, item) {
    state.arr.push(item)
  },

  hideMessage(state, isClose) {
    state.messageDialog = isClose
  },
}

export const getters = {
	getMessageDialog: state => state.messageDialog,
  getArr: state => state.arr,
}
