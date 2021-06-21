const production = process.env.NODE_ENV === 'production'

const path = {}
path.root = __dirname.split('/').slice(0,-1).join('/')
path.src = path.root + '/src'
path.public = path.root + '/public'


const ejs = {
  data: {
    production: production,
    ejsroot: path.src + '/ejs/',
  }
}

const sass = {
  outputStyle: production ? "compressed" : "expanded",
}


const js = {
  minify: production ? true : false,
}



module.exports = {
  path,
  ejs,
  sass,
  js,
}
