const path = require('path');

module.exports = {
  entry: './src/MapComponent.js', // Adjust if your entry file is different
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'map-component.bundle.js',
    library: 'MapComponent', // This will be window.MapComponent
    libraryTarget: 'umd',    // Universal Module Definition for max compatibility
    globalObject: 'this',    // Ensures compatibility in various environments
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Ensure you have Babel configured for React
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // To bundle mapbox-gl CSS
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  externals: {
    // Optionally, if you want to EXCLUDE React from the bundle (not recommended for your use case)
    // react: 'React',
    // 'react-dom': 'ReactDOM'
  },
};
