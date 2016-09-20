import FoovarValue from 'FoovarValue.js';

module.exports = function() {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};

exports.FoovarValue = FoovarValue;
