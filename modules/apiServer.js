const buildAuthority = require('./authority')
const {handle} = require('./pollMaster')
const makeEndpointHandlers = require('./authEndpoints')


module.exports = async function prepAPI(params) {
  const auth = makeEndpointHandlers(await buildAuthority())

  return {
    '/api/poll': handle,
    '/api/reg': auth.register,
    '/api/login': auth.logIn,
    '/api/chkin': auth.checkIn,
    '/api/accs': auth.getAccounts,
    '/api/sess': auth.getSessions,
    '/api/rmacc': auth.removeAccount,
    '/api/rmses': auth.removeSession,
  }
}
