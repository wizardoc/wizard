import React, {Component, ReactNode, createContext} from 'react';

interface TabContentProps {
  query: string;
}

export const TabContext = createContext<string | undefined>(undefined);

export class TabContent extends Component<TabContentProps> {
  render(): ReactNode {
    return <TabContext.Provider value={this.props.query} />;
  }
}
