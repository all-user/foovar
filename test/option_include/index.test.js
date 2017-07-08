import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';
import _rimraf from 'rimraf';

const rimraf = Promise.promisify(_rimraf);
const fs = Promise.promisifyAll(_fs);

const OUT_PATH = path.resolve(__dirname, './vars.js');
const SOURCE_PATH = path.resolve(__dirname, './vars.styl');

describe('include option:', () => {
  let vars;
  before(() => {
    return Promise
      .try(() => rimraf(OUT_PATH))
      .then(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => {
        stylus(stylusStr)
          .use(require(path.resolve(process.cwd(), './src/index.js'))())
          .render(() => {
            vars = require(OUT_PATH);
          });
      });
  });

  it('only matched var name exists', () => {
    assert.strictEqual(vars.fooVarName(), 'some string');
    assert.strictEqual(vars.barVarName, void 0);
    assert.strictEqual(vars.bazVarName, void 0);
  });
});
