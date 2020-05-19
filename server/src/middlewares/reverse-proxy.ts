import {NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';

export class ReverseProxyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void): void {
    createProxyMiddleware({
      target: 'http://localhost:4000',
      changeOrigin: true,
    })(req, res, next);
  }
}
