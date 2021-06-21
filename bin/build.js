const fs = require('fs')
const buildEjs = require('./jobs/buildEjs')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')
const glob = require('./helper/glob')

const buildAll = async () => {
  glob('src/ejs', ['**/*.ejs', '!**/_*.ejs'])
    .then(( ejsFiles ) => buildEjs(ejsFiles, 'src/ejs', 'public'))

  glob('src/sass', ['**/*.scss', '!**/_*.scss'])
    .then(sassFiles => buildSass(sassFiles, 'src/sass', 'public/assets/css'))

  glob('src/js', ['**/*.js', '!**/_*.js'])
    .then(jsFiles => buildJs(jsFiles, 'public/assets/js'))
}


fs.rmdirSync('public', { recursive: true })
buildAll().catch(e => console.error(e))
