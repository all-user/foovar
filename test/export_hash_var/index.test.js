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
          .use(require(path.resolve(process.cwd(), './src/foovar.js')))
          .render(() => {
            vars = require(OUT_PATH);
          });
      });
  });

  it('outer value', () => {
    assert.equal(vars.varName().stringVar(), 'outer');
  });

  it('inner value', () => {
    assert.equal(vars.varName().nested().stringVar(), 'inner');
  });

  it('typeof values', () => {
    assert.equal(typeof vars.varName().stringVar(), 'string');
    assert.equal(typeof vars.varName().nested().stringVar(), 'string');
  });

  it('stylus node type', () => {
    assert.equal(vars.varName.type, 'hash');
    assert.equal(vars.varName().nested.type, 'hash');
  });

  it('stylus node type of values', () => {
    assert.equal(vars.varName().stringVar.type, 'string');
    assert.equal(vars.varName().nested().stringVar.type, 'string');
  });

  it('stylus css string', () => {
    assert.equal(vars.varName().stringVar.css, 'outer');
    assert.equal(vars.varName().nested().stringVar.type, 'inner');
  });
});
