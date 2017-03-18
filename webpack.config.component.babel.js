import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';

export default {
  entry: './components/Hai.jsx',
  output: {
    path: `${__dirname}/dist/`,
    filename: 'Hai.js',
    libraryTarget: 'umd'
  },
  externals: [{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }, {
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }],
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new BabiliPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};
