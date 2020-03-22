const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development", //webpack knows to run in dev mode. Sets node env in dev and disables production only features
  target: "web", // For browser, can also be set to node for apps running in node
  devtool: "cheap-module-source-map", //Source map let us see original code in the browser
  entry: "./src/index", //entry point of the app
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/", //public url of the output directory when its referenced in the browser
    filename: "bundle.js"
  },
  devServer: {
    stats: "minimal",
    overlay: true,
    historyApiFallback: true,
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.png"
    })
  ],
  //tell webpack what files to handle
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-header", "css-loader"]
      }
    ]
  }
};
