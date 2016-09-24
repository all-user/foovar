module.exports = function() {
  return function(stylus) {
    try {
      stylus.define('foovar', require('./foovar.js'));
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  };
};
