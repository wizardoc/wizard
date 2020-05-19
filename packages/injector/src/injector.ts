import 'reflect-metadata';

interface RegisterConstructor {
  key?: Symbol;
}

export interface Constructor<T = any> {
  new (...args: any[]): T;
}

export type Service<T = any> = Constructor<T> & RegisterConstructor;

export class Injector {
  private classPool = new Map<Symbol, any>();

  Injectable = <T = any>() => {
    return (constructor: Service<T>) => {
      this.collect(constructor);
    };
  };

  Inject = (target: any, key: string) => {
    const type: Constructor = Reflect.getMetadata('design:type', target, key);

    target[key] = this.extract(type);
  };

  extract = <T = any>(constructor: Service<T>): T => {
    if (!constructor.key) {
      constructor.key = this.genKey(constructor);
    }

    if (!this.classPool.has(constructor.key)) {
      this.classPool.set(
        constructor.key,
        new (constructor as InstanceType<any>)(),
      );
    }

    return this.classPool.get(constructor.key);
  };

  collect = <T = any>(Constructor: Service<T>): T => {
    const instance = this.createInstance(Constructor);

    Constructor.key = this.genKey(Constructor);

    this.classPool.set(Constructor.key, instance);

    return instance;
  };

  private createInstance<T = any>(Constructor: Service<T>): T {
    // The key may from parent class
    if (Constructor.key) {
      const instance = this.classPool.get(Constructor.key);

      if (instance instanceof Constructor) {
        return instance;
      }
    }

    const params: Service<T>[] =
      Reflect.getMetadata('design:paramtypes', Constructor) ?? [];

    const deps = params.map(param => {
      if (param === Constructor) {
        throw new Error('Cannot dependent yourself');
      }

      if (param.key) {
        return this.createInstance(param);
      } else {
        console.warn(`The ${param.name} doesn't register.`);

        return param;
      }
    });

    return new Constructor(...deps);
  }

  private genKey<T>(constructor: Service<T>): Symbol {
    return Symbol(constructor.name);
  }
}
