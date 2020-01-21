import 'animate.css/animate.min.css';

import React, { Component, ReactNode, createRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import { viewObservable, ViewObservableComponentProps } from '../../utils';

export interface ContentWrapperProps {
  layout?: string
}

export interface FadeContainerProps {
  title?: string,
  ContentObj: {
    contentTitle: string,
    standard: string,
    description: string
  },
  imgSrc?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1246px;
  margin: auto;
  padding: 120px 40px;
  overflow-x: hidden;
`;
const Title = styled.h2`
  height: 56px;
  margin: 0 10vw;
  margin-bottom: 40px;
  line-height: 1.5;
  font-size: 40px;
  color: #333;
  text-align: center;

`;
const ContentContainter = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 540px;
  }
`;
const ContentTitle = styled.div`
  color: #333;
  font-size: 40px;
  animation-delay: 100ms;

`;
const ContentStandard = styled.div`
  margin: 50px 0 30px;
  width: fit-content;
  padding: 7px 20px;
  border-radius: 16px;
  font-size: 13px;
  color: rgb(41, 109, 255);
  background-color: rgb(245, 248, 255);
  animation-delay: 150ms;

`;
const ContentDesc = styled.div`
  color: #666;
  animation-delay: 200ms;

`;
const FadeInImg = styled.img`
  width: 540px;

`;

@viewObservable({ reality: true })
export class FadeContainer extends Component<FadeContainerProps & ContentWrapperProps & Partial<ViewObservableComponentProps>> {
  private wrapperRef = createRef<any>();

  transitionContainer(RenderComponent: ReactNode, className: string, isIn = false, timeout = 1000): ReactNode {
    return (
      <CSSTransition
        in={isIn}
        timeout={timeout}
        classNames={`${className} animated `}
      >
        {RenderComponent}
      </CSSTransition>
    )
  }

  iterateEl = (el: HTMLElement): HTMLElement[] => {
    const list: HTMLElement[] = [];

    if (el && el.children) {
      [...el.children].forEach((child: HTMLElement): void => {
        list.push(child);

        if (child.children) {
          list.push(...this.iterateEl(child));
        }
      })
    }

    return list;
  }

  observerEl = (nodeList: HTMLElement[]): void => {
    const observer = new IntersectionObserver(entries => {
      [...entries].forEach(change => {
        if (change.intersectionRatio > 0) {
          [...nodeList].forEach((child: HTMLElement) => {
            if (change.target === child) {
              if (child.nodeName === 'DIV' || child.nodeName === 'H2') {
                child.classList.add('fadeInUp');
              }

              if (child.nodeName === 'IMG') {
                this.props.layout === 'row' ? child.classList.add('fadeInRight') : child.classList.add('fadeInLeft');
              }
            }
          });
        }

        // if (change.intersectionRatio > 0.7) {
        //   [...nodeList].forEach((child: HTMLElement) => {
        //     observer.unobserve(child);
        //   });
        // }
      });
    });

    [...nodeList].forEach((child: HTMLElement) => {
      observer.observe(child);
    });
  }

  componentDidMount(): void {
    this.observerEl(this.iterateEl(this.wrapperRef.current));
    // tslint:disable-next-line:no-console
    this.props.onObserve!((changes) => console.log(changes))
  }

  render(): ReactNode {
    const { title, layout = 'row', ContentObj, imgSrc } = this.props;

    return (
      <Wrapper ref={this.wrapperRef}>
        <Title className='animated'>{title}</Title>
        <ContentContainter
          style={{ flexDirection: layout === 'row' ? 'row' : 'row-reverse' }}
        >
          <div>
            <ContentTitle className='animated'>{ContentObj.contentTitle}</ContentTitle>
            <ContentStandard className='animated'>{ContentObj.standard}</ContentStandard>
            <ContentDesc className='animated'>{ContentObj.description}</ContentDesc>
          </div>
          <FadeInImg className='animated' src={imgSrc} />
        </ContentContainter>
      </Wrapper>
    )
  }
}
