import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import {ListItemIconProps} from '@material-ui/core/ListItemIcon';
import PetsIcon from '@material-ui/icons/Pets';
import {observer} from 'mobx-react';
import React, {Component, ComponentType, ReactNode} from 'react';
import styled from 'styled-components';

import {RecentDrawer} from '../store';
import {InjectStore} from '../utils';

const HEAD_PROMPT = '显示近期的文档动态';

const PrimaryPetsIconItem = styled(ListItemIcon)`
  color: ${props => props.theme.primaryColor} !important;
` as ComponentType<ListItemIconProps>;

@observer
export class DocRecentUpdateDrawer extends Component {
  @InjectStore(RecentDrawer)
  private recentStore!: RecentDrawer;

  render(): ReactNode {
    const {isViewRencentDrawer, viewRecentDrawerToggle} = this.recentStore;

    return (
      <SwipeableDrawer
        open={isViewRencentDrawer}
        onOpen={viewRecentDrawerToggle}
        onClose={viewRecentDrawerToggle}
      >
        <List>
          <ListItem>
            <PrimaryPetsIconItem>
              <PetsIcon />
            </PrimaryPetsIconItem>
            <ListItemText primary={HEAD_PROMPT} />
          </ListItem>
          <Divider />
        </List>
      </SwipeableDrawer>
    );
  }
}
