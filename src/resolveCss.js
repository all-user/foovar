import unwrapExp from './unwrapExp.js';
import resolveValue from './resolveValue.js';

export default function resolveCss(node) {
  switch (node.__type) {
  case 'Unit':
    return `${ node.val }${ node.type }`;
  case 'String':
    return node.val;
  case 'RGBA':
    if (node.raw) {
      return node.raw;
    } else {
      const vals = resolveValue(node);
      return `rgba(${ vals.join(',') })`;
    }
  case 'HSLA':
    {
      const vals = resolveValue(node);
      const units = ['', '%', '%', ''];
      return `hsla(${ vals.map((v, i) => v + units[i]).join(',') })`;
    }
  case 'Call':
    return resolveCssOfCall(node);
  case 'Object':
    return void 0;
  default:
    console.error(`Can't resolve stylus node CSS string: ${ node.__type }`);
  }
}

function resolveCssOfCall(node) {
  switch (node.name) {
  case 'cubic-bezier':
    {
      return `cubic-bezier(${ resolveValue(node).join(',') })`;
    }
  default:
    console.error(`Can't resolve stylus.nodes.Call CSS string: ${ node.name }`);
  }
}
