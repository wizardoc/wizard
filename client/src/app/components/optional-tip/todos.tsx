import {List} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import React, {Component, ReactNode} from 'react';

import {DrawerHeader} from '../../ui';

/** The drawer for view todos */
export class Todos extends Component {
  render(): ReactNode {
    return (
      <>
        <DrawerHeader
          title="待办事项"
          icon={<WorkIcon></WorkIcon>}
        ></DrawerHeader>
        <List></List>
      </>
    );
  }
}
