'use strict';

var _FoovarValue = require('./FoovarValue.js');

var _FoovarValue2 = _interopRequireDefault(_FoovarValue);

var _StylusExpression = require('./StylusExpression.js');

var _StylusExpression2 = _interopRequireDefault(_StylusExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fn = function fn() {
  return function (stylus) {
    try {
      stylus.define('foovar', require('./foovar.js'));
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  };
};

fn.FoovarValue = _FoovarValue2.default;
fn.StylusExpression = _StylusExpression2.default;

module.exports = fn;