import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {AccessDialogStore} from '../store';
import {InjectStore} from '../utils';

@observer
export class Login extends Component {
  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  render(): ReactNode {
    return (
      <Dialog open={this.accessDialogStore.isLoginView}>
        <DialogTitle>登陆</DialogTitle>
        <DialogContent>login</DialogContent>
      </Dialog>
    );
  }
}
