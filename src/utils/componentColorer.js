/**
 * single source of truth for how the components are colored
 * @param {number} n - number of the component
 * @returns {string} color hex-code
 */
const componentColorer = (n) => {
  switch (n) {
    case 0:
      return '#ff9e1b'
    case 1:
      return '#c4d52a'
    case 2:
      return '#7c8034'
    default:
      return '#cccccc'
  }
}

export default componentColorer
