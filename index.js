require('./modules/loadConfig')

const server = require('./modules/server')
const publicReader = require('./modules/publicReader')
const publicScanner = require('./modules/publicScanner')


server.use(publicScanner, publicReader)
server.port = +process.env.PORT
server.run()
