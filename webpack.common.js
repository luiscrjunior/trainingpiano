const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const outputPath = path.resolve(__dirname, 'docs');

module.exports = {
  entry: {
    app: './client/js/app',
  },
  output: {
    path: outputPath,
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vexflow: {
          test: /node_modules\/vexflow\/(.*)\.js/,
          name: 'vexflow',
          chunks: 'all',
        },
        vendor: {
          test: /node_modules\/(?!vexflow)(.*)\.js/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    alias: {
      css: path.resolve(__dirname, 'client/scss'),
      app: path.resolve(__dirname, 'client/js'),
      store: path.resolve(__dirname, 'client/js/store'),
      components: path.resolve(__dirname, 'client/js/components'),
    },
    extensions: ['.js', '.scss'],
  },
  module: {
    rules: [
      /* styles in this path will be exported to a single .css */
      {
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, 'client/scss')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },

      /* styles in this path will not be exported to file */
      {
        test: /\.(scss|css)$/,
        include: [path.resolve(__dirname, 'client/js')],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              url: false,
              localsConvention: 'camelCase',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },

      /* transpile js */
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'client/js')],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: 'client/static' }]),
  ],
};
