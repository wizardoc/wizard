import {ComponentType} from 'react';

import {traverse} from './helpers';

/**
 * ViewPortObserver 是 IntersectionObserver 的浅层封装，用于监听目标元素是否在可视区域
 *
 * Example:
 *
 * new ViewPortObserver().ele(fooRef).listen(
 *  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
 *    //... do something
 *  }
 * )
 *
 * 同时监听多个元素 fooRef, barRef
 *
 * new ViewPortObserver().ele(fooRef).ele(barRef).listen(
 *  (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
 *    //... do something
 *  }
 * )
 *
 * @author Younccat
 *
 */
export class ViewPortObserver {
  private doms: HTMLElement[] = [];

  constructor(private options?: IntersectionObserverInit) {}

  ele(ele: HTMLElement): ViewPortObserver {
    this.doms.push(ele);

    return this;
  }

  listen(cb: IntersectionObserverCallback): void {
    const instance = new IntersectionObserver(cb, this.options);

    traverse(this.doms, (dom: HTMLElement) => instance.observe(dom));
  }
}

export function viewObservable<T extends ComponentType<P>, P>(Wrapper: T): any {
  console.info(Wrapper);
  // const ele = cloneElement(<Wrapper />);
}

export interface IViewObservable {
  onObserve(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
  ): void;
}
