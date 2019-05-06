import React, {Component, ReactNode} from 'react';

import {RouterAnimation} from '../animations';

export const About = RouterAnimation(
  class extends Component {
    render(): ReactNode {
      return <div>about</div>;
    }
  },
);
