try {
  require('./config.js')
} catch {
  if (!process.env.PORT) {
    console.log("config.js not found, env.PORT not set so server won't run")
    process.exit(2)
  }
}

const server = require('server')
const fileReader = require('fileReader')

server.use(fileReader)
server.port = +process.env.PORT || undefined
server.run()
