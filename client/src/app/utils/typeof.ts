type Asserter = () => boolean;

interface TypeAsserter {
  isObject: Asserter;
  isArray: Asserter;
  isString: Asserter;
  isNumber: Asserter;
  isBoolean: Asserter;
  isError: Asserter;
}

export const enum DataType {
  Object = '[object Object]',
  Array = '[object Array]',
  String = '[object String]',
  Number = '[object Number]',
  Boolean = '[object Boolean]',
  Error = '[object Error]',
}

function compare(target: unknown, dataType: DataType): boolean {
  return typeAssert(target) === dataType;
}

export function typeAssert(target: unknown): string {
  return Object.prototype.toString.call(target);
}

export function typeOf(target: unknown): TypeAsserter {
  return {
    isObject: () => compare(target, DataType.Object),
    isArray: () => compare(target, DataType.Array),
    isString: () => compare(target, DataType.String),
    isNumber: () => compare(target, DataType.Number),
    isBoolean: () => compare(target, DataType.Boolean),
    isError: () => compare(target, DataType.Error),
  };
}
