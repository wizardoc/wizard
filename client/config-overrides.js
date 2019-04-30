// const {ReactLoadablePlugin} = require('react-loadable/webpack');
const Path = require('path');
// const {IS_SSR} = process.env;
// const nodeExternals = require('webpack-node-externals');

module.exports = function override(config) {
  const {entry} = config;

  // ssr config
  // if (IS_SSR) {
  //   config.target = 'node';
  //   config.plugins.push(
  //     new ReactLoadablePlugin({filename: './build/react-loadable.json'}),
  //   );
  //   config.externals
  //     ? config.externals.push(nodeExternals())
  //     : (config.externals = [nodeExternals()]);
  // }

  config.entry.pop();
  config.entry = [...entry, Path.resolve('./src/app/index.tsx')];

  return config;
};
