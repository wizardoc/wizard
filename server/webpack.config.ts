import Path from 'path';

import {Configuration} from 'webpack';
// tslint:disable-next-line:no-implicit-dependencies
import NodeExternals from 'webpack-node-externals';

class WebpackConfig implements Configuration {
  entry = './index.js';

  mode: Configuration['mode'] = 'development';

  externals = [NodeExternals()];

  target: Configuration['target'] = 'node';

  module = {
    /** Process CSS import with side effects */
    rules: [
      {
        test: /\.css?$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(tsx|ts)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
          'awesome-typescript-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif|svg|woff|woff2)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
    ],
  };

  output = {
    filename: 'bundle.js',
    path: Path.resolve(__dirname, 'dist'),
  };

  resolve = {
    extensions: ['.js', '.ts', '.tsx', '.jsx'],
  };
}

export = new WebpackConfig();
