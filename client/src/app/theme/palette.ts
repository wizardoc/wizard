import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#2196f3',
      dark: '#212121',
    },
    secondary: {
      main: '#f06292',
    },
    error: red,
    type: 'dark', // mode: light dark
  },
});
