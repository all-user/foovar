import FoovarValue from './FoovarValue.js';

const fn = function() {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};

fn.FoovarValue = FoovarValue;

module.exports = fn;
