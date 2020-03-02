/**
 * The method is used to traverse target array, break when the cb returns false
 * @params arr target array
 * @params fn traverse cb
 */
export function traverse<T>(arr: T[], fn: (item: T) => boolean | void): void {
  for (const item of arr) {
    if (fn(item) === false) {
      return;
    }
  }
}

/**
 * process values just like functor
 */
export class Pipe<T = any> {
  private constructor(private val: T) {}

  next(cb: (v: T) => T, condition?: (v: T) => boolean): Pipe {
    if ((condition ?? (() => {}))(this.value)) {
      this.val = cb(this.val);
    }

    return this;
  }

  valueOf(): T {
    return this.val;
  }

  toString(): T {
    return this.val;
  }

  static from<T>(val: T): Pipe<T> {
    return new Pipe(val);
  }

  get value(): T {
    return this.val;
  }
}
