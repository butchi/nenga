(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BtcMessage = exports["default"] = /*#__PURE__*/function () {
  function BtcMessage() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, BtcMessage);
    this.$elm = opts.$elm || $('.btc-message');
    this.initialize();
  }
  return _createClass(BtcMessage, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      this.$to = this.$elm.find('.to');
      this.$body = this.$elm.find('.body');
      this.$form = this.$elm.find('.form');
      this.$mainMessage = this.$elm.find('.main-message');
      this.$beforeLoad = this.$elm.find('.area-before-load');
      this.$beforeLoadMessage = this.$beforeLoad.find('.text');
      this.$form.on('submit', function (evt) {
        evt.preventDefault();
        _this.$beforeLoadMessage.text('読み込み中です。');
        var lastname = _this.$form.find('[name="lastname"]').val();
        var code = _this.$form.find('[name="code"]').val();
        ga('send', 'event', 'nenga-2017', 'submit', "".concat(lastname, "-").concat(code));
        $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbws1vKfZR6in5KG4OfA1KiPFlcaRwsLtGY5oMtMDWmvdlC_gjbF/exec',
          type: 'GET',
          cache: false,
          data: {
            lastname: lastname,
            code: code
          },
          dataType: 'jsonp'
        }).then(function (data) {
          //成功

          if (data && data.to && data.body) {
            _this.$beforeLoad.hide();
            _this.$mainMessage.fadeIn(500);
            _this.$to.text(data.to);
            _this.$body.html(data.body);
          } else {
            _this.$beforeLoadMessage.text('読み込めませんでした。');
          }
        }).fail(function (err) {
          _this.$beforeLoadMessage.text('読み込めませんでした。');
        });
      });
    }
  }]);
}();

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Router = _interopRequireDefault(require("./Router"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Main = exports["default"] = /*#__PURE__*/function () {
  function Main() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Main);
    console.log('Hello, world!');
    this.initialize();
    console.log('Thanks, world!');
  }
  return _createClass(Main, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;
      $(function () {
        _this.router = new _Router["default"]();
      });
    }
  }]);
}();

},{"./Router":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ns = _interopRequireDefault(require("./ns"));
var _Common = _interopRequireDefault(require("../page/Common"));
var _Index = _interopRequireDefault(require("../page/Index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Router = exports["default"] = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
    this.initialize();
  }
  return _createClass(Router, [{
    key: "initialize",
    value: function initialize() {
      var $body = $('body');
      this.pageCommon = new _Common["default"]();
      if ($body.hasClass('page-index')) {
        this.pageIndex = new _Index["default"]();
      }
    }
  }]);
}();

},{"../page/Common":5,"../page/Index":6,"./ns":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
/*
 * グローバル直下に変数を置かないよう、ネームスペースを切る。
 * ネームスペース以下の変数にアクセスしたいときは各クラスでこれをimportする
 */

window.App = window.App || {};
var ns = window.App;
var _default = exports["default"] = ns;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ns = _interopRequireDefault(require("../module/ns"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Common = exports["default"] = /*#__PURE__*/function () {
  function Common() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Common);
    this.initialize();
  }
  return _createClass(Common, [{
    key: "initialize",
    value: function initialize() {
      this.setEnvClass();
    }
  }, {
    key: "setEnvClass",
    value: function setEnvClass() {
      var $html = $('html');
      _ns["default"].isSp = false;
      _ns["default"].isPc = false;
      _ns["default"].isTab = false;
      if ($html.hasClass('is-sp')) {
        _ns["default"].isSp = true;
      }
      if ($html.hasClass('is-pc')) {
        _ns["default"].isPc = true;
      }
      if ($html.hasClass('is-tab')) {
        _ns["default"].isTab = true;
      }
    }
  }]);
}();

},{"../module/ns":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ns = _interopRequireDefault(require("../module/ns"));
var _BtcMessage = _interopRequireDefault(require("../module/BtcMessage"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Index = exports["default"] = /*#__PURE__*/function () {
  function Index() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Index);
    this.initialize();
  }
  return _createClass(Index, [{
    key: "initialize",
    value: function initialize() {
      this.BtcMessage = new _BtcMessage["default"]();
    }
  }]);
}();

},{"../module/BtcMessage":1,"../module/ns":4}],7:[function(require,module,exports){
"use strict";

var _ns = _interopRequireDefault(require("./module/ns"));
var _Main = _interopRequireDefault(require("./module/Main"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// エントリーポイント。indexからはライブラリとこれしか呼ばない

_ns["default"].main = new _Main["default"]();

},{"./module/Main":2,"./module/ns":4}]},{},[7]);
