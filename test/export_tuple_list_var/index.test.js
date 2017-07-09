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

describe('export tuple list var:', () => {
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
    const ret = vars.varName().map(
      node => node().map(
        node => node()
      )
    );
    assert.deepEqual(ret, [[1, 2, 3, 4], [5, 6, 7, 8]]);
  });

  it('box-shadow value', () => {
    const ret = vars.varBoxShadowName().map(
      node => node().map(
        node => node()
      )
    );
    assert.deepEqual(ret, [[1, 2, 3, 4, [0,0,0,.4], 'inset'], [5, 6, 7, 8, [0,0,0,.2], 'inset']]);
  });

  it('typeof', () => {
    const ret = vars.varName().map(
      node => node().map(
        node => typeof node()
      )
    );
    assert.deepEqual(ret, [['number', 'number', 'number', 'number'], ['number', 'number', 'number', 'number']]);
  });

  it('box-shadow typeof', () => {
    const ret = vars.varBoxShadowName().map(
      node => node().map(
        node => typeof node()
      )
    );
    assert.deepEqual(ret, [['number', 'number', 'number', 'number', 'object', 'string'], ['number', 'number', 'number', 'number', 'object', 'string']]);
  });

  it('stylus node type', () => {
    assert.strictEqual(vars.varName.type, 'list');
    assert.deepEqual(vars.varName().map(e => e.type), ['tuple', 'tuple']);
  });

  it('box-shadow stylus node type', () => {
    assert.strictEqual(vars.varBoxShadowName.type, 'list');
    assert.deepEqual(vars.varName().map(e => e.type), ['tuple', 'tuple']);
  });

  it('stylus node type of values', () => {
    const ret = vars.varName().map(
      node => node().map(
        node => node.type
      )
    );
    assert.deepEqual(ret, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
  });

  it('box-shadow stylus node type of values', () => {
    const ret = vars.varBoxShadowName().map(
      node => node().map(
        node => node.type
      )
    );
    assert.deepEqual(ret, [['px', 'px', 'px', 'px', 'rgba', 'ident'], ['px', 'px', 'px', 'px', 'rgba', 'ident']]);
  });

  it('stylus css string', () => {
    const ret = vars.varName().map(
      node => node().map(
        node => node.css
      )
    );
    assert.deepEqual(ret, [['1px', '2px', '3px', '4px'], ['5px', '6px', '7px', '8px']]);
  });

  it('box-shadow stylus css string', () => {
    const ret = vars.varBoxShadowName().map(
      node => node().map(
        node => node.css
      )
    );
    assert.deepEqual(ret, [['1px', '2px', '3px', '4px', 'rgba(0,0,0,0.4)', 'inset'], ['5px', '6px', '7px', '8px', 'rgba(0,0,0,0.2)', 'inset']]);
  });
});
