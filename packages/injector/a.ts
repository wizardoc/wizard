// tslint:disable-next-line:import-path-no-parent
import {Injectable} from '.';

@Injectable()
class B {}

@Injectable()
export class A extends B {
  constructor() {}
}
