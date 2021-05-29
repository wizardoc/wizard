import 'reflect-metadata';
import {BrowserClient, getErrorInteractFromModule, Interceptor} from '../core';
import {
  HTTPModuleMetadata,
  HTTP_MODULE_METADATA_KEY,
  getHooksFromModule,
} from '../module';
import {HTTPService} from './http-service';
import Axios from 'axios';
import {ServerConfig} from '../services';

const NOT_A_MODULE_ERROR_MESSAGE =
  'HTTP Factory cannot create a service base on the module, please make sure the params has been decorated by @HTTPModule.';

export class HTTPFactory {
  static create(Module: any) {
    const moduleMetadata: HTTPModuleMetadata = Reflect.getMetadata(
      HTTP_MODULE_METADATA_KEY,
      Module,
    );

    // Check the params whether is module or not
    if (!moduleMetadata) {
      throw new Error(NOT_A_MODULE_ERROR_MESSAGE);
    }

    // Can Inject some context info into module here
    const module = new Module();

    const interceptor = new Interceptor(Axios);
    const hooks = getHooksFromModule(module);
    const errorInteract = getErrorInteractFromModule(module);
    const serverConfig = new ServerConfig(moduleMetadata.server);

    // Set interceptors on raw axios
    interceptor.use(moduleMetadata.interceptors ?? []);

    const client = new BrowserClient({
      addr: serverConfig.getAbsPath(),
      axios: Axios,
      catcher: errorInteract,
    });

    return new HTTPService(client, hooks);
  }
}
