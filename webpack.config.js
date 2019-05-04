const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: __dirname,
  entry: ["./client/src/index.js"],
  output: {
     path: path.resolve(__dirname, './client/build'),
     filename: 'bundle.js'
   },
  target: 'web',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
    })
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name]-[hash:8].[ext]'
                },
            },
        ]
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8080"
    }
},
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
