const outputStyle = require('../config').sass.outputStyle

const write = require('../helper/write')
const sass = require('sass')

const buildSass = async (src, sassRoot, outputRoot) => {

  if (!Array.isArray(src)) src = [ src ]
  src.forEach((f) => {
    const result = sass.renderSync({
      file: f,
      outputStyle: outputStyle
    })

    const dest = f.replace(sassRoot, outputRoot)
                  .replace('.scss', '.css')

    console.log(`  ${dest}`)
    write(dest, result.css)
  })
  console.log()
}

module.exports = buildSass
