import StylusExpression from './StylusExpression.js';
import Case from 'case';

module.exports = class FoovarValue {
  constructor(stylusExpression) {
    const fn = function() {
      return fn.value;
    };

    fn.exp = stylusExpression;
    const foovarProto = Object.getPrototypeOf(this);
    Object.setPrototypeOf(foovarProto, Object.getPrototypeOf(fn));
    Object.setPrototypeOf(fn, foovarProto);
    return fn;
  }

  get value() {
    const exp = this.exp.unwrap();
    if (exp.isUnary()) {
      return this.constructor.resolveValue(exp);
    } else {
      return exp.nodes.map(raw => new this.constructor(new StylusExpression(raw, exp.fromJson).unwrap()));
    }
  }

  get type() {
    const exp = this.exp.unwrap();
    if (exp.isUnary()) {
      return this.constructor.resolveType(exp);
    } else {
      return exp.isList ? 'list' : 'tuple';
    }
  }

  get css() {
    const exp = this.exp.unwrap();
    if (exp.isUnary()) {
      return this.constructor.genCss(exp);
    } else {
      return void 0;
    }
  }

  static genCss(exp) {
    switch (exp.constructorName) {
    case 'Unit':
      return this.genUnitCss(exp);
    case 'String':
      return this.genStringCss(exp);
    case 'RGBA':
      return this.genRgbaCss(exp);
    case 'HSLA':
      return this.genHslaCss(exp);
    case 'Call':
      switch (exp.name) {
      case 'cubic-bezier':
        return this.genCubicBezierCss(exp);
      default:
        console.error(`Can't generate CSS string: stylus.nodes.Call ${ exp.name }`);
        return;
      }
    case 'Object':
      return void 0;
    default:
      console.error(`Can't generate CSS string: ${ exp.constructorName }`);
    }
  }

  static genUnitCss(exp) {
    return `${ exp.val }${ exp.type }`;
  }

  static genStringCss(exp) {
    return exp.val;
  }

  static genRgbaCss(exp) {
    if (exp.raw) {
      return exp.raw;
    } else {
      const vals = this.resolveValue(exp);
      return `rgba(${ vals.join(',') })`;
    }
  }

  static genHslaCss(exp) {
    const vals = this.resolveValue(exp);
    const units = ['', '%', '%', ''];
    return `hsla(${ vals.map((v, i) => v + units[i]).join(',') })`;
  }

  static genCubicBezierCss(exp) {
    return `cubic-bezier(${ this.resolveValue(exp).join(',') })`;
  }

  static resolveType(exp) {
    switch (exp.constructorName) {
    case 'Unit':
      return exp.type || void 0;
    case 'String':
      return 'string';
    case 'RGBA':
      return 'rgba';
    case 'HSLA':
      return 'hsla';
    case 'Object':
      return 'hash';
    case 'Call':
      switch (exp.name) {
      case 'cubic-bezier':
        return exp.name;
      default:
        console.error(`Can't resolve type: stylus.nodes.Call ${ exp.name }`);
        return;
      }
    default:
      console.error(`Can't resolve type: ${ exp.constructorName }`);
    }
  }

  static resolveValue(exp) {
    switch (exp.constructorName) {
    case 'Unit':
    case 'String':
      return exp.val;
    case 'RGBA':
      return this.resolveRgbaValue(exp);
    case 'HSLA':
      return this.resolveHslaValue(exp);
    case 'Object':
      return this.resolveObjectValue(exp);
    case 'Call':
      switch (exp.name) {
      case 'cubic-bezier':
        return this.resolveCubicBezireValue(exp);
      default:
        console.error(`Can't resolve value: stylus.nodes.Call ${ this.name }`);
        return;
      }
    default:
      console.error(`Can't resolve value: ${ exp.constructorName }`);
    }
  }

  static resolveRgbaValue(exp) {
    const { r, g, b, a } = exp;
    return [r, g, b, a];
  }

  static resolveHslaValue(exp) {
    const { h, s, l, a } = exp;
    return [h, s, l, a];
  }

  static resolveObjectValue(exp) {

    return Object.keys(exp.vals).reduce((o, k) => {
      const v = exp.vals[k];
      o[Case.camel(k)] = new this(new StylusExpression(v, exp.fromJson));
      return o;
    }, {});
  }

  static resolveCubicBezireValue(exp) {
    return exp.args.nodes.map(raw => new this(new StylusExpression(raw, exp.fromJson).unwrap())());
  }
};
