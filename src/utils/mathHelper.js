// takes a two-dimensional array of data points and returns their mean
const mean = data => {
  const sum = [
    data.map(value => value[0]).reduce((accumulator, value) => accumulator + value, 0),
    data.map(value => value[1]).reduce((accumulator, value) => accumulator + value, 0)
  ]
  return sum.map(value => value / data.length)
}

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
  mean,
  vectorToGradientFunction,
  lineIntersection,
}
