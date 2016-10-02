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

  let { include, exclude, noGeneratedLog, compress } = optionsResolver(options);
  const incReg = include && include.constructorName === 'String' && new RegExp(include.val);
  const excReg = exclude && exclude.constructorName === 'String' && new RegExp(exclude.val);
  const noGen = noGeneratedLog && noGeneratedLog.val;
  const comp = compress && !!compress.val;

  mkdirp.sync(path.dirname(fullPath));
  const ignoreKeys = [
    'column',
    'filename',
    'lineno',
    'mixin',
    'preserve',
    'property',
    'quote',
    'rest',
  ];
  const replacer = (k, v) => {
    return ~ignoreKeys.indexOf(k) ? void 0 : v;
  };
  const body = Object.keys(this.global.scope.locals)
    .map(k => [k, this.global.scope.locals[k]])
    .filter(([k, v]) => {
      if (/Function/.test(v.constructor.name)) return false;
      if (incReg && !incReg.test(k)) return false;
      if (excReg && excReg.test(k)) return false;
      return true;
    })
    .map(([k, v]) => {
      return `${ Case.camel(k) }: new F(new S(${ JSON.stringify(v, replacer, 0) }, true))`.replace(/^(.+)$/gm, '$1');
    })
    .join(comp ? ',' : ',\n');

  const codeStr = `(function(){var F=require(${ TEST ? `'${ path.resolve(process.cwd(), 'src/FoovarValue.js') }'` : '\'foovar/lib/FoovarValue\'' });var S=require(${ TEST ? `'${ path.resolve(process.cwd(), 'src/StylusExpression.js') }'` : '\'foovar/lib/StylusExpression\'' });module.exports={${ body }};})();`;

  fs.writeFileSync(fullPath, codeStr, 'utf8');
  if (!noGen) { console.log(`foovar: generated ${ fullPath }`); }
};

function optionsResolver(options) {
  options = new StylusExpression(options || new this.renderer.nodes.Object()).unwrap();
  if (options.constructorName !== 'Object') {
    console.error('foovar options arg must be object');
    return {};
  }
  return Object.keys(options.vals).reduce((unwrapped, k) => {
    unwrapped[k] = options.vals[k] && new StylusExpression(options.vals[k]).unwrap();
    return unwrapped;
  }, {});
}
