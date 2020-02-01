import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {withFade, FadeInComponentProps} from 'src/app/animations';

interface FadeInImgProps {
  isFadeIn: boolean;
}

const FadeInImg = styled.img<FadeInImgProps>`
  width: 540px;
  opacity: ${props => (props.isFadeIn ? 1 : 0)};
  transition: 0.3s;
`;

interface GraphicImgProps {
  graphicImg: string;
}

type GraphicComposeProps = GraphicImgProps & Partial<FadeInComponentProps>;

@withFade({direction: 'right'})
@observer
export class GraphicImg extends Component<GraphicComposeProps> {
  @observable
  isFadeIn = false;

  constructor(props: GraphicComposeProps) {
    super(props);

    props.OnFadeInComplete!(() => (this.isFadeIn = true));
  }

  render(): ReactNode {
    const {graphicImg} = this.props;

    return <FadeInImg src={graphicImg} isFadeIn={this.isFadeIn} />;
  }
}
