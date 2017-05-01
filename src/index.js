const foovarExports = function() {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};

module.exports = foovarExports;
