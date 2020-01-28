import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

const ContentDesc = styled.div`
  color: ${props => props.theme.descColor};
`;

interface GraphicContentDescProps {
  contentDesc: string;
  showRatio: number;
  fadeInClass: string;
}

@viewObservable()
export class GraphicContentDesc extends Component<
  GraphicContentDescProps & Partial<ViewObservableComponentProps>
> {
  private contentDesc = createRef<any>();

  componentDidMount(): void {
    const {showRatio, fadeInClass} = this.props;
    this.props.onObserve!(entry => {
      const {current} = this.contentDesc;

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
      <ContentDesc ref={this.contentDesc} className="animated">
        {contentDesc}
      </ContentDesc>
    );
  }
}
