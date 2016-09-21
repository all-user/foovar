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

describe('export rgba var:', () => {
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

  it('hex value', () => {
    assert.deepEqual(vars.varNameHex(), [0x11, 0x22, 0x33, 0xFF / 0xFF]);
  });

  it('hex alpha value', () => {
    assert.deepEqual(vars.varNameHexAlpha(), [0x11, 0x22, 0x33, 0x44 / 0xFF]);
  });

  it('rgb value', () => {
    assert.deepEqual(vars.varNameRgb(), [12, 34, 56, 1]);
  });

  it('rgba value', () => {
    assert.deepEqual(vars.varNameRgba(), [12, 34, 56, .7]);
  });

  it('hex value: stylus node type', () => {
    assert.equal(vars.varNameHex.type, 'rgba');
  });

  it('hex alpha value: stylus node type', () => {
    assert.equal(vars.varNameHexAlpha.type, 'rgba');
  });

  it('rgb value: stylus node type', () => {
    assert.equal(vars.varNameRgb.type, 'rgba');
  });

  it('rgba value: stylus node type', () => {
    assert.equal(vars.varNameRgba.type, 'rgba');
  });

  it('hex value: css string', () => {
    assert.equal(vars.varNameHex.css, '#112233');
  });

  it('hex alpha value: css string', () => {
    assert.equal(vars.varNameHexAlpha.css, '#11223344');
  });

  it('rgb value: css string', () => {
    assert.equal(vars.varNameRgb.css, 'rgba(12,34,56,1)');
  });

  it('rgba value: css string', () => {
    assert.equal(vars.varNameRgba.css, 'rgba(12,34,56,0.7)');
  });
});
