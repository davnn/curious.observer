const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

/* ==========================================================================
 Webpack App Build
 ========================================================================== */
module.exports = {
  entry: {
    main: __dirname + "/src/scripts/index.ts"
  },

  devtool: "cheap-module-eval-source-map",

  devServer: {
    contentBase: [
      "public" // contentBase is watched and reloads page on change
    ],
    disableHostCheck: true, // let anyone connect to the webpack dev server
    host: "0.0.0.0" // useful for viewing the site on other devices on the local network
  },

  output: {
    publicPath: "/dist",
    filename: "[name].js"
  },

  resolve: {
    extensions: [".webpack.js", ".js", ".ts"],
    modules: ["node_modules", "src"]
  },

  module: {
    loaders: [
      { test: /\.ts$/, include: /src/, use: "ts-loader" },
      { test: /\.scss$/, include: /src/, use: [
        { loader: 'style-loader', options: { sourceMap: true } },
        { loader: 'css-loader', options: { sourceMap: true } },
        { loader: 'postcss-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css"),
    new StyleLintPlugin()
  ]
};
