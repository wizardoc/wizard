import {IconButton, Slide, SnackbarContent} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import {SnackbarContentProps} from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import WarningIcon from '@material-ui/icons/Warning';
import {observer} from 'mobx-react';
import React, {
  Component,
  ComponentType,
  FunctionComponent,
  MouseEvent,
  ReactNode,
} from 'react';
import styled from 'styled-components';

import {TipStore} from '../store';
import {InjectStore} from '../utils';

export const enum TipVariant {
  Success,
  Info,
  Warning,
  Error,
  Main,
}

interface TipProps extends SnackbarContentProps {
  tipVariant: TipVariant;
  message: ReactNode;
  onClose?(e?: MouseEvent): void;
}

interface TipInnerContentProps {
  bgcolor?: string;
}

interface Stuff {
  color?: string;
  icon: unknown;
}

interface TipContentProps extends TipProps {}

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
  {
    icon: <TagFacesIcon />,
  },
];

const TipInnerContent = styled(SnackbarContent)<TipInnerContentProps>`
  background-color: ${({bgcolor, theme}) =>
    bgcolor || theme.primaryColor} !important;
` as ComponentType<SnackbarContentProps & TipInnerContentProps>;

const MessageContent = styled.div`
  display: flex;
  align-items: center;
`;

const Message = styled.div`
  margin-left: 10px;
`;

export const TipContent: FunctionComponent<TipContentProps> = ({
  message,
  tipVariant,
  onClose,
}: TipContentProps) => {
  const {color, icon} = stuffs[tipVariant];
  const actions = [];

  if (onClose) {
    actions.push(
      <IconButton
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>,
    );
  }

  return (
    <TipInnerContent
      bgcolor={color}
      message={
        <MessageContent>
          {icon}
          <Message>{message}</Message>
        </MessageContent>
      }
      action={actions}
    />
  );
};

@observer
export class Tip extends Component<TipProps> {
  @InjectStore(TipStore)
  private tipStore!: TipStore;

  render(): ReactNode {
    const {onClose} = this.props;
    let onCloseDup = onClose;

    if (onCloseDup) {
      onCloseDup = e => {
        onClose!(e);
        this.tipStore.tipToggle();
      };
    }

    return (
      <Slide
        in={this.tipStore.isShowTip}
        direction="right"
        mountOnEnter
        unmountOnExit
      >
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <TipContent {...this.props} onClose={onCloseDup} />
        </Snackbar>
      </Slide>
    );
  }
}
