require('./modules/configLoader')

const server = require('./modules/server')
const publicServer = require('./modules/publicServer')
const apiServer = require('./modules/apiServer')

const pollMaster = require('./modules/pollMaster')

server.port = +process.env.PORT
server.prepare(publicServer, apiServer).then(server.run)

// =================================================

Object.assign(global, pollMaster)

const buildAuthority = require('./modules/authority.js')

buildAuthority().then(({authority}) => authority.register('me', 'now'))
