'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('babel-polyfill');

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _case = require('case');

var _case2 = _interopRequireDefault(_case);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var fs = require('fs');

module.exports = function () {
  return function (stylus) {
    stylus.define('foovar', foovar);
  };
};

function foovar(outpath, filter) {
  var _this = this;

  var o = {};
  filter = filter && new RegExp(filter);
  var fullp = path.resolve(process.cwd(), outpath);
  var p = new Promise(function (done, fail) {
    (0, _mkdirp2.default)(fullp, function (err) {
      if (err) fail();
      done();
    });
  });

  p.then(function () {
    Object.entries(_this.evaluator.global.scope.locals).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2);

      var k = _ref2[0];
      var v = _ref2[1];

      if (filter && !filter.test(k)) return;
      var fn = function fn() {
        return v.nodes.val;
      };
      fn.node = v.nodes;
    });
  });
}