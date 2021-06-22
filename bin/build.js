const buildAll = require('./jobs/buildAll')
buildAll().catch(e => console.error(e))
