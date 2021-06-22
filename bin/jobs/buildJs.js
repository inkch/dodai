const {outputRoot, minify} = require('../config').js
const esbuild = require('esbuild')

const buildJs = async (srcFiles) => {
  if (typeof srcFiles === 'string') srcFiles = srcFiles.split(',')

  let result = esbuild.buildSync({
    entryPoints: srcFiles,
    logLevel: 'info',
    write: true,
    bundle: true,
    minify: minify,
    outdir: outputRoot,
  })

  if (result.errors.length > 0) console.error(result.errors)
}

module.exports = buildJs
