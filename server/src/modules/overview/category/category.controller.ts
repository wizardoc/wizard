import {Controller, Get, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {Category, Categories} from '@wizardoc/shared';

import {HTTP} from 'src/services';

@Controller('/category')
export class CategoryController {
  constructor(private readonly http: HTTP) {}

  @Get()
  async all(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.http.proxySend(
      req,
      res,
      (data: Category[]): Categories => {
        const categories: Categories = {};

        for (const category of data) {
          (categories[category.organizationID] ?? []).push(category);
        }

        return categories;
      },
    );
  }
}
