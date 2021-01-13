import React, {Component, ReactNode} from 'react';

import {DocumentList, CommunityBanner} from '../components';

export class Community extends Component {
  render(): ReactNode {
    return (
      <>
        <CommunityBanner />
        <DocumentList />
      </>
    );
  }
}
