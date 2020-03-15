process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')


// trigger browser reloads
const chokidar = require('chokidar')
environment.config.devServer.before = (app, server) => {
  chokidar.watch([
    `${__dirname}/../stylesheets/`,
    `${__dirname}/../../app/views/`
  ])
    .on('change', () => {
      server.sockWrite(server.sockets, 'content-changed')
    })
}

module.exports = environment.toWebpackConfig()
