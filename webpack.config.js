const webpack = require('webpack');
const path = require('path')

const production = process.env.NODE_ENV === 'production' || false;

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'uxshot.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'uxshot',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
};