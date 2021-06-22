const config = require('../config')
const buildEjs = require('./buildEjs')
const buildSass = require('./buildSass')
const buildJs = require('./buildJs')
const glob = require('../helper/glob')

const buildAll = async () => {
  // glob(config.ejs.srcRoot, ['**/*.ejs', '!**/_*.ejs'])
  //   .then(( ejsFiles ) => buildEjs(ejsFiles))
  buildEjs()
  buildSass()
  buildJs()
}

module.exports = buildAll
