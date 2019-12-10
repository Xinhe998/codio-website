const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/public/index.html`,
  filename: 'index.html',
  inject: 'body',
  hash: true,
  favicon: `${__dirname}/public/favicon.ico`,
  title: 'Codio',
});

const EnvironmentPlugin = new webpack.EnvironmentPlugin({
  API_URL: process.env.API_URL,
  imgurClient: process.env.imgurClient,
  WS_URL: process.env.WS_URL,
});

const CopyPluginConfig = new CopyPlugin([
  { from: 'public/_redirects', to: '' },
]);

module.exports = {
  // JavaScript執行的入口
  entry: {
    main: './src/index.js',
  },
  output: {
    // 將輸出的檔案放到這個資料夾下
    path: path.join(__dirname, 'dist/'),
    // 將所有依賴的模組都合併輸出到這個檔案
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node-modules/,
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|JPE?G|png|PNG|gif|GIF|svg|SVG|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=1024&name=[sha512:hash:base64:7].[ext]',
      },
    ],
  },
  devtool: 'eval',
  // webpack-dev-server 設定
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    inline: true,
    port: 5000,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), HTMLWebpackPluginConfig, CopyPluginConfig, EnvironmentPlugin],
};
