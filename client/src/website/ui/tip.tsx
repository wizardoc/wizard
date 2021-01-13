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
import {Inject} from '@wizardoc/injector';

import {styledTheme} from '../theme';
import {TipService} from '../services';

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
    color: styledTheme.successGreen,
    icon: <CheckCircleIcon />,
  },
  {
    color: styledTheme.infoBlue,
    icon: <InfoIcon />,
  },
  {
    color: styledTheme.warnYellow,
    icon: <WarningIcon />,
  },
  {
    color: styledTheme.errorRed,
    icon: <ErrorIcon />,
  },
  {
    icon: <TagFacesIcon />,
  },
];

const TipInnerContent = styled(SnackbarContent)<TipInnerContentProps>`
  background-color: ${({bgcolor, theme}) => bgcolor || theme.primaryColor} !important;
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
      <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
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
  @Inject
  private tipService!: TipService;

  render(): ReactNode {
    const {onClose} = this.props;
    let onCloseDup = onClose;

    if (onCloseDup) {
      onCloseDup = e => {
        onClose!(e);
        this.tipService.tipToggle();
      };
    }

    return (
      <Slide in={this.tipService.isShowTip} direction="down" mountOnEnter unmountOnExit>
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <TipContent {...this.props} onClose={onCloseDup} />
        </Snackbar>
      </Slide>
    );
  }
}
