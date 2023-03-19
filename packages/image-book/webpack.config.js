const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.resolve(__dirname, 'index.tsx'),
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts)x$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  externals: [nodeExternals()]
}
