var weight = 500;

function dependencies(settings) {
  return {
    devDependencies: {
      'pug-loader' : '^2.3.0'
    }
  };
}

function config() {
  return {
    loaders: [{ test: /\.pug$/, loader: 'pug' }],
    extensions: ['.pug']
  };
}
