const baseConfig = require("./webpack.config.base");
const { mergeWithCustomize, customizeArray } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, args) =>
  mergeWithCustomize({
    customizeArray: customizeArray({
      "module.rules": "prepend"
    })
  })(baseConfig(env, args), {
    mode: "production",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/u,
          use: [
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
    output: {
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].js"
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        chunkFilename: "css/[name].[contenthash].css"
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: { inline: false },
          discardComments: { removeAll: true }
        }
      })
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            compress: true,
            output: {
              comments: false,
              beautify: false
            }
          }
        })
      ]
    }
  });
