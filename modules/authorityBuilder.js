module.exports = function buildAuthority(accClerk, sessClerk) {

  const authority = {register, startSession, continueSession}

  return authority


  function register(customId, password) {
    if (customId && accClerk.isFree(customId)) {
      const accountId = accClerk.add(customId, password)
      if (accountId) return accountId
    }
  }

  function startSession(customId, password) {
    const accountId = accClerk.check(customId, password)
    if (accountId) {
      const {sessionId, token} = sessClerk.add(accountId)
      return {sessionId, token}
    }
  }

  function continueSession(id, token) {
    const accountId = sessClerk.check(id, token)
    if (accountId) {
      const customId = accClerk.whoIs(accountId)
      return {accountId, customId}
    }
  }
}
