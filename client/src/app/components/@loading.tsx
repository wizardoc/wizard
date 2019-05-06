import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@material-ui/core';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

// import '../types/images';

// tslint:disable-next-line:import-path-shallowest
import LoadingImg from '../assets/static/loading.gif';
import {LoadingStore} from '../store';
import {DefaultDialogProps} from '../types/dialog';
import {InjectStore} from '../utils';

export interface LoadingDialogProps extends DefaultDialogProps {}

const LoadingImage = styled.img`
  height: 250px;
`;

const GrayLoadingContent = styled(DialogContent)<any>`
  background: #e1e1e1;
`;

@observer
export class Loading extends Component<LoadingDialogProps> {
  @InjectStore(LoadingStore)
  private loadingStore!: LoadingStore;

  render(): ReactNode {
    const {handleDialogClose = (): void => {}} = this.props;

    return (
      <Dialog
        open={this.loadingStore.isView}
        onClose={() => handleDialogClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Loading...</DialogTitle>
        <GrayLoadingContent>
          <LoadingImage src={LoadingImg} />
          <LinearProgress />
        </GrayLoadingContent>
      </Dialog>
    );
  }
}
