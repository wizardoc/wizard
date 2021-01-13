import React, {Component, ReactNode, ComponentType} from 'react';
import {Card, Button, ButtonProps} from '@material-ui/core';
import styled from 'styled-components';

import PhoneGuideImg from 'website/assets/static/phone.png';

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: -300px;
  z-index: 1;
  margin-left: 120px;
`;

const Knowledge = styled(Card)`
  width: 800px;
  height: 600px;
  overflow: auto !important;
  padding: 30px 260px 30px 50px;
  box-sizing: border-box;
`;

const PhoneGuide = styled.img`
  height: 600px;
  position: absolute;
  right: -420px;
  top: 0;
`;

const KnowledgeCardWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.titleColor};
`;

const TitleLine = styled.div`
  width: 100px;
  height: 2px;
  margin-right: 20px;
  border-radius: 10000px;
  background: ${props => props.theme.mainPrimaryColor};
`;

const Description = styled.div`
  color: ${props => props.theme.subTitleGray};
  letter-spacing: 3px;
  line-height: 35px;
  margin-top: 30px;
`;

const GoTo = styled(Button)`
  border-radius: 10000px !important;
  width: 120px !important;
  background: ${props => props.theme.mainSecondaryColor} !important;
  color: ${props => props.theme.white} !important;
  margin-top: 40px !important;
` as ComponentType<ButtonProps>;

export class KnowledgeCard extends Component {
  render(): ReactNode {
    return (
      <Wrapper>
        <KnowledgeCardWrapper>
          <Knowledge>
            <Title>
              <TitleLine />
              <span>基于组织的知识管理和文档管理</span>
            </Title>
            <Description>
              任何东西的文档都是有一定价值的，都是值得去书写去记录下来的，Wizard
              提供一套文档管理系统，帮助管理日常的常见
              的文档类型，提供一套可靠的管理方式，使得文档管理更加轻松。Wizard
              是基于组织进行管理的，人员的划分都是以组织
              为单位的，这类的划分方式可以直接基于文档之上进行组织内的知识管理，知识管理分享，也可视作一个简单的博客社区，在
              此之上也是一个绝佳的交流平台！
            </Description>
            <GoTo variant="contained">去看看！</GoTo>
          </Knowledge>
          <PhoneGuide src={PhoneGuideImg} />
        </KnowledgeCardWrapper>
      </Wrapper>
    );
  }
}
