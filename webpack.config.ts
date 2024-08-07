import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";
import { GenerateSW } from "workbox-webpack-plugin";
import { Alias } from "./devtools/auto-alias";

const PROD = process.env.NODE_ENV === "production";
const SRC = path.resolve(__dirname, "./src");
const ROOT = path.join(SRC, "./Root/index.tsx");
const DIST = path.resolve(__dirname, "dist");
const MODE = (process.env.NODE_ENV as Configuration["mode"]) || "development";

const Config: Configuration = {
  entry: ROOT,
  mode: MODE,
  output: {
    clean: true,
    path: DIST,
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  // @ts-ignore
  devServer: {
    port: 3000,
    compress: true,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
  },
  devtool: PROD ? "source-map" : "inline-source-map",
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        sideEffects: true, 
        exclude: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "icss",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
        include: [SRC, /node_modules/],
      },
      {
        sideEffects: true, 
        test: /\.module\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                mode: "local",
              },
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
        include: [SRC, /node_modules/],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|avif)$/i,
        type: "asset/resource",
        include: [SRC],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        include: [SRC],
      },
      {
        test: /\.js$/,
        include: [SRC],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: [SRC],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: Alias.create(),
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new ForkTsCheckerWebpackPlugin(),
    PROD ? new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      disableDevLogs: true,
      mode: MODE,
    }) : undefined
  ],
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    usedExports: true,
    splitChunks: {
      minSize: 5,
      usedExports: true,
      chunks: "async",
      maxSize: 100,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "async",
          maxSize: Infinity,
          usedExports: true,
        },
      },
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
} as const;

export default Config;
