/*
function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }

    return sources;
}
const path = require('path');


var config = {
  entry: {
    runTheList: getEntrySources([
        './client/src/App.js'
    ])
  },
  output: {
      //publicPath: 'http://localhost:8080/',
      path: path.join(__dirname, '/public'),
      filename: '[name].js'
  },

  module : {
    loaders : [
      { test: /\.js$/, loaders: ['react-hot', 'jsx', 'babel'], exclude: /node_modules/ },
      { test: /\.jsx$/, loaders: ['react-hot', 'jsx', 'babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },
};

module.exports = config;
*/

const path = require('path');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js',
  },

  module: {

     // apply loaders to files that meet given conditions
     loaders: [{
       test: /\.jsx?$/,
       include: path.join(__dirname, '/client/src'),
       loader: 'babel',
       query: {
         presets: ["react", "es2015"]
       },
     },
     { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
     ],
   },

   // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
   watch: true
};
