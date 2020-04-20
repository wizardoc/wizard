import React, {Component, ReactNode, ReactElement} from 'react';
import styled from 'styled-components';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {withRouter, RouteComponentProps} from 'react-router-dom';

export interface SideBarItem {
  icon: ReactElement;
  text: string;
  route: string;
}

export interface SideBarProps {
  items: SideBarItem[];
  onItemClick?(item: SideBarItem): void;
}

const Wrapper = styled.div`
  width: 250px;
  height: 100%;
  box-shadow: ${props => props.theme.flatShadow};
  z-index: 1;
  flex-shrink: 0;
`;

@withRouter
export class SideBar extends Component<
  SideBarProps & Partial<RouteComponentProps>
> {
  handleListItemClick(item: SideBarItem): void {
    const {onItemClick = (): void => {}, history} = this.props;

    onItemClick(item);
    history!.push(item.route);
  }

  render(): ReactNode {
    const {items} = this.props;

    const renderItems = items.map(item => (
      <ListItem button onClick={() => this.handleListItemClick(item)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text}></ListItemText>
      </ListItem>
    ));

    return (
      <Wrapper>
        <List>{renderItems}</List>
      </Wrapper>
    );
  }
}
