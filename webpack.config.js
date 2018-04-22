const path = require('path');

module.exports = {
  entry: './public/index.js',
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  }
};
