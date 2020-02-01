import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';

import {withFade} from 'src/app/animations';

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
}

@withFade({direction: 'left'})
export class GraphicContentStandard extends Component<
  GraphicContentStandardProps
> {
  private contentStandardRef = createRef<HTMLDivElement>();

  render(): ReactNode {
    const {contentStandard} = this.props;

    return (
      <ContentStandard ref={this.contentStandardRef} className="animated">
        {contentStandard}
      </ContentStandard>
    );
  }
}
