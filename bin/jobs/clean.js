const publicDir = require('../config').path.public
const fs = require('fs')

module.exports = () => {
  fs.rmSync(publicDir, { recursive: true })
}
