import React, {Component, ReactNode, ReactElement, ComponentType} from 'react';
import styled from 'styled-components';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {withRouter, RouteComponentProps} from 'react-router-dom';

export interface SideBarItem {
  icon: ReactElement;
  text: string;
  route: string;
  iconColor?: string;
  textColor?: string;
}

export interface SideBarProps {
  items: SideBarItem[];
  highlight?: boolean;
  separateMargin?: string;
  onItemClick?(item: SideBarItem): void;
}

interface StyledListItemProps {
  separateMargin?: string;
  highlight?: boolean;
}

const genColorfulItem = (Wrapper: ComponentType): any => styled(Wrapper)<any>`
  ${props =>
    props.color &&
    `
  > * {
    color: ${props.color} !important;
  }
`}
`;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  z-index: 1;
  flex-shrink: 0;
`;

const StyledListItem = styled(ListItem)<StyledListItemProps>`
  margin-top: ${props => props.separateMargin} !important;
  background: ${props => props.highlight && props.theme.shallowPrimaryColor} !important;
`;

const StyledListItemIcon = genColorfulItem(ListItemIcon);
const StyledListItemText = genColorfulItem(ListItemText);

@withRouter
export class SideBar extends Component<SideBarProps & Partial<RouteComponentProps>> {
  handleListItemClick(item: SideBarItem): void {
    const {onItemClick = (): void => {}, history} = this.props;

    onItemClick(item);
    history!.push(item.route);
  }

  render(): ReactNode {
    const {items, separateMargin, match, highlight = false} = this.props;

    const renderItems = items.map(item => (
      <StyledListItem
        separateMargin={separateMargin}
        button
        onClick={() => this.handleListItemClick(item)}
        highlight={highlight && match!.path === item.route}
      >
        <StyledListItemIcon color={item.iconColor}>{item.icon}</StyledListItemIcon>
        <StyledListItemText primary={item.text} />
      </StyledListItem>
    ));

    return (
      <Wrapper>
        <List>{renderItems}</List>
      </Wrapper>
    );
  }
}
