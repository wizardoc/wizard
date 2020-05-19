import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import {Response, Request} from 'express';
import Axios from 'axios';

@Catch(NotFoundException, Error)
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();
    const message = exception.message;
  }
}
