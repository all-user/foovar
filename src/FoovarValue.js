import unwrapExp from './unwrapExp';
import resolveValue from './resolveValue.js';
import resolveType from './resolveType.js';
import resolveCss from './resolveCss.js';

class FoovarValueBase {
  constructor(stylusExpression) {
    this.stylusExpression = stylusExpression;
  }

  get type() {
    if (this.stylusExpression.nodes.length === 1) {
      return resolveType(unwrapExp(this.stylusExpression));
    } else {
      return this.stylusExpression.isList ? 'list' : 'tuple';
    }
  }

  get css() {
    if (this.stylusExpression.nodes.length === 1) {
      return resolveCss(unwrapExp(this.stylusExpression));
    } else {
      return void 0;
    }
  }
}

export default class FoovarValue extends FoovarValueBase {
  constructor() {
    const fn = function() {
      return resolveValue(this.stylusExpression);
    };
    super(fn);
    return fn;
  }
}
