import {Dialog} from '@material-ui/core';
import {
  StyleRules,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import React, {Component, ReactNode} from 'react';

const styles = (): StyleRules =>
  createStyles({
    circle: {
      borderRadius: 10,
    },
  });

export interface WizardDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  children: ReactNode;
}

class TWizardDialog extends Component<WizardDialogProps> {
  render(): ReactNode {
    const {classes, children} = this.props;

    return (
      <Dialog
        {...this.props}
        classes={{
          paper: classes.circle,
        }}
      >
        {children}
      </Dialog>
    );
  }
}

export const WizardDialog = withStyles(styles)(TWizardDialog);
