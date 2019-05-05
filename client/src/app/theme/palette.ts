import {blue, red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#f06292',
    },
    error: red,
    type: 'light', // mode: light dark
  },
});
