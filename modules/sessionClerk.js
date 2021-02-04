module.exports = function buildSessionClerk(store, genTokenFn) {

  const sessionClerk = {add, check}

  return sessionClerk


  function add(accountId) {
    const token = genTokenFn()
    const sessionId = store.insert({accountId, token})
    return {sessionId, token}
  }

  function check(id, token) {
    const session = store.find({id, token})
    if (session) return session.accountId
  }
}
