const config = {
  path: {
    root: __dirname.split('/').slice(0,-1).join('/'),
    src: __dirname.split('/').slice(0,-1).join('/') + '/src',
    public: __dirname.split('/').slice(0,-1).join('/') + '/public',
  },
  env: {
    projectroot: __dirname.split('/').slice(0,-1).join('/')
  },
  build: {
    ejs: {
      root: 'src/ejs',
    },
    sass: {
      minify: true,
      root: 'src/sass',
    },
    js: {
      minify: true,
      root: 'src/js',
    },
  },
  dev: {},
}

module.exports = config
