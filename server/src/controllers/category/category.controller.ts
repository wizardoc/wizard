import {Controller} from '@nestjs/common';

import {HTTP} from '../../services';

@Controller('/category')
export class CategoryController {
  constructor(readonly _http: HTTP) {}

  // @Get()
  // async all(@Req() req: Request, @Res() res: Response): Promise<void> {
  //   this.http.proxySend(
  //     req,
  //     res,
  //     (data: Category[]): Categories => {
  //       const categories: Categories = {};

  //       for (const category of data) {
  //         (
  //           categories[category.organizationID] ??
  //           (categories[category.organizationID] = [])
  //         ).push(category);
  //       }

  //       return categories;
  //     },
  //   );
  // }
}
