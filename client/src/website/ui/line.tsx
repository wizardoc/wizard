import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {withTheme, ThemeComponentProps} from '../theme';

interface InnerLineProps {
  lineColor?: string;
}

export interface LineProps extends InnerLineProps {}

const InnerLine = styled.div<InnerLineProps>`
  width: 85%;
  height: 1px;
  background: ${props => props.lineColor};
`;

const LineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

@withTheme
export class Line extends Component<LineProps & Partial<ThemeComponentProps>> {
  render(): ReactNode {
    const {theme, lineColor = theme!.grayLineColor} = this.props;

    return (
      <LineWrapper>
        <InnerLine lineColor={lineColor}></InnerLine>
      </LineWrapper>
    );
  }
}
