const baseConfig = require("./webpack.config.base");
const { mergeWithCustomize, customizeArray } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, args) =>
  mergeWithCustomize({
    customizeArray: customizeArray({
      "module.rules": "prepend"
    })
  })(baseConfig(env, args), {
    mode: "development",
    devtool: "source-map",
    devServer: {
      proxy: {
        "/api": "http://localhost:8081"
      }
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/u,
          use: [
            "css-hot-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: {
                  auto: true,
                  exportLocalsConvention: "camelCase"
                }
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css"
      })
    ],
    output: {
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[hash].js"
    }
  });
