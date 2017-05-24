import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';
import _rimraf from 'rimraf';

const rimraf = Promise.promisify(_rimraf);
const fs = Promise.promisifyAll(_fs);

const CASES = ['raw', 'camel', 'pascal', 'kebab', 'snake', 'header', 'constant'];
const OUT_PATHS = CASES.map(c => {
  return path.resolve(__dirname, `./vars_${c}.js`);
});
const SOURCE_PATH = path.resolve(__dirname, './vars.styl');

describe('propertyCase option:', () => {
  before(() => {
    return Promise
      .try(() => {
        const removes = OUT_PATHS.map(p => new Promise(done => rimraf(p, done)));
        return Promise.all(removes);
      })
      .then(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
      .then(stylusStr => {
        stylus(stylusStr)
          .use(require(path.resolve(process.cwd(), './src/index.js'))())
          .render(() => {});
      });
  });

  it('raw', () => {
    const vars = require(path.resolve(__dirname, './vars_raw.js'));
    assert(vars['var-name']);
    assert(vars['var-name']()['hash var-name']);
    assert.strictEqual(vars['var-name']()['hash var-name'](), 10);
  });
  it('camel', () => {
    const vars = require(path.resolve(__dirname, './vars_camel.js'));
    assert(vars.varName);
    assert(vars.varName().hashVarName);
    assert.strictEqual(vars.varName().hashVarName(), 10);
  });
  it('pascal', () => {
    const vars = require(path.resolve(__dirname, './vars_pascal.js'));
    assert(vars.VarName);
    assert(vars.VarName().HashVarName);
    assert.strictEqual(vars.VarName().HashVarName(), 10);
  });
  it('kebab', () => {
    const vars = require(path.resolve(__dirname, './vars_kebab.js'));
    assert(vars['var-name']);
    assert(vars['var-name']()['hash-var-name']);
    assert.strictEqual(vars['var-name']()['hash-var-name'](), 10);
  });
  it('snake', () => {
    const vars = require(path.resolve(__dirname, './vars_snake.js'));
    assert(vars['var_name']);
    assert(vars['var_name']()['hash_var_name']);
    assert.strictEqual(vars['var_name']()['hash_var_name'](), 10);
  });
  it('header', () => {
    const vars = require(path.resolve(__dirname, './vars_header.js'));
    assert(vars['Var-Name']);
    assert(vars['Var-Name']()['Hash-Var-Name']);
    assert.strictEqual(vars['Var-Name']()['Hash-Var-Name'](), 10);
  });
  it('constant', () => {
    const vars = require(path.resolve(__dirname, './vars_constant.js'));
    assert(vars['VAR_NAME']);
    assert(vars['VAR_NAME']()['HASH_VAR_NAME']);
    assert.strictEqual(vars['VAR_NAME']()['HASH_VAR_NAME'](), 10);
  });
  it('default', () => {
    const vars = require(path.resolve(__dirname, './vars_default.js'));
    assert(vars['varName']);
    assert(vars['varName']()['hashVarName']);
    assert.strictEqual(vars['varName']()['hashVarName'](), 10);
  });
});
