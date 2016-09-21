import unwrapExp from './unwrapExp';
import resolveValue from './resolveValue.js';
import resolveType from './resolveType.js';
import resolveCss from './resolveCss.js';

export default class FoovarValue {
  constructor(stylusExpression) {
    const fn = function() {
      return fn.value;
    };

    fn.stylusExpression = stylusExpression;
    const foovarProto = Object.getPrototypeOf(this);
    Object.setPrototypeOf(foovarProto, Object.getPrototypeOf(fn));
    Object.setPrototypeOf(fn, foovarProto);
    return fn;
  }

  get isUnary() {
    return this.stylusExpression.__type !== 'Expression' || this.stylusExpression.nodes.length === 1;
  }

  get value() {
    if (this.isUnary) {
      return resolveValue(unwrapExp(this.stylusExpression));
    } else {
      return this.stylusExpression.nodes.map(exp => new this.constructor(exp));
    }
  }

  get type() {
    if (this.isUnary) {
      return resolveType(unwrapExp(this.stylusExpression));
    } else {
      return this.stylusExpression.isList ? 'list' : 'tuple';
    }
  }

  get css() {
    if (this.isUnary) {
      return resolveCss(unwrapExp(this.stylusExpression));
    } else {
      return void 0;
    }
  }
}
