const { srcRoot, outputRoot, outputStyle} = require('../config').sass

const write = require('../helper/write')
const log = require('../helper/log')
const sass = require('sass')

const buildSass = async (src) => {

  if (typeof src === 'string') src = src.split(',')
  src.forEach((f) => {
    const result = sass.renderSync({
      file: f,
      outputStyle: outputStyle
    })

    const dest = f.replace(srcRoot, outputRoot)
                  .replace('.scss', '.css')

    log.pp(dest)
    write(dest, result.css)
  })
}

module.exports = buildSass
