import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import {ReleaseTagProps, ReleaseTag} from './release-tag';

export interface ReleaseBannerProps extends ReleaseTagProps {}

const Wrapper = styled.div`
  background: ${props => props.theme.translucentWhite};
  padding: 3px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  color: white;
  position: absolute;
  top: -60px;
`;

const ReleaseText = styled.div`
  color: ${props => props.theme.white};
  margin-left: 10px;
`;

export class ReleaseBanner extends Component<ReleaseBannerProps> {
  render(): ReactNode {
    const {tag} = this.props;

    return (
      <Wrapper>
        <ReleaseTag tag={tag}></ReleaseTag>
        <ReleaseText>Wizard 0.01-beta is released!</ReleaseText>
        <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
      </Wrapper>
    );
  }
}
