const config = require('../config')
const log = require('../helper/log')

const http = require('http');
const nodeStatic = require('node-static');
const livereload = require('livereload')



const errorHandler = (who, err) => {
  if (err.code !== 'EADDRINUSE') throw new Error(err)
  log.err([
    `Error: ${who}`,
    'Address already in use ' + err.address + ':' + err.port
  ])
  log.hint('Try a different port number that can be configured in `bin/config.js`')
  log.raw('\nAborted.')
  close()
}



const serve = () => {
  const fileServer = new nodeStatic.Server(config.path.public)
  const httpServer = http.createServer((req, res) => {
    req.addListener('end', () => {
      fileServer.serve(req, res, (err) => {
        if (!err) return
        if (req.url === '/favicon.ico') {
          return
        }

        // There was an error serving the file
        log.err("Error serving " + req.url + ' - ' + err.message)

        // Respond to the client
        res.writeHead(err.status, err.headers);
        res.end(JSON.stringify(err, null, 4))
      })
    }).resume()
  })

  httpServer.on('error', (e) => errorHandler('http', e))
  httpServer.listen(config.server.port);


  if (config.livereload.enable) {
    livereload
      .createServer({ port: config.livereload.port })
      .on('error', (e) => errorHandler('livereload', e))
      .watch(config.path.public)
  }


  const close = () => {
    httpServer.close()
    process.exit()
  }

  process.on('SIGINT', close)
  process.on('SIGTERM', close)
}



module.exports = serve
