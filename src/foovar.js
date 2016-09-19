import mkdirp from 'mkdirp';
import Case from 'case';
import path from 'path';
import fs from 'fs';

module.exports =  function(stylus) {
  stylus.define('foovar', foovarFunc);
};

function foovarFunc(outpath, filter) {
  const o = {};
  filter = filter && new RegExp(filter);
  const fullp = path.resolve(process.cwd(), outpath);

  mkOutDir(fullp)
    .then(() => {
      Object.entries(this.evaluator.global.scope.locals)
        .forEach(([k, v]) => {
          if (filter && !filter.test(k)) return;
          const fn = () => v.nodes.val;
          fn.node = v.nodes;
        });
    });
}

function mkOutDir(p) {
  new Promise((done, fail) => {
    mkdirp(p, err => {
      if (err) fail();
      done();
    });
  });
}
