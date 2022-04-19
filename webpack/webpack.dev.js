const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    port: 3003,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.mode': JSON.stringify('development'),
    }),
  ],
}
