import {SwipeableDrawer} from '@material-ui/core';
import {omit} from 'lodash';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {ParsedDrawerOptions} from '../../services';

export interface DrawerProps extends ParsedDrawerOptions {
  open: boolean;
  renderDrawer?: ReactNode;
}

@observer
export class Drawer extends Component<DrawerProps> {
  render(): ReactNode {
    const innerProps = omit(this.props, 'renderDrawer');
    const {renderDrawer, children} = this.props;

    return (
      <SwipeableDrawer {...innerProps}>
        {renderDrawer || children}
      </SwipeableDrawer>
    );
  }
}
