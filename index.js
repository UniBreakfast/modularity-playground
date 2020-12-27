try {
  require('./config.js')
} catch {
  if (!process.env.PORT) {
    console.log("config.js not found, env.PORT not set so server won't run")
    process.exit(2)
  }
}

require('fs').renameSync('./node_modules_', './node_modules')
const server = require('server')
const fileReader = require('fileReader')
require('fs').renameSync('./node_modules', './node_modules_')


server.use(fileReader)
server.port = +process.env.PORT || undefined
server.run()
