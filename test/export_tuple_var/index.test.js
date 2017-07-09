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

describe('export tuple var:', () => {
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
    const ret = vars.varName().map(node => node());
    assert.deepEqual(ret, [1, 2, 3, 4]);
  });

  it('typeof', () => {
    const ret = vars.varName().map(node => typeof node());
    assert.deepEqual(ret, ['number', 'number', 'number', 'number']);
  });

  it('stylus node type', () => {
    assert.strictEqual(vars.varName.type, 'tuple');
  });

  it('stylus node type of values', () => {
    const ret = vars.varName().map(node => node.type);
    assert.deepEqual(ret, ['px', 'px', 'px', 'px']);
  });

  it('stylus css string', () => {
    const ret = vars.varName().map(node => node.css);
    assert.deepEqual(ret, ['1px', '2px', '3px', '4px']);
  });
});
