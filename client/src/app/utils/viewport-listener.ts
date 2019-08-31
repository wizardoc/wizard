/** 封装 IntersectionObserver，每次只可监听一个 dom 对象 */
export class ViewportListener {
  private io: IntersectionObserver;

  constructor(
    private dom: Element,
    cb: any,
    options?: IntersectionObserverInit,
  ) {
    this.io = new IntersectionObserver(cb, options);
  }

  listen(): void {
    this.io.observe(this.dom);
  }

  stop(): void {
    this.io.unobserve(this.dom);
  }

  destroy(): void {
    this.io.disconnect();
  }
}
