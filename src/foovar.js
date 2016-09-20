import 'babel-polyfill';
import Promise from 'bluebird';
import Case from 'case';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';

module.exports =  function(stylus) {
  try {
    stylus.define('foovar', foovarFunc);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};

function foovarFunc(outPath, options = {}) {
  // console.log(JSON.stringify(this.global.scope.locals['var-name']));
  outPath = outPath.string.trim();
  const fullPath = /^\//.test(outPath) ? outPath : path.resolve(process.cwd(), outPath);
  const incReg = options.include && new RegExp(options.include);
  const excReg = options.exclude && new RegExp(options.exclude);
  const o = {};

  mkdirp.sync(path.dirname(fullPath));
  const body = Object.entries(this.global.scope.locals)
    .filter(([k, v]) => {
      if (/Function/.test(v.constructor.name)) return false;
      if (incReg && !incReg.test(k)) return false;
      if (excReg && excReg.test(k)) return false;
      return true;
    })
    .map(([k, v]) => {
      return `${ Case.camel(k) }: new FoovarValue(${ JSON.stringify(v, null, 2) })`.replace(/^(.+)$/gm, '    $1');
    })
    .join(',\n');

  const codeStr = `(function() {
  var FoovarValue = require('foovar').FoovarValue;

  module.exports = {
${ body }
  };
})();`;

  fs.writeFileSync(fullPath, codeStr, 'utf8');
}
