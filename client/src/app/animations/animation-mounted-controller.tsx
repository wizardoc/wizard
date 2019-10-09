// import {observable} from 'mobx';
// import {observer} from 'mobx-react';
// import React, {Component, ComponentType, ReactNode} from 'react';

// interface TimeoutProps {
//   timeout: number;
// }

// interface InnerAnimationWrapperProps {
//   exitAnimation: any;
// }

// export function AnimationMountedController<
//   R extends InnerAnimationWrapperProps,
//   T extends TimeoutProps
// >(AnimationWrapper: ComponentType<R>, options: T): ComponentType {
//   @observer
//   class Body extends Component {
//     @observable
//     isMounted = false;

//     render(): ReactNode {
//       return <AnimationWrapper exitAnimation="1"></AnimationWrapper>;
//     }

//     handleExistAnimation(cb: Function): void {
//       const {timeout} = options;

//       this.isMounted = false;

//       setTimeout(() => cb(), timeout);
//     }

//     componentDidMount(): void {
//       this.isMounted = true;
//     }
//   }

//   return Body;
// }

export const a = 1;
