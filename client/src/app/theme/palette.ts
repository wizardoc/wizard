import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#1976d2',
    },
    secondary: {
      main: '#f06292',
    },
    error: red,
    type: 'light', // mode: light dark
  },
});
