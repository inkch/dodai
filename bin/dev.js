const config = require('./config')
const fs = require('fs')
const http = require('http');
const nodemon = require('nodemon')

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
}).listen(8080);

nodemon({
  script: 'bin/build.js',
  ext: '*',
  watch: 'src'
}).on('restart', (filename) => {
  console.log('\n\n[nodemon] File chanded:', filename[0])
})



const leon = () => {
  server.close()
  process.exit()
}

process.on('SIGINT', leon)
process.on('SIGTERM', leon)
