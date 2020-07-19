const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    publicPath: '/',
    proxy: {
      '/api': 'http://localhost:3000',
    },
    contentBase: common.output.path,
    inline: true,
    hot: true,
    historyApiFallback: true,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
});
