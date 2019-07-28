import {List, SwipeableDrawer} from '@material-ui/core';
import PetsIcon from '@material-ui/icons/Pets';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';

import {RecentDrawer} from '../store';
import {DrawerHeader} from '../ui';
import {InjectStore} from '../utils';

const HEAD_PROMPT = '显示近期的文档动态（保留 30 天）';

@observer
export class DocRecentUpdateDrawer extends Component {
  @InjectStore(RecentDrawer)
  private recentStore!: RecentDrawer;

  render(): ReactNode {
    const {isViewRecentDrawer, viewRecentDrawerToggle} = this.recentStore;

    return (
      <SwipeableDrawer
        open={isViewRecentDrawer}
        onOpen={viewRecentDrawerToggle}
        onClose={viewRecentDrawerToggle}
      >
        <List>
          <DrawerHeader title={HEAD_PROMPT} icon={<PetsIcon />}></DrawerHeader>
        </List>
      </SwipeableDrawer>
    );
  }
}
