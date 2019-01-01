export const setCountArr = (state, index) => {
  state.countArr.splice(index, 1, state.countArr[index] + 1);
};
