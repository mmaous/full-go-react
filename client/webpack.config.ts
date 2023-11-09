/* eslint-disable */
export {}
//@ts-nocheck
/*** webpack ****/
const Dotenv = require('dotenv-webpack');

import path from 'path';
import webpack from 'webpack';
// import PurgeCSS webpack plugin and glob-all
// import PurgeCSSPlugin from 'purgecss-webpack-plugin';
// import glob from 'glob-all';

import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function () {
  const isDevelopment = process.env.REACT_APP_DEV === 'true';
  const isProduction = !isDevelopment;

  console.log(isDevelopment ? 'Developement mode' : 'Production mode');
  console.log(
    isDevelopment
      ? "Creating a Developement build which isn't Ideal for production use, run `build` instaed"
      : 'Creating an optimized production build...'
  );
  // assign objects with hot and client to object entry
  const entry = isProduction
    ? {
        app: {
          import: path.join(__dirname, 'src', 'index.tsx'),
          dependOn: 'vendor',
        },
        vendor: ['react', 'react-dom'],
      }
    : {
        app: {
          import: path.join(__dirname, 'src', 'index.tsx'),
          dependOn: 'vendor',
        },
        vendor: ['react', 'react-dom'], // Runtime code for hot module replacement
        hot: 'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
      };

  const splitChunks = isDevelopment
    ? {
        cacheGroups: {
          default: {
            minChunks: 2,
            reuseExistingChunk: true,
          },
          vendors: false,
        },
      }
    : {
        chunks: (chunk: any) => !/^(polyfills|pages|modules)$/.test(chunk.name),
        cacheGroups: {
          vendor: {
            chunks: 'all',
            name: 'vendors',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/]/,
            priority: 40,
            enforce: true,
          },
          common: {
            name: 'commons',
            test: /(common|layout|hooks|misc)/,
            minChunks: 1,
            priority: 30,
            reuseExistingChunk: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
          default: false,
          vendors: false,
        },
        maxInitialRequests: 10,
        minSize: 30000,
        // minSize: { javascript: 20000, 'css/mini-extra': 10000 },
      };
  return {
    target: 'web',

    mode: isProduction ? 'production' : 'development',

    // uncoment for better error messages readability
    // stats: { errorDetails: true, children: true },
    stats: isDevelopment ? 'minimal' : 'errors-only',

    entry,

    output: {
      chunkFilename: isDevelopment ? 'static/js/[name].chunk.js' : 'static/js/[contenthash:14].chunk.js',
      filename: isDevelopment ? 'static/js/main-[name]-bundle.js' : 'static/js/[name].[contenthash:4].js',
      assetModuleFilename: isDevelopment ? 'static/media/[name].[ext]' : 'static/media/[name].[hash:4][ext]',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
    },

    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      fallback: { path: require.resolve('path-browserify'), os: require.resolve('os-browserify/browser') },
    },

    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? 'production' : 'development',
            },
          },
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.css$/,
          use: [isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },

    devtool: isDevelopment ? 'eval-source-map' : false,

    devServer: {
      static: './build',
      port: 3000,

      // Dev server client for web socket transport, hot and live reload logic
      client: false,
      historyApiFallback: true,

      // host configs for development
      // webSocketServer: false,
      allowedHosts: ['.nip.io'],

      // extra
      compress: true,
    },

    performance: {
      hints: isDevelopment ? false : 'warning',
    },

    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          minify: TerserPlugin.uglifyJsMinify,
          // `terserOptions` options will be passed to `uglify-js`
          // Link to options - https://github.com/mishoo/UglifyJS#minify-options
          terserOptions: {},
        }),
        new CssMinimizerPlugin(),
      ],

      chunkIds: 'named',
      splitChunks: { ...splitChunks, chunks: 'all' },
      runtimeChunk: 'single',
      moduleIds: 'named',
      concatenateModules: true,
      flagIncludedChunks: true,
      sideEffects: true,
    },

    plugins: [
      new Dotenv({
        systemvars: true,
        silent: true,
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: './public/index.html',
        scriptLoading: 'module',
        ...(isProduction
          ? {
              hash: true,
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined),
      }),
      ...(isDevelopment
        ? [
            new BundleAnalyzerPlugin({ logLevel: 'error' }),
            // new webpack.debug.ProfilingPlugin({
            //   outputPath: path.join(__dirname, 'profiling/profileEvents.json'),
            // }),
            // Plugin for hot module replacement
            new webpack.HotModuleReplacementPlugin(),
            new MiniCssExtractPlugin({ filename: '[name].css' }),
            // new PurgeCSSPlugin({
            //   paths: glob.sync(`${path.resolve(__dirname, 'src')}/**/*`, { nodir: true }),
            // }),
          ]
        : [
            new MiniCssExtractPlugin({
              filename: 'static/css/[name].[contenthash:8].css',
              chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            new CompressionPlugin({
              algorithm: 'gzip',
              minRatio: 0.8,
              threshold: 8192,
              test: /\.(ts|tsx)$|\.js$|\.css$|\.svg$|\.html$/,
            }),
          ]),
    ],
  };
};
