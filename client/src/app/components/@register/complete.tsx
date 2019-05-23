import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import RegisterSuccess from '../../assets/static/register_successful.png';

const RegisterSuccessImg = styled.img`
  width: 300px;
`;

export class Complete extends Component {
  render(): ReactNode {
    return (
      <div>
        <RegisterSuccessImg src={RegisterSuccess} />
      </div>
    );
  }
}
