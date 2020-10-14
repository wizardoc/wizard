import {Controller, Get, Req, Res, Post} from '@nestjs/common';
import {Request, Response} from 'express';
import {Document, RawDocument} from '@wizardoc/shared';
import {omit} from 'lodash';

import {HTTP} from 'src/services';

@Controller('/doc')
export class DocumentProcessorController {
  constructor(readonly _http: HTTP) {}

  @Get('/detail/:id')
  async detail(@Req() req: Request, @Res() res: Response): Promise<void> {
    this._http.proxySend(req, res, async (document: RawDocument) => {
      const {userID, organizationID} = document;
      const resData = omit(
        {...document, headings: JSON.parse(document.headings)},
        'userID',
        'organizationID',
      ) as Document;

      const [userDetailResult, organizationDetailResult] = await Promise.all(
        [
          `/user/detail/${userID}`,
          `/organization/detail/${organizationID}`,
        ].map(api => this._http.get(api, {}, {headers: req.headers})),
      );

      userDetailResult
        // .expect(err => console.error(err))
        .success(payload => {
          resData.author = payload.data;
        });

      organizationDetailResult
        .expect(err => console.error(err.response!.data))
        .success(payload => {
          resData.organizationInfo = payload.data;
        });

      return resData;
    });
  }

  @Post('/')
  async create(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.info(req.body.headings);
    req.body = {...req.body, headings: JSON.stringify(req.body.headings ?? [])};

    this._http.proxySend(req, res);
  }
}
