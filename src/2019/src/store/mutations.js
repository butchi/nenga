export const setCountArr = (state, index) => {
  state.countArr.splice(index, 1, state.countArr[index] + 1);

  localStorage.setItem("countArr", JSON.stringify(state.countArr));
};

export const clearHistory = (state) => {
  state.countArr = new Array(32).fill(0);

  localStorage.removeItem("countArr");
  localStorage.removeItem("isVirgin");
};
