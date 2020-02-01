import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {ViewObservableComponentProps} from 'src/app/utils';
import {withFade} from 'src/app/animations';

const ContentTitle = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 40px;
`;

interface GraphicContentTitleProps {
  contentTitle: string;
}

@withFade({direction: 'left'})
export class GraphicContentTitle extends Component<
  GraphicContentTitleProps & Partial<ViewObservableComponentProps>
> {
  render(): ReactNode {
    const {contentTitle} = this.props;

    return <ContentTitle>{contentTitle}</ContentTitle>;
  }
}
