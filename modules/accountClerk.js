module.exports = function buildAccountClerk(store, crypter) {

  const clerk = {add, check, isFree, whoIs}

  return clerk

  function add(customId, password) {
    const hash = crypter.hash(password)
    const accountId = store.insert({customId, hash})
    if (accountId) return accountId
  }

  function check(customId, password) {
    const account = store.find({customId})
    if (account) {
      const hash = account.hash
      if (crypter.verify(password, hash)) return account.id
    }
  }

  function isFree(customId) {
    const account = store.find({customId})
    return !account
  }

  function whoIs(accountId) {
    const account = store.find({id: accountId})
    if (account) return account.customId
  }
}
