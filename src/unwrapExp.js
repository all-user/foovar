export default function unwrapExp(exp) {
  if (exp.__type === 'Expression') {
    return unwrapExp(exp.nodes[0]);
  } else {
    return exp;
  }
}
