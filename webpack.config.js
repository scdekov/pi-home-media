const {resolve} = require('path');

module.exports = env => {
  env = env || { dev: true };

  return {
    context: resolve('client'),

    entry: {
      index: './index.js',
      stream: './stream-page.js'
    },

    output: {
      path: resolve('dist'),
      filename: '[name]-bundle.js',
      pathinfo: !env.prod
    },

    module: {
      rules: [
        { test: /\.(js|jsx)$/, loader: 'babel-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
      ]
    },
  }
}
