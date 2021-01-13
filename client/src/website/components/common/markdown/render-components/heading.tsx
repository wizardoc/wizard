import React, {Component, ReactNode, createElement} from 'react';
import styled from 'styled-components';

import {styledTheme} from 'website/theme';

export interface HeaderProps {
  level: number;
}

const Wrapper = styled.div`
  color: ${styledTheme.headingColor} !important;
`;

export class Heading extends Component<HeaderProps> {
  render(): ReactNode {
    const {level, children} = this.props;

    return <Wrapper>{createElement(`h${level}`, {id: children}, children)}</Wrapper>;
  }
}
