import FoovarValue from './FoovarValue.js';
import StylusExpression from './StylusExpression.js';

const fn = function() {
  return function(stylus) {
    try {
      stylus.define('foovar', require('./foovar.js'));
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  };
};

fn.FoovarValue = FoovarValue;
fn.StylusExpression = StylusExpression;

module.exports = fn;
