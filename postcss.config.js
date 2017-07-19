module.exports = {
  plugins: [
    require("postcss-flexbugs-fixes"),
    require("autoprefixer")({ browsers: ["last 2 versions"] }),
    require("postcss-csso")
  ]
};
