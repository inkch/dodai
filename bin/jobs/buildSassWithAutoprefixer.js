const { srcRoot, outputRoot, outputStyle} = require('../config').sass

const write = require('../helper/write')
const log = require('../helper/log')
const glob = require('../helper/glob')
const sass = require('sass')
const autoprefixer = require('autoprefixer')
const postcss = require('postcss')

const buildSass = async (src) => {
  src = src ?? await glob(srcRoot, ['**/*.scss', '!**/_*.scss'])
  if (typeof src === 'string') src = src.split(',')

  src.forEach((f) => {
    postcss([autoprefixer])
      .process(sass.renderSync({
        file: f,
        outputStyle: outputStyle
      }).css, {
        from: undefined,
        to: undefined,
      })
      .then( res => {
        res.warnings().forEach(warn => {
          console.warn(warn.toString())
        })

        const dest = f.replace(srcRoot, outputRoot)
          .replace('.scss', '.css')

        log.pp(dest)
        write(dest, res.css)
      })
  })

  log.newline() // 実行時のログを見やすくするために改行したい
}

module.exports = buildSass
