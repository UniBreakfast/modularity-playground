const composeAuthority = require('./authority')
const {handle} = require('./pollMaster')
const makeEndpointHandlers = require('./authEndpoints')

const fill = require('./fill')


module.exports = async function prepAPI(params) {
  const {authority, accounts, sessions} = await composeAuthority()
  /**/fill(authority)
  const auth = makeEndpointHandlers(authority, accounts, sessions)

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
