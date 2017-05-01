'use strict';

var foovarExports = function foovarExports() {
  return function (stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};

module.exports = foovarExports;