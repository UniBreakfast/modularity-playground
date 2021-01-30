require('./modules/configLoader')

const server = require('./modules/server')
const publicServer = require('./modules/publicServer')
const apiServer = require('./modules/apiServer')

server.port = +process.env.PORT
server.prepare(publicServer, apiServer).then(server.run)

// =================================================

const buildAuthority = require('./modules/authority.js')

buildAuthority().then(({authority}) => authority.register('me', 'now'))
