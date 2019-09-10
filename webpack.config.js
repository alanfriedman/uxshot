const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './src/index.js',
  mode: mode,
  output: {
    filename: 'uxshot.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'uxshot',
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  externals: {
    'hotkeys-js': 'hotkeys-js',
  },
};
