// webpack.config.js
const path = require('path');

module.exports = {
  // The entry point of your application
  entry: './src/index.js',
  
  // How and where to output the final bundle
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mapbox-bundle.js', // The single output file
    library: 'MapboxApp', // A global variable to access your app
    libraryTarget: 'umd'
  },
  
  // How to handle different file types
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        // This rule handles CSS files
        test: /\.css$/,
        // style-loader injects CSS into the DOM. css-loader interprets @import and url()
        use: ['style-loader', 'css-loader'] 
      }
    ]
  },
  
  // Optional: For a smaller bundle, you can treat React as an external dependency
  // if you plan to load it from a separate CDN link in CasualOS.
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
};
