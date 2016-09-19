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

describe('export cubic-bezier var:', () => {
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

  it('positive value', () => {
    assert.deepEqual(vars.varNamePosi(), [1, 0, 1, 0]);
  });

  it('negative value', () => {
    assert.deepEqual(vars.varNameNega(), [-1, 0, -1, 0]);
  });

  it('positive value: stylus node type', () => {
    assert.equal(vars.varNamePosi.type, 'cubic-bezier');
  });

  it('negative value: stylus node type', () => {
    assert.equal(vars.varNameNega.type, 'cubic-bezier');
  });

  it('positive value: stylus css string', () => {
    assert.equal(vars.varNamePosi.css, 'cubic-bezier(1, 0, 1, 0)');
  });

  it('negative value: stylus css string', () => {
    assert.equal(vars.varNameNega.css, 'cubic-bezier(-1, 0, -1, 0)');
  });
});
