module.exports = async function composeAuthority() {
  const accountStore = buildAccountStore()
  const sessionStore = buildSessionStore()

  const accountClerk = buildAccountClerk(accountStore, crypter)
  const sessionClerk = buildSessionClerk(sessionStore, generateToken)

  return {
    authority: buildAuthority(accountClerk, sessionClerk),
    accounts: accountStore,
    sessions: sessionStore,
  }
}


const buildAuthority = require('./authorityBuilder')
const buildAccountClerk = require('./accountClerk')
const buildAccountStore = require('./accountStore')
const crypter = require('./crypter')
const buildSessionClerk = require('./sessionClerk')
const buildSessionStore = require('./sessionStore')
const generateToken = require('./tokenGenerator')
