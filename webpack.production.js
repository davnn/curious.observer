const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* ==========================================================================
 Webpack App Build
 ========================================================================== */
module.exports = {
  entry: {
    main: __dirname + "/src/scripts/index.ts"
  },

  output: {
    path: __dirname + "/static/_includes/assets/dist",
    filename: "[name].js"
  },

  resolve: {
    extensions: [".webpack.js", ".js", ".ts"],
    modules: ["node_modules", "src"]
  },

  module: {
    loaders: [
      { test: /\.ts$/, include: /src/, use: "ts-loader" },
      { test: /\.scss$/, include: /src/, use: ExtractTextPlugin.extract({use: "css-loader!postcss-loader!sass-loader"})
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};
