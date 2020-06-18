import React, {Component, ReactNode, ReactElement} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {
  Breadcrumbs as MaterialBreadcrumbs,
  BreadcrumbsProps as MaterialBreadcrumbsProps,
  Link,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {withTheme, ThemeComponentProps} from 'src/app/theme';

interface ParsedBreadcrumbsItem extends BreadcrumbsItem {
  route: string;
}

export interface BreadcrumbsItem {
  icon?: ReactElement;
  text: string;
  isActive?: boolean;
}

export interface BreadcrumbsRules {
  [route: string]: BreadcrumbsItem;
}

export interface BreadcrumbsProps extends MaterialBreadcrumbsProps {
  rules: BreadcrumbsRules;
  staticColor?: string;
  activeColor?: string;
  divisionColor?: string;
}

interface ColorTextProps {
  color: string;
}

interface StyledSeparatorProps {
  color: string;
}

const ColorText = styled.div<ColorTextProps>`
  width: fit-content;
  height: fit-content;

  > * {
    color: ${props => props.color} !important;
    font-size: 13px !important;
  }
`;

const StyledLink = styled(Link)`
  cursor: pointer !important;
`;

const StyledSeparator = styled.div<StyledSeparatorProps>`
  display: flex;

  > * {
    color: ${props => props.color} !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ROUTE_DIVISION = '/';

@withTheme
@withRouter
export class Breadcrumbs extends Component<
  BreadcrumbsProps & Partial<RouteComponentProps & ThemeComponentProps>
> {
  render(): ReactNode {
    const {
      theme,
      staticColor = theme!.grayTextColor,
      activeColor = theme!.black,
      divisionColor = theme!.black,
      separator = <KeyboardArrowRightIcon />,
    } = this.props;

    const renderBreadcrumbsItems = this.convertToBreadcrumbsItem().map(
      ({isActive = true, route, text, icon = <></>}) => {
        const renderItem = (children: ReactElement): ReactElement =>
          isActive ? (
            <ColorText color={staticColor}>
              <StyledLink onClick={() => this.props.history!.push(route)}>
                {children}
              </StyledLink>
            </ColorText>
          ) : (
            <ColorText color={activeColor}>
              <Typography color="textPrimary">{children}</Typography>
            </ColorText>
          );

        return renderItem(
          <Wrapper>
            {icon}
            {text}
          </Wrapper>,
        );
      },
    );

    return (
      <ColorText color={divisionColor} {...(this.props as ColorTextProps)}>
        <MaterialBreadcrumbs
          {...this.props}
          separator={
            <StyledSeparator color={staticColor}>{separator}</StyledSeparator>
          }
        >
          {renderBreadcrumbsItems}
        </MaterialBreadcrumbs>
      </ColorText>
    );
  }

  private parseCurrentRoute(): string[] {
    const {history} = this.props;
    const routeParts = history!.location.pathname
      .split(ROUTE_DIVISION)
      .filter(part => part !== '');
    const routes: string[] = [];

    for (const pos of Object.keys(routeParts)) {
      routes.push(
        `${ROUTE_DIVISION}${routeParts
          .slice(0, +pos + 1)
          .join(ROUTE_DIVISION)}`,
      );
    }

    return routes;
  }

  private convertToBreadcrumbsItem(): ParsedBreadcrumbsItem[] {
    const breadcrumbsItems = this.parseCurrentRoute()
      .map(route => {
        const item = this.props.rules[route];

        return item && {...item, route};
      })
      .filter(item => !!item);
    const lastRef = breadcrumbsItems[breadcrumbsItems.length - 1];

    if (lastRef) {
      lastRef.isActive = false;
    }

    return breadcrumbsItems;
  }
}
