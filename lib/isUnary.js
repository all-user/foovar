'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUnary;

var _unwrapExp = require('./unwrapExp.js');

var _unwrapExp2 = _interopRequireDefault(_unwrapExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUnary(exp) {
  return exp.__type !== 'Expression' || exp.nodes.length === 1;
}