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
 * cp all props of the origin object to target object
 * @param origin origin object
 * @param target target object
 */
export function cp<T extends any, U extends T>(origin: T, target: U): U {
  const dup: U = {...target};

  traverse(Object.keys(origin), prop => {
    dup[prop] = origin[prop];
  });

  return dup;
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
