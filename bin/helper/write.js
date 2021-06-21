const fs = require('fs')
const path = require('path')

const write = (filepath, data) => {
  if (!fs.existsSync(path.dirname(filepath))) {
    fs.mkdirSync(path.dirname(filepath), { recursive: true })
  }
  fs.writeFile(filepath, data,
    (error) => {if (error) throw new Error(error)})
}

module.exports = write
