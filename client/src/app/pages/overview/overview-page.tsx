import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react';

import {OverviewSide} from '../../components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

@observer
export class OverviewPage extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <OverviewSide />
        {this.props.children}
      </Wrapper>
    );
  }
}
