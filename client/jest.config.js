module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  setupFiles: ['<rootDir>/config/polyfills.js'],
  testMatch: [
    '<rootDir>/src/test/**/*.spec.ts'
  ],
  testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.tsx?$': '<rootDir>/config/jest/typescriptTransform.js',
    '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)':
      '<rootDir>/config/jest/fileTransform.js',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$',
  ],
  moduleNameMapper: {
    "^~/(.+)$": "<rootDir>/$1"
  },
  moduleFileExtensions: [
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'web.js',
    'js',
    'web.jsx',
    'jsx',
    'json',
    'node',
    'mjs',
  ],
  globals: {
    'ts-jest': {
      tsConfigFile:
        'tsconfig.test.json',
    },
  },
};
