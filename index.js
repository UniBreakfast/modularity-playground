require('./modules/loadConfig')

const server = require('./modules/server')
const fileReader = require('./modules/fileReader')


server.use(fileReader)
server.port = +process.env.PORT
server.run()
