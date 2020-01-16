import {observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, MouseEvent, ReactNode} from 'react';
import styled from 'styled-components';

type Direction = 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom';

interface ScalableBoxProps {
  img?: string;
  previewSize: BaseSize;
  onBlockMove(data: Point[]): void;
}

export interface Point {
  x: number;
  y: number;
}

export interface BaseSize {
  width: number;
  height: number;
}

interface Size extends BaseSize {
  direction: Direction;
}

interface ScalableWrapperProps extends Point, Size {}

interface ScalableBlockProps {
  direction: Direction;
}

const INIT_BOX_SIZE = 128;

const Wrapper = styled.div<ScalableWrapperProps>`
  width: ${props => props.width + INIT_BOX_SIZE}px;
  height: ${props => props.height + INIT_BOX_SIZE}px;
  cursor: move;
  position: absolute;
  outline: 600px solid rgba(0, 0, 0, 0.3);
  left: ${props => props.x - 1}px;
  top: ${props => props.y - 1}px;
  z-index: 2;
`;

const MoveWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const AvatarSelectorMask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ScalableBlock = styled.div<ScalableBlockProps>`
  width: 10px;
  height: 10px;
  background: white;
  position: absolute;
  z-index: 11;
  border: 1px solid;

  ${({direction}) => {
    const POS_DISPATCHER = {
      leftTop: 'left:-5px;top:-5px;cursor:nw-resize;',
      leftBottom: 'left: -5px;bottom: -5px;cursor:sw-resize;',
      rightTop: 'right: -5px;top: -5px;cursor:ne-resize;',
      rightBottom: 'right: -5px;bottom: -5px;cursor:se-resize;',
    };

    return POS_DISPATCHER[direction];
  }}
`;

@observer
export class ScalableBox extends Component<ScalableBoxProps> {
  @observable
  isPress = false;

  @observable
  isResize = false;

  @observable
  direction!: Direction;

  @observable
  private originPosition: Point = {
    x: 0,
    y: 0,
  };

  @observable
  private pressPosition: Point = {
    x: 0,
    y: 0,
  };

  @observable
  private movePosition: Point = {
    x: 0,
    y: 0,
  };

  @observable
  private boxSize: Size = {
    width: 0,
    height: 0,
    direction: this.direction,
  };

  @observable
  private originBoxSize: Size = {
    width: 0,
    height: 0,
    direction: this.direction,
  };

  spurt(): void {
    const {onBlockMove} = this.props;
    const {x, y} = this.movePosition;
    const {width, height} = this.boxSize;
    const [resultX, resultY] = [x - 1, y - 1];
    const [resultWidth, resultHeight] = [
      width + INIT_BOX_SIZE,
      height + INIT_BOX_SIZE,
    ];

    onBlockMove([
      {x: resultX, y: resultY},
      {x: resultX + resultWidth, y: resultY},
      {x: resultX + resultWidth, y: resultY + resultHeight},
      {x: resultX, y: resultY + resultHeight},
    ]);
  }

  handleBoxMouseDown(e: MouseEvent<HTMLDivElement>): void {
    const {clientX, clientY} = e;

    this.isPress = true;
    this.pressPosition = {
      x: clientX,
      y: clientY,
    };
    this.originBoxSize = {...this.boxSize};
  }

  handleBoxMouseMove(e: MouseEvent<HTMLDivElement>): void {
    const {clientX, clientY} = e;
    const {x, y} = this.pressPosition;

    console.info(clientX, clientY);

    const DIRECTION_DISPATCHER = {
      leftTop: [x - clientX, y - clientY],
      rightTop: [clientX - x, y - clientY],
      leftBottom: [x - clientX, clientY - y],
      rightBottom: [clientX - x, clientY - y],
    };

    if (this.isResize) {
      let [resultWidth, resultHeight] = DIRECTION_DISPATCHER[this.direction];
      const resultSize = Math.max(resultWidth, resultHeight);

      if (resultWidth < 0 || resultHeight < 0) {
        resultWidth = 0;
        resultHeight = 0;
      }

      requestAnimationFrame(() => {
        const {x, y} = this.originPosition;
        const {width, height} = this.originBoxSize;
        const POSITION_DISPATCHER = {
          leftTop: [x - resultSize, y - resultSize],
          rightTop: [x, y - resultSize],
          rightBottom: [x, y],
          leftBottom: [x - resultSize, y],
        };
        const [resultX, resultY] = POSITION_DISPATCHER[this.direction];

        this.boxSize = {
          width: resultSize + width,
          height: resultSize + height,
          direction: this.direction,
        };
        this.movePosition = {
          x: resultX,
          y: resultY,
        };
      });

      return;
    }

    if (!this.isPress) {
      return;
    }

    const {x: originX, y: originY} = this.originPosition;
    const {
      previewSize: {width, height},
    } = this.props;
    const {width: boxWidth, height: boxHeight} = this.boxSize;
    const [currentBoxWidth, currentBoxHeight] = [
      boxWidth + INIT_BOX_SIZE,
      boxHeight + INIT_BOX_SIZE,
    ];
    let [resultX, resultY] = [originX + clientX - x, originY + clientY - y];

    if (resultX <= 0) {
      resultX = 0;
    }

    if (resultY <= 0) {
      resultY = 0;
    }

    if (resultX + currentBoxWidth >= width) {
      resultX = width - currentBoxWidth;
    }

    if (resultY + currentBoxHeight >= height) {
      resultY = height - currentBoxHeight;
    }

    requestAnimationFrame(
      () =>
        (this.movePosition = {
          x: resultX,
          y: resultY,
        }),
    );
  }

  handleBoxMouseUp(): void {
    this.stop();
  }

  stop(): void {
    this.isResize = false;
    // reset
    this.isPress = false;
    this.originPosition = {...this.movePosition};
    this.spurt();
  }

  blockMouseDown(
    direction: Direction,
  ): (e: MouseEvent<HTMLDivElement>) => void {
    return (e: MouseEvent<HTMLDivElement>): void => {
      const {clientX, clientY} = e;

      this.isResize = true;
      this.direction = direction;
      this.pressPosition = {
        x: clientX,
        y: clientY,
      };
    };
  }

  render(): ReactNode {
    const directions: Direction[] = [
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom',
    ];
    const blocks = directions.map(direction => (
      <ScalableBlock
        key={direction}
        direction={direction}
        onMouseDown={(e: MouseEvent<HTMLDivElement>) =>
          this.blockMouseDown(direction)(e)
        }
      ></ScalableBlock>
    ));

    return (
      <AvatarSelectorMask
        onMouseMove={(e: MouseEvent<HTMLDivElement>) =>
          this.handleBoxMouseMove(e)
        }
        onMouseUp={() => this.handleBoxMouseUp()}
        onMouseLeave={() => this.stop()}
      >
        <MoveWrapper>
          <Wrapper
            onMouseUp={() => this.spurt()}
            onMouseDown={(e: MouseEvent<HTMLDivElement>) =>
              this.handleBoxMouseDown(e)
            }
            {...this.boxSize}
            {...this.movePosition}
          >
            {blocks}
          </Wrapper>
        </MoveWrapper>
      </AvatarSelectorMask>
    );
  }
}
