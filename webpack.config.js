const {resolve} = require('path');

module.exports = env => {
  env = env || { dev: true };

  return {
    context: resolve('client'),
    entry: './index.js',
    output: {
      path: resolve('dist'),
      filename: 'bundle.js',
      pathinfo: !env.prod
    },
    module: {
      rules: [
        { test: /\.(js|jsx)$/, loader: 'babel-loader' },
        { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
      ]
    }
  }
}
