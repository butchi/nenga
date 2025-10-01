(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Router = _interopRequireDefault(require("./Router"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Main = exports.default = /*#__PURE__*/function () {
  function Main() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Main);
    console.log("Hello, world!");
    this.initialize();
    console.log("Thanks, world!");
  }
  return _createClass(Main, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      $(function () {
        _this.router = new _Router.default();
      });
    }
  }]);
}();

},{"./Router":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ns = _interopRequireDefault(require("./ns"));
var _Common = _interopRequireDefault(require("../page/Common"));
var _Index = _interopRequireDefault(require("../page/Index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function page(pageId, callback) {
  if (document.querySelector("body[data-page-id=\"".concat(pageId, "\"]"))) {
    callback();
  }
}
var Router = exports.default = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
    this.initialize();
  }
  return _createClass(Router, [{
    key: "initialize",
    value: function initialize() {
      _ns.default.page = _ns.default.page || {};
      (0, _Common.default)();
      page("index", _Index.default);
    }
  }]);
}();

},{"../page/Common":5,"../page/Index":6,"./ns":4}],3:[function(require,module,exports){
"use strict";

var _ns = _interopRequireDefault(require("./ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
"use strict";
var $html = $("html");
var WIDTH = 375;
var FONT_SIZE = 100;
var resizeHandler = function resizeHandler(evt) {
  var w = Math.max($(evt.target).width() / WIDTH * FONT_SIZE, 10);
  if (_ns.default.isSp) {
    $html.css({
      "font-size": w + "px"
    });
  } else {
    $html.css({
      "font-size": ""
    });
  }
};
$(window).on("resize", resizeHandler).trigger("resize");

},{"./ns":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

window.App = window.App || {};
var ns = window.App;
var _default = exports.default = ns;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ns = _interopRequireDefault(require("../module/ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var _default = exports.default = function _default() {
  console.log("page common");
  setEnvClass();
};
function setEnvClass() {
  var $html = $("html");
  _ns.default.isSp = false;
  _ns.default.isPc = false;
  _ns.default.isTab = false;
  if ($html.hasClass("is-sp")) {
    _ns.default.isSp = true;
  }
  if ($html.hasClass("is-pc")) {
    _ns.default.isPc = true;
  }
  if ($html.hasClass("is-tab")) {
    _ns.default.isTab = true;
  }
}

},{"../module/ns":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../module/fit-window");
var _default = exports.default = function _default() {
  console.log("index page");
};

},{"../module/fit-window":3}],7:[function(require,module,exports){
"use strict";

var _ns = _interopRequireDefault(require("./module/ns"));
var _Main = _interopRequireDefault(require("./module/Main"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns.default.main = new _Main.default();

},{"./module/Main":1,"./module/ns":4}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvbW9kdWxlL01haW4uanMiLCJzcmMvanMvbW9kdWxlL1JvdXRlci5qcyIsInNyYy9qcy9tb2R1bGUvZml0LXdpbmRvdy5qcyIsInNyYy9qcy9tb2R1bGUvbnMuanMiLCJzcmMvanMvcGFnZS9Db21tb24uanMiLCJzcmMvanMvcGFnZS9JbmRleC5qcyIsInNyYy9qcy9zY3JpcHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxJQUFBLE9BQUEsR0FBQSxzQkFBQSxDQUFBLE9BQUE7QUFBNkIsU0FBQSx1QkFBQSxDQUFBLFdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxVQUFBLEdBQUEsQ0FBQSxLQUFBLE9BQUEsRUFBQSxDQUFBO0FBQUEsU0FBQSxRQUFBLENBQUEsc0NBQUEsT0FBQSx3QkFBQSxNQUFBLHVCQUFBLE1BQUEsQ0FBQSxRQUFBLGFBQUEsQ0FBQSxrQkFBQSxDQUFBLGdCQUFBLENBQUEsV0FBQSxDQUFBLHlCQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEtBQUEsTUFBQSxDQUFBLFNBQUEscUJBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsU0FBQSxnQkFBQSxDQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsWUFBQSxDQUFBLGFBQUEsU0FBQTtBQUFBLFNBQUEsa0JBQUEsQ0FBQSxFQUFBLENBQUEsYUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxNQUFBLEVBQUEsQ0FBQSxVQUFBLENBQUEsR0FBQSxDQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsQ0FBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLFVBQUEsUUFBQSxDQUFBLENBQUEsWUFBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxDQUFBLFFBQUEsUUFBQSxNQUFBLENBQUEsY0FBQSxDQUFBLENBQUEsRUFBQSxjQUFBLENBQUEs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QUFFLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSSxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFJvdXRlciBmcm9tIFwiLi9Sb3V0ZXJcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIHtcbiAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgY29uc29sZS5sb2coXCJIZWxsbywgd29ybGQhXCIpXG5cbiAgICB0aGlzLmluaXRpYWxpemUoKVxuXG4gICAgY29uc29sZS5sb2coXCJUaGFua3MsIHdvcmxkIVwiKVxuICB9XG5cbiAgaW5pdGlhbGl6ZSgpIHtcbiAgICAkKCgpID0+IHtcbiAgICAgIHRoaXMucm91dGVyID0gbmV3IFJvdXRlcigpXG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IG5zIGZyb20gXCIuL25zXCJcbmltcG9ydCBwYWdlQ29tbW9uIGZyb20gXCIuLi9wYWdlL0NvbW1vblwiXG5pbXBvcnQgcGFnZUluZGV4IGZyb20gXCIuLi9wYWdlL0luZGV4XCJcblxuZnVuY3Rpb24gcGFnZShwYWdlSWQsIGNhbGxiYWNrKSB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBib2R5W2RhdGEtcGFnZS1pZD1cIiR7cGFnZUlkfVwiXWApKSB7XG4gICAgY2FsbGJhY2soKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG4gIH1cblxuICBpbml0aWFsaXplKCkge1xuICAgIG5zLnBhZ2UgPSBucy5wYWdlIHx8IHt9XG5cbiAgICBwYWdlQ29tbW9uKClcblxuICAgIHBhZ2UoXCJpbmRleFwiLCBwYWdlSW5kZXgpXG4gIH1cbn1cbiIsImltcG9ydCBucyBmcm9tIFwiLi9uc1wiXG47KFwidXNlIHN0cmljdFwiKVxuXG5jb25zdCAkaHRtbCA9ICQoXCJodG1sXCIpXG5jb25zdCBXSURUSCA9IDM3NVxuY29uc3QgRk9OVF9TSVpFID0gMTAwXG5cbmNvbnN0IHJlc2l6ZUhhbmRsZXIgPSBldnQgPT4ge1xuICBjb25zdCB3ID0gTWF0aC5tYXgoKCQoZXZ0LnRhcmdldCkud2lkdGgoKSAvIFdJRFRIKSAqIEZPTlRfU0laRSwgMTApXG5cbiAgaWYgKG5zLmlzU3ApIHtcbiAgICAkaHRtbC5jc3Moe1xuICAgICAgXCJmb250LXNpemVcIjogdyArIFwicHhcIixcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgICRodG1sLmNzcyh7XG4gICAgICBcImZvbnQtc2l6ZVwiOiBcIlwiLFxuICAgIH0pXG4gIH1cbn1cblxuJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIHJlc2l6ZUhhbmRsZXIpLnRyaWdnZXIoXCJyZXNpemVcIilcbiIsIi8qXG4gKiDjgrDjg63jg7zjg5Djg6vnm7TkuIvjgavlpInmlbDjgpLnva7jgYvjgarjgYTjgojjgYbjgIHjg43jg7zjg6Djgrnjg5rjg7zjgrnjgpLliIfjgovjgIJcbiAqIOODjeODvOODoOOCueODmuODvOOCueS7peS4i+OBruWkieaVsOOBq+OCouOCr+OCu+OCueOBl+OBn+OBhOOBqOOBjeOBr+WQhOOCr+ODqeOCueOBp+OBk+OCjOOCkmltcG9ydOOBmeOCi1xuICovXG5cbndpbmRvdy5BcHAgPSB3aW5kb3cuQXBwIHx8IHt9XG5jb25zdCBucyA9IHdpbmRvdy5BcHBcbmV4cG9ydCBkZWZhdWx0IG5zXG4iLCJpbXBvcnQgbnMgZnJvbSBcIi4uL21vZHVsZS9uc1wiXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJwYWdlIGNvbW1vblwiKVxuXG4gIHNldEVudkNsYXNzKClcbn1cblxuZnVuY3Rpb24gc2V0RW52Q2xhc3MoKSB7XG4gIGNvbnN0ICRodG1sID0gJChcImh0bWxcIilcblxuICBucy5pc1NwID0gZmFsc2VcbiAgbnMuaXNQYyA9IGZhbHNlXG4gIG5zLmlzVGFiID0gZmFsc2VcblxuICBpZiAoJGh0bWwuaGFzQ2xhc3MoXCJpcy1zcFwiKSkge1xuICAgIG5zLmlzU3AgPSB0cnVlXG4gIH1cbiAgaWYgKCRodG1sLmhhc0NsYXNzKFwiaXMtcGNcIikpIHtcbiAgICBucy5pc1BjID0gdHJ1ZVxuICB9XG4gIGlmICgkaHRtbC5oYXNDbGFzcyhcImlzLXRhYlwiKSkge1xuICAgIG5zLmlzVGFiID0gdHJ1ZVxuICB9XG59XG4iLCJpbXBvcnQgXCIuLi9tb2R1bGUvZml0LXdpbmRvd1wiXG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJpbmRleCBwYWdlXCIpXG59XG4iLCIvLyDjgqjjg7Pjg4jjg6rjg7zjg53jgqTjg7Pjg4jjgIJpbmRleOOBi+OCieOBr+ODqeOCpOODluODqeODquOBqOOBk+OCjOOBl+OBi+WRvOOBsOOBquOBhFxuXG5pbXBvcnQgbnMgZnJvbSBcIi4vbW9kdWxlL25zXCJcbmltcG9ydCBNYWluIGZyb20gXCIuL21vZHVsZS9NYWluXCJcblxubnMubWFpbiA9IG5ldyBNYWluKClcbiJdfQ==
