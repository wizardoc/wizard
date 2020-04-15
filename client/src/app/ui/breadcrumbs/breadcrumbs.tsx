import React, {Component, ReactNode, ReactElement} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {
  Breadcrumbs as MaterialBreadcrumbs,
  Link,
  Typography,
} from '@material-ui/core';

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

export interface BreadcrumbsProps {
  root?: string;
  rules: BreadcrumbsRules;
}

const ROUTE_DIVISION = '/';

@withRouter
export class Breadcrumbs extends Component<
  BreadcrumbsProps & Partial<RouteComponentProps>
> {
  render(): ReactNode {
    const renderBreadcrumbsItems = this.convertToBreadcrumbsItem().map(
      ({isActive = true, route, text, icon = <></>}) => {
        const renderItem = (children: ReactElement): ReactElement =>
          isActive ? (
            <Link href={route}>{children}</Link>
          ) : (
            <Typography color="textPrimary">{children}</Typography>
          );

        return renderItem(
          <>
            {icon}
            {text}
          </>,
        );
      },
    );

    return <MaterialBreadcrumbs>{renderBreadcrumbsItems}</MaterialBreadcrumbs>;
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
