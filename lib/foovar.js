'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

require('babel-polyfill');

var _case = require('case');

var _case2 = _interopRequireDefault(_case);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _unwrapExp = require('./unwrapExp.js');

var _unwrapExp2 = _interopRequireDefault(_unwrapExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function foovarFunc(outPath, options) {
  outPath = (0, _unwrapExp2.default)(eval('(' + JSON.stringify(outPath) + ')'));
  if (outPath.__type !== 'String') {
    console.error('foovar outPath arg must be string');
    return;
  }
  outPath = outPath.val.trim();
  options = options || new this.renderer.nodes.Object();
  options = (0, _unwrapExp2.default)(eval('(' + JSON.stringify(options) + ')'));
  var fullPath = /^\//.test(outPath) ? outPath : _path2.default.resolve(process.cwd(), outPath);
  var incReg = options.vals.include && (0, _unwrapExp2.default)(options.vals.include);
  var excReg = options.vals.exclude && (0, _unwrapExp2.default)(options.vals.exclude);
  incReg = incReg && incReg.__type === 'String' && new RegExp(incReg.val);
  excReg = excReg && excReg.__type === 'String' && new RegExp(excReg.val);

  _mkdirp2.default.sync(_path2.default.dirname(fullPath));
  var body = Object.entries(this.global.scope.locals).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var k = _ref2[0];
    var v = _ref2[1];

    if (/Function/.test(v.constructor.name)) return false;
    if (incReg && !incReg.test(k)) return false;
    if (excReg && excReg.test(k)) return false;
    return true;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var k = _ref4[0];
    var v = _ref4[1];

    return (_case2.default.camel(k) + ': new FoovarValue(' + JSON.stringify(v, null, 2) + ')').replace(/^(.+)$/gm, '    $1');
  }).join(',\n');

  var codeStr = '(function() {\n  var FoovarValue = require(' + (process.env.BABEL_ENV === 'test' ? '\'' + _path2.default.resolve(process.cwd(), 'src/index.js') + '\'' : '\'foovar\'') + ').FoovarValue;\n\n  module.exports = {\n' + body + '\n  };\n})();';

  _fs2.default.writeFileSync(fullPath, codeStr, 'utf8');
  console.log('foovar: generated ' + fullPath);
};