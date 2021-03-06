'use strict'

const log = require('./log')
const tinylr = require('tiny-lr')

function tinylrWrapper (opts) {
  opts = opts || {}
  let created = false
  let closed = false

  const api = {
    handler: null,
    create,
    listen,
    close,
    reload
  }

  return api

  function create () {
    return new Promise((resolve, reject) => {
      if (created) return reject(new Error('Server already created'))
      api.handler = tinylr({
        cert: opts.cert,
        key: opts.key
      })
      created = true
      if (closed) close()
      resolve(api.handler)
    })
  }

  function listen (port, host) {
    return new Promise((resolve, reject) => {
      if (closed) return reject(new Error('LiveReload server closed'))
      if (!created) return reject(new Error('LiveReload server not created'))
      if (typeof port !== 'number') port = 35729

      api.handler.listen(port, host, () => {
        log.success('Livereload is running on port ' + port)
        resolve(api.handler)
      })

      const serverImpl = api.handler.server
      serverImpl.removeAllListeners('error')
      serverImpl.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
          process.stderr.write('ERROR: livereload not started, ' +
            'port ' + port + ' is in use\n')
        } else {
          process.stderr.write((err.stack ? err.stack : err) + '\n')
        }
        close()
      })
    })
  }

  function close () {
    closed = true
    if (created) api.handler.close()
  }

  function reload (path) {
    log.debug('Livereloading...')
    if (!created) return
    try {
      api.handler.changed({
        body: {
          files: path ? [ path ] : '*'
        }
      })
    } catch (err) {
      throw err
    }
  }
}

module.exports = tinylrWrapper
