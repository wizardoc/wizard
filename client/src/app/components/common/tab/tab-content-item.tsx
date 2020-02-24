import React, {Component, ReactNode} from 'react';

import {TabContext} from './tab-content';

export interface TabContentItemProps {
  view: string;
}

export class TabContentItem extends Component<TabContentItemProps> {
  render(): ReactNode {
    const {view, children} = this.props;

    return (
      <TabContext.Consumer>
        {value => value && value === view && children}
      </TabContext.Consumer>
    );
  }
}
