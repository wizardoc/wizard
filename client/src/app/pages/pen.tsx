import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {Pen, UtilsBox} from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderCover = styled.div`
  width: 100%;
  background: ${props => props.theme.primaryColor};
  height: 350px;
  position: sticky;
  top: -100px;
`;

const Title = styled.input`
  height: 100px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 40px;
  font-weight: 100;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.white};
  border: none;
  outline: none;
  text-align: center;
  width: 100%;
`;

const BodyWrapper = styled.div`
  box-shadow: ${props => props.theme.baseShadow};
  width: 70%;
  height: 100%;
  min-width: 850px;
  background: ${props => props.theme.white};
  border-radius: 10px;
`;

const EditorBody = styled(BodyWrapper)`
  position: relative;
  top: -200px;
  padding: 20px;
`;

@observer
export class PenPage extends Component {
  @observable
  title: string = '请输入标题';

  handleTitleBlur(): void {
    if (this.title === '') {
      this.resetTitle();
    }
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <HeaderCover>
          <Title
            onBlur={() => this.handleTitleBlur()}
            value={this.title}
            onChange={e => (this.title = e.target.value)}
          ></Title>
        </HeaderCover>
        <EditorBody>
          <UtilsBox></UtilsBox>
          <Pen></Pen>
        </EditorBody>
      </Wrapper>
    );
  }

  private resetTitle(): void {
    this.title = '请输入标题';
  }
}
