'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unwrapExp = require('./unwrapExp');

var _unwrapExp2 = _interopRequireDefault(_unwrapExp);

var _isUnary = require('./isUnary');

var _isUnary2 = _interopRequireDefault(_isUnary);

var _resolveValue = require('./resolveValue.js');

var _resolveValue2 = _interopRequireDefault(_resolveValue);

var _resolveType = require('./resolveType.js');

var _resolveType2 = _interopRequireDefault(_resolveType);

var _resolveCss = require('./resolveCss.js');

var _resolveCss2 = _interopRequireDefault(_resolveCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FoovarValue = function () {
  function FoovarValue(stylusExpression) {
    _classCallCheck(this, FoovarValue);

    var fn = function fn() {
      return fn.value;
    };

    fn.stylusExpression = stylusExpression;
    var foovarProto = Object.getPrototypeOf(this);
    Object.setPrototypeOf(foovarProto, Object.getPrototypeOf(fn));
    Object.setPrototypeOf(fn, foovarProto);
    return fn;
  }

  _createClass(FoovarValue, [{
    key: 'value',
    get: function get() {
      var _this = this;

      var exp = (0, _unwrapExp2.default)(this.stylusExpression);
      if ((0, _isUnary2.default)(exp)) {
        return (0, _resolveValue2.default)(exp);
      } else {
        return this.stylusExpression.nodes.map(function (exp) {
          return new _this.constructor((0, _unwrapExp2.default)(exp));
        });
      }
    }
  }, {
    key: 'type',
    get: function get() {
      var exp = (0, _unwrapExp2.default)(this.stylusExpression);
      if ((0, _isUnary2.default)(exp)) {
        return (0, _resolveType2.default)(exp);
      } else {
        return exp.isList ? 'list' : 'tuple';
      }
    }
  }, {
    key: 'css',
    get: function get() {
      var exp = (0, _unwrapExp2.default)(this.stylusExpression);
      if ((0, _isUnary2.default)(exp)) {
        return (0, _resolveCss2.default)(exp);
      } else {
        return void 0;
      }
    }
  }]);

  return FoovarValue;
}();

exports.default = FoovarValue;