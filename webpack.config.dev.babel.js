import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: './example/src/index.js',
  output: {
    path: `${__dirname}/example/dist`,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      components: `${__dirname}/components/`,
      dist: `${__dirname}/dist/`
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
