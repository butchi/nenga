export default {
  countArr: localStorage.countArr
    ? JSON.parse(localStorage.countArr)
    : new Array(32).fill(0),
};
