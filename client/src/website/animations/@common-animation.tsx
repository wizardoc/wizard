// import {SlideProps} from '@material-ui/core/Slide';
// import {observable} from 'mobx';
// import {observer} from 'mobx-react';
// import React, {Component, ComponentType, ReactNode} from 'react';

// interface AnimationWrapperProps {
//   in: boolean;
// }

// export function CommonAnimation(
//   AnimationWrapper: ComponentType<AnimationWrapperProps & SlideProps>,
//   Target: ComponentType<any>,
// ): ComponentType {
//   @observer
//   class TCommonAnimation extends Component {
//     @observable
//     private isMounted = false;

//     render(): ReactNode {
//       return (
//         <AnimationWrapper in={this.isMounted} {...this.props}>
//           <Target></Target>
//         </AnimationWrapper>
//       );
//     }

//     componentDidMount(): void {
//       this.isMounted = true;
//     }
//   }

//   return TCommonAnimation;
// }

export {};
