const fs = require('fs')
const http = require('http');
const livereload = require('livereload')
const watch = require('node-watch')
const picomatch = require('picomatch')

const config = require('./config')
const glob = require('./helper/glob')
const buildAll = require('./jobs/buildAll')
const buildEjs = require('./jobs/buildEjs')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')


buildAll().then(() => {
  if (!config.livereload.enable) return
  livereload
    .createServer({ port: config.livereload.port })
    .watch(config.path.public)
})


const server = http.createServer(function (req, res) {
  fs.readFile(config.path.public + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(config.server.port);

const closeServer = () => {
  server.close()
  process.exit()
}

process.on('SIGINT', closeServer)
process.on('SIGTERM', closeServer)


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
