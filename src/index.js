module.exports = function() {
  return function(stylus) {
    stylus.define('foovar', require('./foovar.js'));
  };
};
