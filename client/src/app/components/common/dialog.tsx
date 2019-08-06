import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import {observer} from 'mobx-react';
import React, {
  Component,
  ComponentType,
  FunctionComponent,
  ReactNode,
} from 'react';
import {Inject} from 'react-ts-di';

import {DialogService} from '../../services';

interface CommonDialogProps {
  dialogID?: string;
}

function withDialog(
  Content: ComponentType,
  componentProps: any,
): ComponentType {
  return class extends Component {
    render(): ReactNode {
      return <Content {...componentProps}></Content>;
    }
  };
}

@observer
export class CommonDialog extends Component<CommonDialogProps> {
  @Inject
  private dialogService!: DialogService;

  render(): ReactNode {
    const {dialogID} = this.props;

    if (!dialogID) {
      return <></>;
    }

    const {isShow, content, dialogs} = this.dialogService;
    const options = dialogs.get(dialogID);

    if (!options || !content) {
      return <></>;
    }

    const {title, actionButtons = [], componentProps} = options;
    const Footer: FunctionComponent = () => {
      if (!actionButtons.length) {
        return <></>;
      }

      return (
        <DialogActions>
          {actionButtons.map(({text, cb, props = {}}) => (
            <Button {...props} key={text} onClick={cb}>
              {text}
            </Button>
          ))}
        </DialogActions>
      );
    };

    const Content = withDialog(content, componentProps);

    return (
      <Dialog open={isShow}>
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent>
          <Content></Content>
        </DialogContent>
        <Footer></Footer>
      </Dialog>
    );
  }
}
