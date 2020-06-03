import { indigo, orange, red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
    error: {
      main: red.A400,
    },
    background: {
      default: '#e1e2e1',
    },
  },
});

export default theme;
