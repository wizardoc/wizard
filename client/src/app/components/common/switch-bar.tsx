import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {withRouter, RouteComponentProps} from 'react-router-dom';

export interface SwitchBarProps {
  title: string;
  tabs: SwitchBarTabItem[];
}

export interface SwitchBarTabItem {
  name: string;
  route: string;
}

interface TabProps {
  isActive: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  background: ${props => props.theme.white};
`;

const Tab = styled.div<TabProps>`
  height: 25px;
  color: ${props => props.theme.primaryColor};
  padding-bottom: 6px;
  width: fit-content;
  cursor: pointer;
  border-bottom: 3px solid;
  border-color: ${props =>
    props.isActive ? props.theme.primaryColor : 'transparent'};
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  margin-right: 15px;

  &:hover {
    border-bottom: 3px solid;
  }
`;

const Title = styled.div`
  font-size: 22px;
  padding: 22px;
`;

const Tabs = styled.div`
  padding-left: 22px;
  display: flex;
  align-items: center;
`;

@withRouter
export class SwitchBar extends Component<
  SwitchBarProps & Partial<RouteComponentProps>
> {
  handleTabClick(route: string): void {
    this.props.history!.push(route);
  }

  render(): ReactNode {
    const {title, tabs, match} = this.props;
    const renderTabs = tabs.map(({name, route}) => (
      <Tab
        onClick={() => this.handleTabClick(route)}
        isActive={match!.path === route}
        key={name}
      >
        {name}
      </Tab>
    ));

    return (
      <Wrapper>
        <Title>{title}</Title>
        <Tabs>{renderTabs}</Tabs>
      </Wrapper>
    );
  }
}
