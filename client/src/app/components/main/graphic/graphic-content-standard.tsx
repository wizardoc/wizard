import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

const ContentStandard = styled.div`
  margin: 50px 0 30px;
  width: fit-content;
  padding: 7px 20px;
  border-radius: 16px;
  font-size: 13px;
  color: ${props => props.theme.primaryColor};
  background-color: ${props => props.theme.baseBgColor};
`;

interface GraphicContentStandardProps {
  contentStandard: string;
  showRatio: number;
  fadeInClass: string;
}

@viewObservable()
export class GraphicContentStandard extends Component<
  GraphicContentStandardProps & Partial<ViewObservableComponentProps>
> {
  private contentStandard = createRef<any>();

  componentDidMount(): void {
    const {fadeInClass, showRatio} = this.props;
    this.props.onObserve!(entry => {
      const {current} = this.contentStandard;

      if (entry[0].intersectionRatio > showRatio) {
        if (Array.prototype.includes.call(current.classList, fadeInClass)) {
          return;
        }

        current.classList.add(fadeInClass);
      }
    });
  }

  render(): ReactNode {
    const {contentStandard} = this.props;

    return (
      <ContentStandard ref={this.contentStandard} className="animated">
        {contentStandard}
      </ContentStandard>
    );
  }
}
