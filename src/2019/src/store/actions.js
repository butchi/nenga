export const setCountArr = ({ commit }, index) => {
  commit("setCountArr", index);
};

export const clearHistory = ({ commit }) => {
  commit("clearHistory");
};
