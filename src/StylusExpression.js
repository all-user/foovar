module.exports = class StylusExpression {
  constructor(rawExp, fromJson) {
    this.rawExp = rawExp;
    this.fromJson = fromJson;
  }

  get constructorName() { return this.fromJson ? this.rawExp.__type : this.rawExp.constructor.name; }
  get type() { return this.rawExp.type; }
  get val() { return this.rawExp.val; }
  get vals() { return this.rawExp.vals; }
  get args() { return this.rawExp.args; }
  get nodes() { return this.rawExp.nodes; }
  get isList() { return this.rawExp.isList; }
  get name() { return this.rawExp.name; }
  get raw() { return this.rawExp.raw; }
  get r() { return this.rawExp.r; }
  get g() { return this.rawExp.g; }
  get b() { return this.rawExp.b; }
  get h() { return this.rawExp.h; }
  get s() { return this.rawExp.s; }
  get l() { return this.rawExp.l; }
  get a() { return this.rawExp.a; }

  unwrap() {
    if (this.constructorName === 'Expression' && this.nodes.length === 1) {
      return new this.constructor(this.nodes[0], this.fromJson).unwrap();
    } else {
      return this;
    }
  }

  isUnary() {
    return this.constructorName !== 'Expression' || this.nodes.length === 1;
  }
};
