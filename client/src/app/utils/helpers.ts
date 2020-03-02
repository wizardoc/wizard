/**
 * 遍历数组的方法，用来执行一些带有副作用的方法，当回调函数返回 false 时 break
 * @params arr 目标数组
 * @params fn 接收数组元素为参数的回调函数
 */
export function traverse<T>(arr: T[], fn: (item: T) => boolean | void): void {
  for (const item of arr) {
    if (fn(item) === false) {
      return;
    }
  }
}

export class Pipe<T = any> {
  private constructor(private val: T) {}

  next(cb: (v: T) => T, condition?: (v: T) => boolean): Pipe {
    if((condition ?? (() => {}))(this.value)) {
    this.val = cb(this.val);
    }

    return this;
  }

  valueOf(): T {
    return this.val;
  }

  toString():T {
    return this.val
  }

  static from<T>(val: T): Pipe<T> {
    return new Pipe(val);
  }

  get value(): T {
    return this.val;
  }
}
