import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponent} from 'website/utils';

import {GraphicAnimation} from './graphic-content';

const ContentTitle = styled.div`
  color: ${props => props.theme.titleColor};
  font-size: 40px;
`;

interface GraphicContentTitleProps extends GraphicAnimation {
  contentTitle: string;
}

@viewObservable()
export class GraphicContentTitle
  extends Component<GraphicContentTitleProps>
  implements ViewObservableComponent {
  private contentTitleRef = createRef<HTMLDivElement>();

  onObserve(entries: IntersectionObserverEntry[]): void {
    const {fadeInClass, showRatio} = this.props;

    const {current} = this.contentTitleRef;

    if (!current) {
      return;
    }

    if (entries[0].intersectionRatio > showRatio) {
      if (Array.prototype.includes.call(current.classList, fadeInClass)) {
        return;
      }

      current.classList.add(fadeInClass);
    }
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
