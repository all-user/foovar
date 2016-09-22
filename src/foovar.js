import 'babel-polyfill';
import Case from 'case';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';
import unwrapExp from './unwrapExp.js';

module.exports = function foovarFunc(outPath, options) {
  outPath = unwrapExp(eval(`(${ JSON.stringify(outPath) })`));
  if (outPath.__type !== 'String') {
    console.error('foovar outPath arg must be string');
    return;
  }
  outPath = outPath.val.trim();
  options = options || new this.renderer.nodes.Object();
  options = unwrapExp(eval(`(${ JSON.stringify(options) })`));
  const fullPath = /^\//.test(outPath) ? outPath : path.resolve(process.cwd(), outPath);
  let incReg = options.vals.include && unwrapExp(options.vals.include);
  let excReg = options.vals.exclude && unwrapExp(options.vals.exclude);
  incReg = incReg && incReg.__type === 'String' && new RegExp(incReg.val);
  excReg = excReg && excReg.__type === 'String' && new RegExp(excReg.val);

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
  var FoovarValue = require(${ process.env.BABEL_ENV === 'test' ? `'${ path.resolve(process.cwd(), 'src/index.js') }'` : '\'foovar\'' }).FoovarValue;

  module.exports = {
${ body }
  };
})();`;

  fs.writeFileSync(fullPath, codeStr, 'utf8');
  console.log(`foovar: generated ${ fullPath }`);
};
