import { orange, green, red, purple } from '@material-ui/core/colors'

const componentColorer = (n) => {
  switch (n) {
    case 0:
      return orange['500']
    case 1:
      return green['500']
    case 2:
      return red['500']
    default:
      return purple['500']
  }
}

export default componentColorer
