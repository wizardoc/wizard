import * as Path from 'path';

import Koa from 'koa';
import Router from 'koa-router';
import Static from 'koa-static';
import React from 'react';
import {renderToString} from 'react-dom/server';

// tslint:disable-next-line:import-path-shallowest
import {About} from '../../client/src/app/pages/about';

import {render} from './ssr';

const app = new Koa();
const router = new Router();

router.get('*', async ctx => {
  const result = await render(renderToString(<About />));

  ctx.body = result;
});

app.use(Static(Path.join(__dirname, '..')));
app.use(router.routes()).use(router.allowedMethods());

export {app};
