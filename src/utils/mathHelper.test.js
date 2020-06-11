import mathHelper from './mathHelper'

test('vectorToGradientFunction example 1', () => {
  const vector = [3, 2]
  const point = [8, 4]
  const gradientFunction = mathHelper.vectorToGradientFunction(vector[0], vector[1], point[0], point[1])
  expect(gradientFunction.gradient).toBeCloseTo(2 / 3)
  expect(gradientFunction.c).toBeCloseTo(-4 / 3)
})

test('lineIntersection example 1', () => {
  const result = mathHelper.lineIntersection(2, 0, -1, 6)
  expect(result).toEqual([2, 4])
})
