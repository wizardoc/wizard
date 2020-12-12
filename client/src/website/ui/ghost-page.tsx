import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

interface GhostPageProps {
  animationColor?: string;
}

interface AnimationCircleProps {
  width: number | string;
  height: number | string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const AnimationCircle = styled.div<AnimationCircleProps>`
  width: ${({width}) =>
    // tslint:disable-next-line:prefer-template
    typeof width === 'string' ? width : width + 'px'};
  height: ${({height}) =>
    // tslint:disable-next-line:prefer-template
    typeof height === 'string' ? height : height + 'px'};
  background: #f00;

  transition: 1s all;
`;

@observer
export class GhostPage extends Component<GhostPageProps> {
  @observable
  private animationCircleStyle: AnimationCircleProps = {
    width: 0,
    height: 0,
  };

  render(): ReactNode {
    return (
      <Wrapper>
        <AnimationCircle {...this.animationCircleStyle} />
      </Wrapper>
    );
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.animationCircleStyle = {
        width: 1000,
        height: 1000,
      };
    });
  }
}
