const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: ['./src/index.js'],
  mode: mode,
  output: {
    filename: 'uxshot.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'uxshot',
    libraryTarget: 'umd',
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 2,
                },
              ],
            ],
          },
        },
      },
    ],
  },

  externals: {
    'hotkeys-js': {
      commonjs: 'hotkeys-js',
      commonjs2: 'hotkeys-js',
      amd: 'hotkeys-js',
      root: 'hotkeys',
    },
  },
};
