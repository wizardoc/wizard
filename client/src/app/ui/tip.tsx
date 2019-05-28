import {SnackbarContent} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarContentProps} from '@material-ui/core/SnackbarContent';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {TipStore} from '../store';
import {InjectStore} from '../utils';

export const enum TipVariant {
  Success,
  Info,
  Warning,
  Error,
}

interface TipProps extends SnackbarContentProps {
  tipVariant: TipVariant;
  message: ReactNode;
  hasCloseClick?: boolean;
}

interface TipContentProps {
  tipvariant: TipVariant;
}

const colors = ['#43a047', 'rgb(97, 136, 51)', '#ffa000', '#d32f2f'];

const TipContent = styled(SnackbarContent)<TipContentProps>`
  background-color: ${props => colors[props.tipvariant]} !important;
` as ComponentType<SnackbarContentProps & TipContentProps>;

const MAX_EXIST_DURATION = 60 * 1000;

@observer
export class Tip extends Component<TipProps> {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  render(): ReactNode {
    const {message, tipVariant} = this.props;

    console.info(colors[tipVariant]);

    return (
      <Snackbar
        open={this.tipStore.isShowTip}
        autoHideDuration={MAX_EXIST_DURATION}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TipContent tipvariant={tipVariant} message={message} />
      </Snackbar>
    );
  }
}
