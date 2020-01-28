import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

const FadeInImg = styled.img`
  width: 540px;
  opacity: 0;
`;

interface GraphicImgProps {
  graphicImg: string;
  imgFadeInClass?: string;
  showRatio: number;
}

@viewObservable()
export class GraphicImg extends Component<
  GraphicImgProps & Partial<ViewObservableComponentProps>
> {
  private graphicImgRef = createRef<any>();

  componentDidMount(): void {
    const {imgFadeInClass, showRatio} = this.props;
    this.props.onObserve!(entry => {
      const {current} = this.graphicImgRef;

      if (entry[0].intersectionRatio > showRatio) {
        if (Array.prototype.includes.call(current.classList, imgFadeInClass)) {
          return;
        }

        current.classList.add(imgFadeInClass);
      }
    });
  }

  render(): ReactNode {
    const {graphicImg} = this.props;

    return (
      <FadeInImg
        className="animated"
        src={graphicImg}
        ref={this.graphicImgRef}
      />
    );
  }
}
