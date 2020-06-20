var path = require('path');

module.exports = {
  mode: 'development',
  entry: './parser/parse',
  output: {
    path: path.resolve(__dirname, './parser/dist'),
    filename: 'parse.js'
  }
};
