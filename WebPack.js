var path = require('path');
var webpack = require("webpack");
var config = require('config');
var autoprefixer = require('autoprefixer');
var fontChilli = require('./custom_modules/webpack/fontchilli/dist/index.js');


module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    'webpack/hot/dev-server',
    path.join(__dirname, 'app/entry.js')
  ],
  output: {
    path: '/',
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)?$/,
      exclude: /(node_modules|custom_modules)/,
      loader: "babel"
    }, {
      test: /\.(scss)/,
      loader: "style!css!postcss!sass"
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$|\.eot$/i,
      loader: "url?limit=10"
    }, {
      test: /\.md$/,
      loader: "html!markdown"
    }, {
      test: /\.txt/,
      loader: "raw"
    }]
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new fontChilli({
      fontName: 'fontchilli',
      svgPath: 'app/Assets/svg'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process': {
        'env.NODE_ENV': JSON.stringify(config.util.getEnv('NODE_ENV'))
      },
      'API_URL': JSON.stringify(config.get('apiURL')),
      'BASE_URL': JSON.stringify(config.get('baseURL')),
      'BASE_NAME': JSON.stringify(config.get('baseName')),
      'API_KEY': JSON.stringify(config.get('apiKey')),
      'LOGIN_URL': JSON.stringify(config.get('loginURL')),
      'GA_TRACKING_CODE': JSON.stringify(config.get('ga_tracking_code'))
    })
  ],
  resolve: {
    modulesDirectories: ['custom_modules', 'node_modules'],
    alias: {
      'vanilla-masker': path.resolve(__dirname, 'custom_modules/vanilla-masker', 'vanilla-masker.js')
    }
  }
};
