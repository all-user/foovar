import assert from 'assert';
import stylus from 'stylus';
import Promise from 'bluebird';
import path from 'path';
import _fs from 'fs';
import _rimraf from 'rimraf';
import convertToPlainObject from '../../src/convertToPlainObject.js';

const rimraf = Promise.promisify(_rimraf);
const fs = Promise.promisifyAll(_fs);

const OUT_PATH = path.resolve(__dirname, './vars.js');
const SOURCE_PATH = path.resolve(__dirname, './vars.styl');

describe('convertToPlainObject', () => {
  describe('from type', () => {
    let vars;
    let nestedVars;
    let varsTuple;
    let varsList;
    before(() => {
      return Promise
        .try(() => rimraf(OUT_PATH))
        .then(() => fs.readFileAsync(SOURCE_PATH, 'utf8'))
        .then(stylusStr => {
          stylus(stylusStr)
            .use(require(path.resolve(process.cwd(), './src/index.js'))())
            .render(() => {
              vars = require(OUT_PATH);
              vars = convertToPlainObject(vars.varObj, { from: 'type' });
              nestedVars = vars.varNestedObj;
              varsTuple = vars.varObjTuple;
              varsList = vars.varObjList;
            });
        });
    });

    it('number', () => {
      assert.strictEqual(vars.varNumber, undefined);
    });

    it('string', () => {
      assert.strictEqual(vars.varString, 'string');
    });

    it('true', () => {
      assert.strictEqual(vars.varTrue, 'boolean');
    });

    it('false', () => {
      assert.strictEqual(vars.varFalse, 'boolean');
    });

    it('null', () => {
      assert.strictEqual(vars.varNull, 'null');
    });

    it('ident', () => {
      assert.strictEqual(vars.varIdent, 'ident');
    });

    it('unit', () => {
      assert.strictEqual(vars.varUnit, 'px');
    });

    it('rgba', () => {
      assert.deepEqual(vars.varRgba, 'rgba');
    });

    it('list', () => {
      assert.deepEqual(vars.varList, ['px', 'px', 'px', 'px']);
    });

    it('tuple', () => {
      assert.deepEqual(vars.varTuple, ['px', 'px', 'px', 'px']);
    });

    it('tuple list', () => {
      assert.deepEqual(vars.varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
    });

    it('list tuple', () => {
      assert.deepEqual(vars.varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
    });

    it('tuples', () => {
      assert.deepEqual(vars.varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
    });

    it('lists', () => {
      assert.deepEqual(vars.varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
    });

    describe('nested values', () => {
      it('number', () => {
        assert.strictEqual(nestedVars.varNumber, undefined);
      });

      it('string', () => {
        assert.strictEqual(nestedVars.varString, 'string');
      });

      it('true', () => {
        assert.strictEqual(nestedVars.varTrue, 'boolean');
      });

      it('false', () => {
        assert.strictEqual(nestedVars.varFalse, 'boolean');
      });

      it('null', () => {
        assert.strictEqual(nestedVars.varNull, 'null');
      });

      it('ident', () => {
        assert.strictEqual(nestedVars.varIdent, 'ident');
      });

      it('unit', () => {
        assert.strictEqual(nestedVars.varUnit, 'px');
      });

      it('rgba', () => {
        assert.deepEqual(nestedVars.varRgba, 'rgba');
      });

      it('list', () => {
        assert.deepEqual(nestedVars.varList, ['px', 'px', 'px', 'px']);
      });

      it('tuple', () => {
        assert.deepEqual(nestedVars.varTuple, ['px', 'px', 'px', 'px']);
      });

      it('tuple list', () => {
        assert.deepEqual(nestedVars.varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('list tuple', () => {
        assert.deepEqual(nestedVars.varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('tuples', () => {
        assert.deepEqual(nestedVars.varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('lists', () => {
        assert.deepEqual(nestedVars.varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });
    });

    describe('nested tuple', () => {
      it('number', () => {
        assert.strictEqual(varsTuple[0].varNumber, undefined);
        assert.strictEqual(varsTuple[1].varNumber, undefined);
      });

      it('string', () => {
        assert.strictEqual(varsTuple[0].varString, 'string');
        assert.strictEqual(varsTuple[1].varString, 'string');
      });

      it('true', () => {
        assert.strictEqual(varsTuple[0].varTrue, 'boolean');
        assert.strictEqual(varsTuple[1].varTrue, 'boolean');
      });

      it('false', () => {
        assert.strictEqual(varsTuple[0].varFalse, 'boolean');
        assert.strictEqual(varsTuple[1].varFalse, 'boolean');
      });

      it('null', () => {
        assert.strictEqual(varsTuple[0].varNull, 'null');
        assert.strictEqual(varsTuple[1].varNull, 'null');
      });

      it('ident', () => {
        assert.strictEqual(varsTuple[0].varIdent, 'ident');
        assert.strictEqual(varsTuple[1].varIdent, 'ident');
      });

      it('unit', () => {
        assert.strictEqual(varsTuple[0].varUnit, 'px');
        assert.strictEqual(varsTuple[1].varUnit, 'px');
      });

      it('rgba', () => {
        assert.deepEqual(varsTuple[0].varRgba, 'rgba');
        assert.deepEqual(varsTuple[1].varRgba, 'rgba');
      });

      it('list', () => {
        assert.deepEqual(varsTuple[0].varList, ['px', 'px', 'px', 'px']);
        assert.deepEqual(varsTuple[1].varList, ['px', 'px', 'px', 'px']);
      });

      it('tuple', () => {
        assert.deepEqual(varsTuple[0].varTuple, ['px', 'px', 'px', 'px']);
        assert.deepEqual(varsTuple[1].varTuple, ['px', 'px', 'px', 'px']);
      });

      it('tuple list', () => {
        assert.deepEqual(varsTuple[0].varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsTuple[1].varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('list tuple', () => {
        assert.deepEqual(varsTuple[0].varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsTuple[1].varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('tuples', () => {
        assert.deepEqual(varsTuple[0].varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsTuple[1].varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('lists', () => {
        assert.deepEqual(varsTuple[0].varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsTuple[1].varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });
    });

    describe('nested list', () => {
      it('number', () => {
        assert.strictEqual(varsList[0].varNumber, undefined);
        assert.strictEqual(varsList[1].varNumber, undefined);
      });

      it('string', () => {
        assert.strictEqual(varsList[0].varString, 'string');
        assert.strictEqual(varsList[1].varString, 'string');
      });

      it('true', () => {
        assert.strictEqual(varsList[0].varTrue, 'boolean');
        assert.strictEqual(varsList[1].varTrue, 'boolean');
      });

      it('false', () => {
        assert.strictEqual(varsList[0].varFalse, 'boolean');
        assert.strictEqual(varsList[1].varFalse, 'boolean');
      });

      it('null', () => {
        assert.strictEqual(varsList[0].varNull, 'null');
        assert.strictEqual(varsList[1].varNull, 'null');
      });

      it('ident', () => {
        assert.strictEqual(varsList[0].varIdent, 'ident');
        assert.strictEqual(varsList[1].varIdent, 'ident');
      });

      it('unit', () => {
        assert.strictEqual(varsList[0].varUnit, 'px');
        assert.strictEqual(varsList[1].varUnit, 'px');
      });

      it('rgba', () => {
        assert.deepEqual(varsList[0].varRgba, 'rgba');
        assert.deepEqual(varsList[1].varRgba, 'rgba');
      });

      it('list', () => {
        assert.deepEqual(varsList[0].varList, ['px', 'px', 'px', 'px']);
        assert.deepEqual(varsList[1].varList, ['px', 'px', 'px', 'px']);
      });

      it('tuple', () => {
        assert.deepEqual(varsList[0].varTuple, ['px', 'px', 'px', 'px']);
        assert.deepEqual(varsList[1].varTuple, ['px', 'px', 'px', 'px']);
      });

      it('tuple list', () => {
        assert.deepEqual(varsList[0].varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsList[1].varTupleList, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('list tuple', () => {
        assert.deepEqual(varsList[0].varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsList[1].varListTuple, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('tuples', () => {
        assert.deepEqual(varsList[0].varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsList[1].varTuples, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });

      it('lists', () => {
        assert.deepEqual(varsList[0].varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
        assert.deepEqual(varsList[1].varLists, [['px', 'px', 'px', 'px'], ['px', 'px', 'px', 'px']]);
      });
    });
  });
});
