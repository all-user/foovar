export default function unwrapExp(exp) {
  if (exp.__type === 'Expression' && exp.nodes.length === 1) {
    return unwrapExp(exp.nodes[0]);
  } else {
    return exp;
  }
}
