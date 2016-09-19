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

describe('export string var:', () => {
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
    assert.equal(vars.varName(), 'some string');
  });

  it('typeof', () => {
    assert.equal(typeof vars.varName(), 'string');
  });

  it('stylus node type', () => {
    assert.equal(vars.varName.type, 'string');
  });

  it('stylus css string', () => {
    assert.equal(vars.varName.css, 'some string');
  });
});
