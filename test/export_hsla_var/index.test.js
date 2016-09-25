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

describe('export hsla var:', () => {
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

  it('hsl value', () => {
    assert.deepEqual(vars.varHslName(), [12, 34, 56, 1]);
  });

  it('hsla value', () => {
    assert.deepEqual(vars.varHslaName(), [12, 34, 56, .7]);
  });

  it('hsl stylus node type', () => {
    assert.equal(vars.varHslName.type, 'hsla');
  });

  it('hsla stylus node type', () => {
    assert.equal(vars.varHslaName.type, 'hsla');
  });

  it('hsl css string', () => {
    assert.equal(vars.varHslName.css, 'hsla(12,34%,56%,1)');
  });

  it('hsla css string', () => {
    assert.equal(vars.varHslaName.css, 'hsla(12,34%,56%,0.7)');
  });
});
