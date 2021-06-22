const production = process.env.NODE_ENV === 'production'

const path = {}
path.root = __dirname.split('/').slice(0,-1).join('/')
path.public = path.root + '/public'


const ejs = {
  srcRoot: path.root + '/src/ejs',
  outputRoot: path.public,
}

ejs.data = {
  production: production,
  ejsroot: ejs.srcRoot + '/',
}



const sass = {
  srcRoot: path.root + '/src/sass',
  outputRoot: path.public + '/assets/css',
  outputStyle: production ? "compressed" : "expanded",
}



const js = {
  srcRoot: path.root + '/src/js',
  outputRoot: path.public + '/assets/js',
  minify: production ? true : false,
}



const server = {
  port: 8080,
}



const livereload = {
  enable: true,
  port: 35729,
}
ejs.data.livereload = livereload




module.exports = {
  path,
  ejs,
  sass,
  js,
  server,
  livereload,
}
