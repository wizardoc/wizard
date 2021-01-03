import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  NotFoundException,
} from '@nestjs/common';
import {Request, Response} from 'express';
import {ClientError} from 'graphql-request';

@Catch(Error)
export class GlobalErrorFilter implements ExceptionFilter {
  async catch(
    {response: {data, err}}: ClientError,
    host: ArgumentsHost,
  ): Promise<void> {
    const res = host.switchToHttp().getResponse<Response>();

    res.send({data, err});
  }
}
