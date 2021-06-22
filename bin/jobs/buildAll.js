const config = require('../config')
const buildEjs = require('./buildEjs')
const buildSass = require('./buildSass')
const buildJs = require('./buildJs')
const glob = require('../helper/glob')

const buildAll = async () => {
  glob(config.ejs.srcRoot, ['**/*.ejs', '!**/_*.ejs'])
    .then(( ejsFiles ) => buildEjs(ejsFiles))

  glob(config.sass.srcRoot, ['**/*.scss', '!**/_*.scss'])
    .then(sassFiles => buildSass(sassFiles))

  glob(config.js.srcRoot, ['**/*.js', '!**/_*.js'])
    .then(jsFiles => buildJs(jsFiles))
}

module.exports = buildAll
