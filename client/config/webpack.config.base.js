const { resolvePath } = require("./utils");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = env => ({
  entry: {
    app: [resolvePath("src/index.tsx")]
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/u,
        include: /src/u,
        exclude: /node_modules/u,
        loader: "babel-loader"
      },
      {
        test: /\.html$/u,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff(2)?|eot|ttf|otf|svg)$/u,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/u,
        use: [
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: ["postcss-preset-env", "cssnano"]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sassOptions: {}
            }
          }
        ]
      }
    ]
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "../dist")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: resolvePath("static/index.html"),
      filename: "index.html"
    }),
    new webpack.DefinePlugin({})
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      "@": resolvePath("src/")
    }
  },
  devServer: {
    historyApiFallback: true
  }
});
