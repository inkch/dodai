const minify = require('../config').js.minify
const esbuild = require('esbuild')

const buildJs = async (srcFiles, outputDir) => {
  if (typeof srcFiles === 'string') srcFiles = srcFiles.split(',')

  let result = esbuild.buildSync({
    entryPoints: srcFiles,
    logLevel: 'info',
    write: true,
    bundle: true,
    minify: minify,
    outdir: outputDir,
  })

  if (result.errors.length > 0) console.error(result.errors)
}

module.exports = buildJs
