'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StylusExpression = function () {
  function StylusExpression(rawExp, fromJson) {
    _classCallCheck(this, StylusExpression);

    this.rawExp = rawExp;
    this.fromJson = fromJson;
  }

  _createClass(StylusExpression, [{
    key: 'unwrap',
    value: function unwrap() {
      if (this.constructorName === 'Expression' && this.nodes.length === 1) {
        return new this.constructor(this.nodes[0], this.fromJson).unwrap();
      } else {
        return this;
      }
    }
  }, {
    key: 'isUnary',
    value: function isUnary() {
      return this.constructorName !== 'Expression' || this.nodes.length === 1;
    }
  }, {
    key: 'constructorName',
    get: function get() {
      return this.fromJson ? this.rawExp.__type : this.rawExp.constructor.name;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.rawExp.type;
    }
  }, {
    key: 'val',
    get: function get() {
      return this.rawExp.val;
    }
  }, {
    key: 'vals',
    get: function get() {
      return this.rawExp.vals;
    }
  }, {
    key: 'args',
    get: function get() {
      return this.rawExp.args;
    }
  }, {
    key: 'nodes',
    get: function get() {
      return this.rawExp.nodes;
    }
  }, {
    key: 'isList',
    get: function get() {
      return this.rawExp.isList;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.rawExp.name;
    }
  }, {
    key: 'raw',
    get: function get() {
      return this.rawExp.raw;
    }
  }, {
    key: 'r',
    get: function get() {
      return this.rawExp.r;
    }
  }, {
    key: 'g',
    get: function get() {
      return this.rawExp.g;
    }
  }, {
    key: 'b',
    get: function get() {
      return this.rawExp.b;
    }
  }, {
    key: 'h',
    get: function get() {
      return this.rawExp.h;
    }
  }, {
    key: 's',
    get: function get() {
      return this.rawExp.s;
    }
  }, {
    key: 'l',
    get: function get() {
      return this.rawExp.l;
    }
  }, {
    key: 'a',
    get: function get() {
      return this.rawExp.a;
    }
  }]);

  return StylusExpression;
}();

exports.default = StylusExpression;