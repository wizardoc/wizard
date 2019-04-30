import Koa, {Context} from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

router.get('*', (context: Context) => {
  context.body = 'hello';
});

app.use(router.routes());

export {app};
