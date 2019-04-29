const Path = require('path');

module.exports = function override(config) {
  const {entry} = config;

  config.entry.pop();
  config.entry = [...entry, Path.resolve('./src/app/index.tsx')];

  return config;
};
