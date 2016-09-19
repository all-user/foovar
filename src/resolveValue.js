import unwrapExp from './unwrapExp.js';

export default function resolveValue(node) {
  switch (node.constructor.name) {
  case 'Unit':
    return node.val;
  case 'String':
    return node.string;
  case 'RGBA':
    {
      const { r, g, b, a } = node;
      return [r, g, b, a];
    }
  case 'HSLA':
    {
      const { h, s, l, a } = node;
      return [h, s, l, a];
    }
  case 'Call':
    return resolveValueOfCall(node);
  default:
    console.error(`Can't resolve stylus node value: ${ node.constructor.name }`);
  }

}

function resolveValueOfCall(node) {
  switch (node.name) {
  case 'cubic-bezier':
    {
      return node.args.nodes.map(exp => unwrapExp(exp).val);
    }
  default:
    console.error(`Can't resolve stylus.nodes.Call value: ${ node.name }`);
  }
}
