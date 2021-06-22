const { srcRoot, outputRoot, outputStyle} = require('../config').sass

const write = require('../helper/write')
const log = require('../helper/log')
const glob = require('../helper/glob')
const sass = require('sass')

const buildSass = async (src) => {
  src = src ?? await glob(srcRoot, ['**/*.scss', '!**/_*.scss'])
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

  log.newline() // 実行時のログを見やすくするために改行したい
}

module.exports = buildSass
