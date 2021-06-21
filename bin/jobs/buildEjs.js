const ejsData = require('../config').ejs.data

const write = require('../helper/write')
const ejs = require('ejs')

const buildEjs = async (src, srcRoot, outputRoot) => {
  if (!Array.isArray(src)) src = [ src ]
  src.forEach(ejsFile => {
    ejs.renderFile(ejsFile, ejsData, (err, html) => {
      if (err) {
        console.dir(err)
        throw new Error(err)
      }

      const dest = ejsFile.replace(srcRoot, outputRoot).replace('.ejs', '.html')
      console.log(`  ${dest}`)
      write(dest, html)
    })
  })
}

module.exports = buildEjs
