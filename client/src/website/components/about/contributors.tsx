import React, {Component, ReactNode} from 'react';
import {Inject} from '@wizardoc/injector';
import styled from 'styled-components';

import {DocService} from '../../services';

import {ContributorAvatar} from './contributor-avatar';

const Wrapper = styled.div``;

const Split = styled.div`
  width: 100%;
  height: 1px;
  background: ${props => props.theme.deepGray};
  margin: 30px 0;
`;

const AvatarsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export class Contributors extends Component {
  @Inject
  docService!: DocService;

  render(): ReactNode {
    const avatars = this.docService
      .getContributorAvatars()
      .map(info => <ContributorAvatar key={info.displayName} {...info} />);

    return (
      <Wrapper>
        <h1 className="md-heading">Contributors</h1>
        <Split />
        <AvatarsWrapper>{avatars}</AvatarsWrapper>
      </Wrapper>
    );
  }
}
