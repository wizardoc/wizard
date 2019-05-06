import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import React, {Component, ReactNode} from 'react';

import {AccessDialogStore} from '../store';
import {DefaultDialogProps} from '../types/dialog';
import {InjectStore} from '../utils';

interface RegisterProps extends DefaultDialogProps {}

export class Register extends Component<RegisterProps> {
  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  render(): ReactNode {
    return (
      <Dialog open={this.accessDialogStore.isRegisterView}>
        <DialogTitle>注册</DialogTitle>
        <DialogContent>ReactNode</DialogContent>
      </Dialog>
    );
  }
}
