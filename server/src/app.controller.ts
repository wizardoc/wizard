import {Controller, Get} from '@nestjs/common';

import {HTTP} from './services';

@Controller('/')
export class AppController {
  constructor(private readonly http: HTTP) {}

  @Get()
  async getHello(): Promise<string> {
    const res = await this.http.get('/doc/wizard');

    console.info(res.data.data);

    return '/';
  }
}
