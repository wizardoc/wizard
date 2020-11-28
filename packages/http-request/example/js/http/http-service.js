import {HTTPRequestFactory} from '../../..'
import ServerConfig from '../../configs/sever-config.json'
import {ReqLogger} from './interceptors/req-logger'
import {ResLogger} from './interceptors/res-logger'
import {ResErrorCatcher} from './interceptors/res-error-catcher'

export class HTTPFactory extends HTTPRequestFactory {
  configure({interceptor, serverConfigure}) {
    serverConfigure.setConfig(ServerConfig)

    interceptor.use([
      ReqLogger,
      ResLogger,
      ResErrorCatcher
    ])
  }

  errorInteract(errMsg, err) {
    console.info(err)
  }
}

const httpFactory = new HTTPFactory()

export const http = httpFactory.create()
