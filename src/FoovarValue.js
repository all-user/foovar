import unwrapExp from './unwrapExp';
import isUnary from './isUnary';
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

  get value() {
    const exp = unwrapExp(this.stylusExpression);
    if (isUnary(exp)) {
      return resolveValue(exp);
    } else {
      return this.stylusExpression.nodes.map(exp => new this.constructor(unwrapExp(exp)));
    }
  }

  get type() {
    const exp = unwrapExp(this.stylusExpression);
    if (isUnary(exp)) {
      return resolveType(exp);
    } else {
      return exp.isList ? 'list' : 'tuple';
    }
  }

  get css() {
    const exp = unwrapExp(this.stylusExpression);
    if (isUnary(exp)) {
      return resolveCss(exp);
    } else {
      return void 0;
    }
  }
}
