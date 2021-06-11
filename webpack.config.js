const path = require('path');
const nodeExternals = require('webpack-node-externals');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  mode: NODE_ENV,
  entry: './src/index.ts',
  target: 'node',
  watch: NODE_ENV === 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'StarWarsService',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ],
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  externals: [
    nodeExternals()
  ]
};
