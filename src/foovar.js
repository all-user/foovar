import Case from 'case';
import path from 'path';
import mkdirp from 'mkdirp';
import fs from 'fs';
import StylusExpression from './StylusExpression.js';

module.exports = function foovarFunc(outPath, options) {
  const TEST = process.env.BABEL_ENV === '__foovar_internal_test__';
  outPath = new StylusExpression(outPath).unwrap();
  if (outPath.constructorName !== 'String') {
    console.error('foovar outPath arg must be string');
    return;
  }
  outPath = outPath.val.trim();
  const fullPath = /^\//.test(outPath) ? outPath : path.resolve(process.cwd(), outPath);
  options = new StylusExpression(options || new this.renderer.nodes.Object()).unwrap();
  if (options.constructorName !== 'Object') {
    console.error('foovar options arg must be object');
    return;
  }
  let incReg = options.vals.include && new StylusExpression(options.vals.include).unwrap();
  let excReg = options.vals.exclude && new StylusExpression(options.vals.exclude).unwrap();
  let noGeneratedLog = options.vals.noGeneratedLog && new StylusExpression(options.vals.noGeneratedLog).unwrap();
  incReg = incReg && incReg.constructorName === 'String' && new RegExp(incReg.val);
  excReg = excReg && excReg.constructorName === 'String' && new RegExp(excReg.val);
  noGeneratedLog = noGeneratedLog && noGeneratedLog.val;

  mkdirp.sync(path.dirname(fullPath));
  const body = Object.keys(this.global.scope.locals)
    .map(k => [k, this.global.scope.locals[k]])
    .filter(([k, v]) => {
      if (/Function/.test(v.constructor.name)) return false;
      if (incReg && !incReg.test(k)) return false;
      if (excReg && excReg.test(k)) return false;
      return true;
    })
    .map(([k, v]) => {
      return `${ Case.camel(k) }: new FoovarValue(new StylusExpression(${ JSON.stringify(v, null, 2) }, true))`.replace(/^(.+)$/gm, '    $1');
    })
    .join(',\n');

  const codeStr = `(function() {
  var FoovarValue = require(${ TEST ? `'${ path.resolve(process.cwd(), 'src/FoovarValue.js') }'` : '\'foovar/FoovarValue\'' });
  var StylusExpression = require(${ TEST ? `'${ path.resolve(process.cwd(), 'src/StylusExpression.js') }'` : '\'foovar/StylusExpression\'' });

  module.exports = {
${ body }
  };
})();`;

  fs.writeFileSync(fullPath, codeStr, 'utf8');
  if (!noGeneratedLog) { console.log(`foovar: generated ${ fullPath }`); }
};
