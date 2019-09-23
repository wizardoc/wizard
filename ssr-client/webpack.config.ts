import * as Path from 'path';

import {Configuration} from 'webpack';

class WebpackConfig implements Configuration {
  entry = './src/index.tsx';

  module = {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
          'awesome-typescript-loader',
        ],
      },
    ],
  };

  output = {
    filename: 'client.bundle.js',
    path: Path.resolve(__dirname, '../server/public/client/'),
  };

  resolve = {
    extensions: ['.ts', '.tsx', '.js'],
  };
}

export = new WebpackConfig();
