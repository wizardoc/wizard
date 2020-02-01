import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';

import {withFade} from 'src/app/animations';

export interface GraphicTitleProps {
  title?: string;
}

const Title = styled.h2`
  height: 56px;
  margin: 0 10vw;
  margin-bottom: 40px;
  line-height: 1.5;
  font-size: 40px;
  color: ${props => props.theme.titleColor};
  text-align: center;
`;

@withFade({direction: 'down'})
export class GraphicTitle extends Component<GraphicTitleProps> {
  render(): ReactNode {
    const {title} = this.props;

    return <Title>{title}</Title>;
  }
}
