'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = resolveCss;

var _unwrapExp = require('./unwrapExp.js');

var _unwrapExp2 = _interopRequireDefault(_unwrapExp);

var _resolveValue = require('./resolveValue.js');

var _resolveValue2 = _interopRequireDefault(_resolveValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveCss(node) {
  switch (node.__type) {
    case 'Unit':
      return '' + node.val + node.type;
    case 'String':
      return node.val;
    case 'RGBA':
      if (node.raw) {
        return node.raw;
      } else {
        var vals = (0, _resolveValue2.default)(node);
        return 'rgba(' + vals.join(',') + ')';
      }
    case 'HSLA':
      {
        var _ret = function () {
          var vals = (0, _resolveValue2.default)(node);
          var units = ['', '%', '%', ''];
          return {
            v: 'hsla(' + vals.map(function (v, i) {
              return v + units[i];
            }).join(',') + ')'
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    case 'Call':
      return resolveCssOfCall(node);
    case 'Object':
      return void 0;
    default:
      console.error('Can\'t resolve stylus node CSS string: ' + node.__type);
  }
}

function resolveCssOfCall(node) {
  switch (node.name) {
    case 'cubic-bezier':
      {
        return 'cubic-bezier(' + (0, _resolveValue2.default)(node).join(',') + ')';
      }
    default:
      console.error('Can\'t resolve stylus.nodes.Call CSS string: ' + node.name);
  }
}