const storePool: Map<Function, Function> = new Map();

type AttributeDecoratorProcessor = (constructor: object, key: string) => void;

export function InjectStore(
  storeConstructor: Function,
): AttributeDecoratorProcessor {
  return (constructor: object, key: string) => {
    let storeInstance: Function = storePool.get(storeConstructor)!;

    if (!storePool.has(storeConstructor)) {
      storeInstance = new (storeConstructor as FunctionConstructor)();
      storePool.set(storeConstructor, storeInstance);
    }

    constructor[key] = storeInstance;
  };
}
