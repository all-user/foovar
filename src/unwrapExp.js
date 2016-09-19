export default function unwrapExp(exp) {
  if (exp.constructor.name === 'Expression') {
    return unwrapExp(exp.nodes[0]);
  } else {
    return exp;
  }
}
