const { data, srcRoot, outputRoot } = require('../config').ejs

const write = require('../helper/write')
const log = require('../helper/log')
const glob = require('../helper/glob')
const ejs = require('ejs')

const buildEjs = async (src) => {
  src = src ?? await glob(srcRoot, ['**/*.ejs', '!**/_*.ejs'])
  if (typeof src === 'string') src = src.split(',')

  src.forEach(ejsFile => {
    data.contentFile = data.ejsroot + ejsFile.replace(srcRoot, '')
    ejs.renderFile(`${srcRoot}/_TEMPLATE.ejs`, data, (err, html) => {
      if (err) {
        log.err('Error: bin/jobs/buildEjs.js')
        log.raw(err)
        throw new Error(err)
      }

      const dest = ejsFile.replace(srcRoot, outputRoot).replace('.ejs', '.html')
      log.pp(dest)
      write(dest, html)
    })
  })

  log.newline() // 実行時のログを見やすくするために改行したい
}

module.exports = buildEjs
