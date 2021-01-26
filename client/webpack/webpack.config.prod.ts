import {Configuration, EnvironmentPlugin, optimize} from 'webpack';
import merge from 'webpack-merge';

import {RuntimeEnv} from '../src/website/types/environment';

import {WebpackDefaultConfig} from './webpack.config';
import {withWebpackPath} from './utils';

const DIST_PATH = withWebpackPath('..', 'server', 'client-dist');

const WebpackProdConfig: Configuration = merge(WebpackDefaultConfig, {
  mode: RuntimeEnv.PRODUCTION,
  output: {
    path: DIST_PATH,
  },
  plugins: [
    new EnvironmentPlugin({
      RUNTIME_ENV: RuntimeEnv.PRODUCTION,
    }),
    new optimize.MinChunkSizePlugin({
      minChunkSize: 10000,
    }),
  ],
});

export default WebpackProdConfig;
