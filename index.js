require('./modules/configLoader')


const server = require('./modules/server')
const publicServer = require('./modules/publicServer')
const apiServer = require('./modules/apiServer')


server.port = +process.env.PORT
server.prepare(publicServer, apiServer).then(() => server.run(...suggestions))

const suggestions = ['/authTesting', '/pollTesting', '/tabsTesting']


// =================================================


const pollMaster = require('./modules/pollMaster')
Object.assign(global, pollMaster)
