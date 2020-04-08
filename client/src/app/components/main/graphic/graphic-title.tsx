import React, {ReactNode, Component, createRef} from 'react';
import styled from 'styled-components';

import {viewObservable, ViewObservableComponentProps} from 'src/app/utils';

import {GraphicAnimation} from './graphic-content';

export interface GraphicTitleProps extends GraphicAnimation {
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

@viewObservable()
export class GraphicTitle extends Component<
  GraphicTitleProps & Partial<ViewObservableComponentProps>
> {
  private titleRef = createRef<HTMLDivElement>();

  componentDidMount(): void {
    const {showRatio, fadeInClass} = this.props;

    this.props.onObserve!(entry => {
      const {current} = this.titleRef;

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
    const {title} = this.props;

    return (
      <Title className="animated" ref={this.titleRef}>
        {title}
      </Title>
    );
  }
}
