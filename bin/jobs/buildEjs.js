const {data, srcRoot, outputRoot} = require('../config').ejs

const write = require('../helper/write')
const log = require('../helper/log')
const ejs = require('ejs')

const buildEjs = async (src) => {
  if (!Array.isArray(src)) src = [ src ]
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
}

module.exports = buildEjs
