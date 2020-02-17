import 'react-router-dom';
import 'notistack';

declare module 'react-router-dom' {
  export function withRouter(component: any): any;
}

declare module 'notistack' {
  export function withSnackbar(component: any): any;
}
