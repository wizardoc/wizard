import {List} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {DrawerHeader} from '../ui';

const HEAD_PROMPT = '显示近期的文档动态（保留 30 天）';

@observer
export class DocRecentUpdateDrawer extends Component {
  render(): ReactNode {
    return (
      <List>
        <DrawerHeader title={HEAD_PROMPT} icon={<PetsIcon />}></DrawerHeader>
      </List>
    );
  }
}
