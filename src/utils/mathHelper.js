/**
 * calculate mean data point of a two-dimensional array of data points
 * @param data
 * @returns {number[]} array of form [x, y] with x and y being the averages of their respective axis
 */
const mean = (data) => {
  const sum = [
    data
      .map((value) => value[0])
      .reduce((accumulator, value) => accumulator + value, 0),
    data
      .map((value) => value[1])
      .reduce((accumulator, value) => accumulator + value, 0),
  ]
  return sum.map((value) => value / data.length)
}

/**
 * converts vector (a,b) with point (px,py) into a gradient function
 * @param {number} a - first number of vector (a,b)
 * @param {number} b - second number of vector (a,b)
 * @param {number} px - x coordinate of the point
 * @param {number} py - y coordinate of the point
 * @returns {{c: number, gradient: number}} parameters of the equation f(x) = gradient * x + c
 */
const vectorToGradientFunction = (a, b, px, py) => {
  const gradient = b / a
  const c = py - gradient * px
  return { gradient, c }
}

/**
 * Calculates where two lines intersect
 * @param gradient1 - gradient of the first line
 * @param c1 - y axis intercept of the first line
 * @param gradient2 - gradient of the second line
 * @param c2 - y axis intercept of the second line
 * @returns {(number)[]} point where the lines intercept
 */
const lineIntersection = (gradient1, c1, gradient2, c2) => {
  const a = gradient1
  const b = gradient2
  const c = c1
  const d = c2
  return [(d - c) / (a - b), a * ((d - c) / (a - b)) + c]
}

export default {
  mean,
  vectorToGradientFunction,
  lineIntersection,
}
