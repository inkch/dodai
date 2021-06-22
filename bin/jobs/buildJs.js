const { srcRoot, outputRoot, minify } = require('../config').js
const log = require('../helper/log')
const glob = require('../helper/glob')
const esbuild = require('esbuild')

const buildJs = async (srcFiles) => {
  srcFiles = srcFiles ?? await glob(srcRoot, ['**/*.js', '!**/_*.js'])
  if (typeof srcFiles === 'string') srcFiles = srcFiles.split(',')

  let result = esbuild.buildSync({
    entryPoints: srcFiles,
    logLevel: 'info',
    write: true,
    bundle: true,
    minify: minify,
    outdir: outputRoot,
  })

  if (result.errors.length > 0) {
    log.err('Error: bin/jobs/buildJs.js\n')
    log.raw(result.errors)
  }
}

module.exports = buildJs
