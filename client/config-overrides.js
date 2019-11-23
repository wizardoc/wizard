// const {ReactLoadablePlugin} = require('react-loadable/webpack');
const Path = require('path');
const {DllReferencePlugin} = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const {IS_SSR} = process.env;
// const nodeExternals = require('webpack-node-externals');

module.exports = function override(config) {
  const {entry, resolve = {}} = config;
  const {alias = {}} = resolve;

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

  const plugins = [
    new DllReferencePlugin({
      manifest: require('./static/vendor.manifest'),
    }),
    new AddAssetHtmlPlugin({
      filepath: Path.resolve(__dirname, '../static/dll/_dll_vendor.js'),
      outputPath: 'dll',
      publicPath: 'dll',
      includeSourcemap: false,
    }),
  ];

  config.plugins.push(...plugins);
  config.resolve.alias = {
    ...alias,
    '~': Path.resolve('src/app'),
    '~imgs': Path.resolve('src/app/assets/static'),
  };
  config.entry.pop();
  config.entry = [...entry, Path.resolve('./src/app/index.tsx')];

  return config;
};
