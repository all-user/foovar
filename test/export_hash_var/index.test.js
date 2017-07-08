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

describe('export hash var:', () => {
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

  it('outer value', () => {
    assert.strictEqual(vars.varName().stringVar(), 'outer');
  });

  it('inner value', () => {
    assert.strictEqual(vars.varName().nested().stringVar(), 'inner');
  });

  it('typeof values', () => {
    assert.strictEqual(typeof vars.varName().stringVar(), 'string');
    assert.strictEqual(typeof vars.varName().nested().stringVar(), 'string');
  });

  it('stylus node type', () => {
    assert.strictEqual(vars.varName.type, 'hash');
    assert.strictEqual(vars.varName().nested.type, 'hash');
  });

  it('stylus node type of values', () => {
    assert.strictEqual(vars.varName().stringVar.type, 'string');
    assert.strictEqual(vars.varName().nested().stringVar.type, 'string');
  });

  it('stylus css string', () => {
    assert.strictEqual(vars.varName().stringVar.css, 'outer');
    assert.strictEqual(vars.varName().nested().stringVar.css, 'inner');
  });
});
