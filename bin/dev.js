const fs = require('fs')
const http = require('http');
const livereload = require('livereload')
const watch = require('node-watch')

const buildEjs = require('./jobs/buildEjs')
const buildSass = require('./jobs/buildSass')
const buildJs = require('./jobs/buildJs')

require('./build')

const server = http.createServer(function (req, res) {
  fs.readFile('public' + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8080);



watch('src/ejs', { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    buildEjs(filename, 'src/ejs', 'public')
  })


watch('src/sass', { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    buildSass(filename, 'src/sass', 'public/assets/css')
  })


watch('src/js', { recursive: true },
  (event, filename) => {
    if (event !== 'update') return
    buildJs(filename, 'public/assets/js')
  })



livereload.createServer({port: 8081}).watch('public')


const leon = () => {
  server.close()
  process.exit()
}

process.on('SIGINT', leon)
process.on('SIGTERM', leon)
