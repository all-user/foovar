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

describe('export em var:', () => {
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

  it('value', () => {
    assert.equal(vars.varName(), 1);
  });

  it('typeof', () => {
    assert.equal(typeof vars.varName(), 'number');
  });

  it('stylus node type', () => {
    assert.equal(vars.varName.type, 'em');
  });

  it('css string', () => {
    assert.equal(vars.varName.css, '1em');
  });
});
