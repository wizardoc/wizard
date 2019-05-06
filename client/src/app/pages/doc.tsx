import React, {Component, ReactNode} from 'react';

import {RouterAnimation} from '../animations';

export const Doc = RouterAnimation(
  class extends Component {
    render(): ReactNode {
      return <div>Doc</div>;
    }
  },
);
