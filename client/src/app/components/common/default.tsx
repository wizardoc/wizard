import React, {Component, ReactNode} from 'react';

import {
  isObject,
  isString,
  isBoolean,
  isUndefined,
  isNull,
  isArray,
} from 'src/app/utils';

export interface DefaultProps {
  defaultView?: ReactNode;
  condition?(): boolean;
}

export class Default extends Component<DefaultProps> {
  render(): ReactNode {
    const {
      children,
      defaultView = <></>,
      condition = (): boolean => this.emptyCondition(),
    } = this.props;
    const isViewDefault = condition();

    return isViewDefault ? defaultView : children;
  }

  private emptyCondition(): boolean {
    const {children} = this.props;

    if (isBoolean(children) || isUndefined(children) || isNull(children)) {
      return !children;
    }

    if (isArray(children)) {
      return !children.length;
    }

    if (isString(children)) {
      return children === '';
    }

    if (isObject(children)) {
      return !Object.keys(children).length;
    }

    return true;
  }
}
