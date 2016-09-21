import unwrapExp from './unwrapExp.js';

export default function isUnary(exp) {
  return exp.__type !== 'Expression' || exp.nodes.length === 1;
}
