import {DialogContent, DialogTitle, Tab, Tabs} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {ChangeEvent, Component, ReactNode} from 'react';
import styled from 'styled-components';

import {AccessDialogStore} from '../store';
import {DefaultDialogProps} from '../types/dialog';
// tslint:disable-next-line:import-path-shallowest
import {WizardDialog} from '../ui/dialog';
import {InjectStore} from '../utils';

import {Login} from './@login';
import {Register} from './register';

interface RegisterProps extends DefaultDialogProps {}

const DialogTitleBlue = styled(DialogTitle)<any>`
  padding: 0px !important;
  background: ${props => props.theme.primaryColor};
`;

const AccessTab = styled(Tab)<any>`
  width: 250px;
  height: 60px;
  color: white !important;
`;

@observer
export class Access extends Component<RegisterProps> {
  @observable
  private tabTag = 1;

  private accessComponents = [<Register />, <Login />];

  @InjectStore(AccessDialogStore)
  private accessDialogStore!: AccessDialogStore;

  handleTabChange(_event: ChangeEvent<{}>, val: number): void {
    this.tabTag = val;
  }

  render(): ReactNode {
    const viewComponent = this.accessComponents[this.tabTag];

    return (
      <WizardDialog open={this.accessDialogStore.isAccessView}>
        <DialogTitleBlue>
          <Tabs
            value={this.tabTag}
            onChange={(event, val) => this.handleTabChange(event, val)}
          >
            <AccessTab color="white" label="注册" />
            <AccessTab color="white" label="登录" />
          </Tabs>
        </DialogTitleBlue>
        <DialogContent>{viewComponent}</DialogContent>
      </WizardDialog>
    );
  }
}
