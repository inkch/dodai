const log = require('./helper/log')
const clean = require('./jobs/clean')
const buildEjs = require('./jobs/buildEjs')
const buildSampleArticles = require('./jobs/buildSampleArticles')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')

Promise.all([
  clean(),
  buildEjs(),
  buildSampleArticles(),
  buildSass(),
  buildJs(),
]).catch((e) => {
  log.err('Error: bin/build.js > buildAll()')
  log.hint('See also: bin/jobs/buildAll.js')
  log.raw(e)
})
