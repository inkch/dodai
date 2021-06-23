const { data, pagesDir, outputRoot } = require('../config').ejs

const write = require('../helper/write')
const log = require('../helper/log')
const glob = require('../helper/glob')
const ejs = require('ejs')

const buildEjs = async () => {
  const ejsFiles = await glob(pagesDir, ['**/*.ejs', '!**/_*.ejs'])

  ejsFiles.forEach(ejsFile => {
    ejs.renderFile(ejsFile, data, (err, html) => {
      if (err) {
        log.err('Error: bin/jobs/buildEjs.js')
        log.raw(err)
        throw new Error(err)
      }

      const dest = ejsFile.replace(pagesDir, outputRoot).replace('.ejs', '.html')
      log.pp(dest)
      write(dest, html)
    })
  })

  log.newline() // 実行時のログを見やすくするために改行したい
}

module.exports = buildEjs
