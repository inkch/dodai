const config = require('../config')
const fse = require('fs-extra')
const log = require('../helper/log')

const copyImages = async () => {
  const src = config.path.root + '/src/static/images'
  const dest = config.path.public + '/assets/images'
  fse.copy(src, dest).then(() => log.pp(dest))
}

module.exports = copyImages
