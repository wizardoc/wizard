import 'reflect-metadata';

// tslint:disable-next-line:import-path-no-parent
import {Injector} from '.';

const {Injectable, extract} = new Injector();

@Injectable()
class D {
  say() {
    console.info('sayD');
  }
}

@Injectable()
class C {
  say() {
    console.info('sayC');
  }
}

@Injectable()
class B {
  constructor(private d: D) {}

  say() {
    this.d;
    console.info('sayB');
  }
}

@Injectable()
export class A {
  constructor(private b: B, private c: C, private a: number) {}

  say() {
    this.a;
    this.b.say();
    this.c.say();
  }
}

console.info(extract(A).say());
