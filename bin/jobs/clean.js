const fs = require('fs')

module.exports = (dir) => {
  fs.rmdirSync(dir, { recursive: true })
}
