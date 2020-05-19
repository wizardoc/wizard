import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';

import {HTTP} from 'src/services';

@Catch(NotFoundException, Error)
export class GlobalErrorFilter implements ExceptionFilter {
  constructor(private readonly http: HTTP) {}

  async catch(_exception: HttpException, host: ArgumentsHost): Promise<void> {
    const {getRequest, getResponse} = host.switchToHttp();

    this.http.proxy(getRequest(), getResponse());
  }
}
