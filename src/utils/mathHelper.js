// converts vector (a,b) with point (px,py) into a Steigungsfunktion
const vectorToGradientFunction = (a, b, px, py) => {
  const gradient = b / a
  const c = py - gradient * px
  return { gradient, c }
}

const lineIntersection = (gradient1, c1, gradient2, c2) => {
  const a = gradient1
  const b = gradient2
  const c = c1
  const d = c2
  return [
    (d - c) / (a - b),
    a * ((d - c) / (a - b)) + c,
  ]
}

export default {
  vectorToGradientFunction,
  lineIntersection,
}
