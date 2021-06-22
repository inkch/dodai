const fs = require('fs')
const http = require('http');
const livereload = require('livereload')
const watch = require('node-watch')
const picomatch = require('picomatch')

const config = require('./config')
const glob = require('./helper/glob')
const log = require('./helper/log')
const buildAll = require('./jobs/buildAll')
const buildEjs = require('./jobs/buildEjs')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')


const startLivereload = () => {
  livereload
    .createServer({ port: config.livereload.port })
    .on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        log.err([
          'Error: livereload',
          'Address already in use ' + e.address + ':' + e.port
        ])
        log.hint('Try a different port number that can be configured in `bin/config.js`')
        log.raw('\nAborted.')
        close()
      }})
    .watch(config.path.public)
}

buildAll().then(() => {
  if (!config.livereload.enable) return
  startLivereload()
})


const server = http.createServer((req, res) => {
  fs.readFile(config.path.public + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    log.err([
      'Error: http',
      'Address already in use ' + e.address + ':' + e.port
    ])
    log.hint('Try a different port number that can be configured in `bin/config.js`')
    log.raw('\nAborted.')
    close()
  }
}).listen(config.server.port);

const close = () => {
  server.close()
  process.exit()
}

process.on('SIGINT', close)
process.on('SIGTERM', close)


watch(config.ejs.srcRoot, { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    if (picomatch('**/_*.ejs')(filename)) {
      glob(config.ejs.srcRoot, ['**/*.ejs', '!**/_*.ejs'])
        .then((ejsFiles) => buildEjs(ejsFiles))
    } else {
      buildEjs(filename)
    }
  })


watch(config.sass.srcRoot, { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    if (picomatch('**/_*.scss')(filename)) {
      glob(config.sass.srcRoot, ['**/*.sass', '!**/_*.sass'])
        .then((ejsFiles) => buildEjs(ejsFiles))
    } else {
      buildSass(filename)
    }
  })


watch(config.js.srcRoot, { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    buildJs(filename)
  })
