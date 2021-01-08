import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import {Request, Response} from 'express';

import {HTTP} from 'src/services';

@Catch(NotFoundException)
export class TransferRequest implements ExceptionFilter {
  constructor(private readonly http: HTTP) {}

  async catch(_exception: HttpException, host: ArgumentsHost): Promise<void> {
    const {getRequest, getResponse} = host.switchToHttp();
    const req = getRequest<Request>();
    const res = getResponse<Response>();

    this.http.proxySend(req, res);
  }
}
