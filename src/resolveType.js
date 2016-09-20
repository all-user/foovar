export default function resolveType(node) {
  switch (node.__type) {
  case 'Unit':
    return node.type || void 0;
  case 'String':
    return 'string';
  case 'RGBA':
    return 'rgba';
  case 'HSLA':
    return 'hsla';
  case 'Object':
    return 'hash';
  case 'Call':
    return resolveTypeOfCall(node);
  default:
    console.error(`Can't resolve stylus node type: ${ node.__type }`);
  }
}

function resolveTypeOfCall(node) {
  switch (node.name) {
  case 'cubic-bezier':
    return node.name;
  default:
    console.error(`Can't resolve stylus.nodes.Call type: ${ node.name }`);
  }
}
