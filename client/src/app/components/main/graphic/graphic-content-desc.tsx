import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

import {GraphicAnimation} from './graphic-content';

const ContentDesc = styled.div`
  color: ${props => props.theme.descColor};
`;

interface GraphicContentDescProps extends GraphicAnimation {
  contentDesc: string;
}

@viewObservable()
export class GraphicContentDesc extends Component<
  GraphicContentDescProps & Partial<ViewObservableComponentProps>
> {
  private contentDescRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    const {showRatio, fadeInClass} = this.props;

    this.props.onObserve!(entry => {
      const {current} = this.contentDescRef;

      if (!current) {
        return;
      }

      if (entry[0].intersectionRatio > showRatio) {
        if (Array.prototype.includes.call(current.classList, fadeInClass)) {
          return;
        }

        current.classList.add(fadeInClass);
      }
    });
  }

  render(): ReactNode {
    const {contentDesc} = this.props;

    return (
      <ContentDesc ref={this.contentDescRef} className="animated">
        {contentDesc}
      </ContentDesc>
    );
  }
}
