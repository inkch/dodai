const log = require('./helper/log')
const buildAll = require('./jobs/buildAll')
buildAll().catch(e => {
  log.err('Error: bin/build.js > buildAll()')
  log.hint('See also: bin/jobs/buildAll.js')
  log.raw(e)
})
