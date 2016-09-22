'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = resolveValue;

var _FoovarValue = require('./FoovarValue.js');

var _FoovarValue2 = _interopRequireDefault(_FoovarValue);

var _unwrapExp = require('./unwrapExp.js');

var _unwrapExp2 = _interopRequireDefault(_unwrapExp);

var _case = require('case');

var _case2 = _interopRequireDefault(_case);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveValue(node) {
  switch (node.__type) {
    case 'Unit':
    case 'String':
      return node.val;
    case 'RGBA':
      {
        var r = node.r;
        var g = node.g;
        var b = node.b;
        var a = node.a;

        return [r, g, b, a];
      }
    case 'HSLA':
      {
        var h = node.h;
        var s = node.s;
        var l = node.l;
        var _a = node.a;

        return [h, s, l, _a];
      }
    case 'Object':
      {
        return Object.entries(node.vals).reduce(function (o, _ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var k = _ref2[0];
          var v = _ref2[1];

          o[_case2.default.camel(k)] = new _FoovarValue2.default(v);
          return o;
        }, {});
      }
    case 'Call':
      return resolveValueOfCall(node);
    default:
      console.error('Can\'t resolve stylus node value: ' + node.__type);
  }
}

function resolveValueOfCall(node) {
  switch (node.name) {
    case 'cubic-bezier':
      {
        return node.args.nodes.map(function (exp) {
          return (0, _unwrapExp2.default)(exp).val;
        });
      }
    default:
      console.error('Can\'t resolve stylus.nodes.Call value: ' + node.name);
  }
}