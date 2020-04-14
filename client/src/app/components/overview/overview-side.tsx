import React, {Component, ReactNode, ReactElement} from 'react';
import styled from 'styled-components';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';

interface OverviewListItem {
  icon: ReactElement;
  text: string;
  view: View;
}

interface OverviewProps {
  onItemClick(view: string): void;
}

export type View = 'organization' | 'messages' | 'checker';

const Wrapper = styled.div`
  width: 250px;
  height: 100%;
  box-shadow: 0 0 100px ${props => props.theme.deepGray};
  z-index: 1;
  flex-shrink: 0;
`;

export class OverviewSide extends Component<OverviewProps> {
  overviewListItems: OverviewListItem[] = [
    {
      icon: <GroupIcon />,
      text: '组织',
      view: 'organization',
    },
  ];

  render(): ReactNode {
    const items = this.overviewListItems.map(({text, view, icon}) => (
      <ListItem button onClick={() => this.props.onItemClick(view)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text}></ListItemText>
      </ListItem>
    ));

    return (
      <Wrapper>
        <List>{items}</List>
      </Wrapper>
    );
  }
}
