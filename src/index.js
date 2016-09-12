import 'babel-polyfill';
import mkdirp from 'mkdirp';
import Case from 'case';
const path = require('path');
const fs = require('fs');

module.exports = () => { console.log('WIP'); };

/*module.exports = */
const foovar = function() {
  return function(stylus) {
    stylus.define('foovar', impl);
  };
};

function impl(outpath, filter) {
  const o = {};
  filter = filter && new RegExp(filter);
  const fullp = path.resolve(process.cwd(), outpath);
  const p = new Promise((done, fail) => {
    mkdirp(fullp, err => {
      if (err) fail();
      done();
    });
  });

  p
    .then(() => {
      Object.entries(this.evaluator.global.scope.locals)
        .forEach(([k, v]) => {
          if (filter && !filter.test(k)) return;
          const fn = () => v.nodes.val;
          fn.node = v.nodes;
        });
    });


}
