const config = require('../config')
const path = require('path')
const chalk = require('chalk')
const _log = console.log



module.exports = {
  // Pretty Path
  pp: (pathstr) => {
    _log('  '
      + path.dirname(pathstr).replace(config.path.root + '/', '')
      + '/' + chalk.white.bold(path.basename(pathstr)))
  },
  err: (lines) => {
    if (typeof lines === 'string') lines = lines.split('\n')
    _log()
    _log(chalk.red.underline(lines[0]))
    for (let i = 1; i < lines.length; i++) {
      _log('  ' + chalk.red(lines[i]))
    }
  },
  raw: (any) => {
    _log(any)
  },
  hint: (msg) => {
    _log('  ' + chalk.yellow.bold(msg))
  },
  newline: () => _log(''),
}
