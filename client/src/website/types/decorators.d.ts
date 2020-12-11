import 'react-router-dom';
import 'notistack';
import '@material-ui/core';

declare module 'react-router-dom' {
  export function withRouter(component: any): any;
}

declare module 'notistack' {
  export function withSnackbar(component: any): any;
}

declare module '@material-ui/core' {
  export function withStyles(...args: any[]): any;
}
