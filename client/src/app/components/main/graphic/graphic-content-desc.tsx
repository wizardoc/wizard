import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {withFade} from 'src/app/animations';

const ContentDesc = styled.div`
  color: ${props => props.theme.descColor};
`;

interface GraphicContentDescProps {
  contentDesc: string;
}

@withFade({direction: 'left'})
export class GraphicContentDesc extends Component<GraphicContentDescProps> {
  render(): ReactNode {
    const {contentDesc} = this.props;

    return <ContentDesc>{contentDesc}</ContentDesc>;
  }
}
