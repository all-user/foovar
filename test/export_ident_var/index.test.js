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

describe('export ident var:', () => {
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

  it('value', () => {
    assert.strictEqual(vars.varName(), 'auto');
  });

  it('typeof', () => {
    assert.strictEqual(typeof vars.varName(), 'string');
  });

  it('stylus node type', () => {
    assert.strictEqual(vars.varName.type, 'ident');
  });

  it('stylus css string', () => {
    assert.strictEqual(vars.varName.css, 'auto');
  });
});
