const watch = require('node-watch')

const config = require('./config')
const log = require('./helper/log')
const clean = require('./jobs/clean')
const copyImages = require('./jobs/copyImages')
const buildEjs = require('./jobs/buildEjs')
const buildSampleArticles = require('./jobs/buildSampleArticles')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')
const serve = require('./jobs/serve')


Promise.all([
  clean(),
  buildEjs(),
  buildSampleArticles(),
  buildSass(),
  buildJs(),
  copyImages(),
]).catch((e) => {
  log.err('Error: bin/dev.js')
  log.raw(e)
}).then(serve)

/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
watch(config.ejs.srcRoot, { recursive: true },
  (event, _) => (event === 'update') && buildEjs())


watch(config.sass.srcRoot, { recursive: true },
  (event, _) => (event === 'update') && buildSass())


watch(config.js.srcRoot, { recursive: true },
  (event, _) => (event === 'update') && buildJs())
