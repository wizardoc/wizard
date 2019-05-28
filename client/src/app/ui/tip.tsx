import {SnackbarContent, IconButton} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarContentProps} from '@material-ui/core/SnackbarContent';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode, MouseEvent} from 'react';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

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
  onClose?(e?: MouseEvent): void;
}

interface TipContentProps {
  bgcolor: string;
}

interface Stuff {
  color: string;
  icon: unknown;
}

const stuffs: Stuff[] = [
  {
    color: '#43a047',
    icon: <CheckCircleIcon />,
  },
  {
    color: 'rgb(97, 136, 51)',
    icon: <InfoIcon />,
  },
  {
    color: '#ffa000',
    icon: <WarningIcon />,
  },
  {
    color: '#d32f2f',
    icon: <ErrorIcon />,
  },
];

const TipContent = styled(SnackbarContent)<TipContentProps>`
  background-color: ${({bgcolor}) => bgcolor} !important;
` as ComponentType<SnackbarContentProps & TipContentProps>;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  margin-left: 10px;
`;

const MAX_EXIST_DURATION = 5 * 1000;

@observer
export class Tip extends Component<TipProps> {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  render(): ReactNode {
    const {message, tipVariant, onClose} = this.props;
    const {color, icon} = stuffs[tipVariant];
    const actions = [];

    if (onClose) {
      actions.push(
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={e => {
            onClose(e);
            this.tipStore.tipToggle();
          }}
        >
          <CloseIcon />
        </IconButton>,
      );
    }

    setTimeout(() => this.tipStore.tipToggle(), MAX_EXIST_DURATION);

    return (
      <Snackbar
        open={this.tipStore.isShowTip}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <TipContent
          bgcolor={color}
          message={
            <MessageContent>
              {icon}
              <Message>{message}</Message>
            </MessageContent>
          }
          action={actions}
        />
      </Snackbar>
    );
  }
}
