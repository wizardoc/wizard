import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

const ContentTitle = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 40px;
`;

interface GraphicContentTitleProps {
  contentTitle: string;
  showRatio: number;
  fadeInClass: string;
}

@viewObservable()
export class GraphicContentTitle extends Component<
  GraphicContentTitleProps & Partial<ViewObservableComponentProps>
> {
  private contentTitleRef = createRef<any>();

  componentDidMount(): void {
    const {fadeInClass, showRatio} = this.props;
    this.props.onObserve!(entry => {
      const {current} = this.contentTitleRef;

      if (entry[0].intersectionRatio > showRatio) {
        if (Array.prototype.includes.call(current.classList, fadeInClass)) {
          return;
        }

        current.classList.add(fadeInClass);
      }
    });
  }

  render(): ReactNode {
    const {contentTitle} = this.props;

    return (
      <ContentTitle className="animated" ref={this.contentTitleRef}>
        {contentTitle}
      </ContentTitle>
    );
  }
}
