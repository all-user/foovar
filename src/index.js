const foovarExports = function() {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};

foovarExports.convertToPlainObject = require('./convertToPlainObject.js');

module.exports = foovarExports;
