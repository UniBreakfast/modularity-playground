require('./modules/configLoader')

const server = require('./modules/server')
const publicServer = require('./modules/publicServer')

server.port = +process.env.PORT
server.prepare(publicServer).then(server.run)

// =================================================

const buildAuthority = require('./modules/authority.js')

buildAuthority().then(({authority}) => authority.register('me'))
