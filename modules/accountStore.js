module.exports = function buildAccountStore({accounts=[], lastId=0}={}) {

  const accountStore = {insert, find, leak, steal}

  return accountStore


  function insert({customId, hash}) {
    if (!find({customId})) {
      const accountId = generateId()
      accounts.push({id: accountId, customId, hash})
      return accountId
    }
  }

  function find(filter) {
    const {id, customId} = filter
    const account = accounts.find(customId
      ? account => account.customId === customId
      : account => account.id === id)
    return account
  }

  function generateId() {
    return ++lastId
  }


  function leak() {
    return accounts
  }

  function steal(id) {
    const i = accounts.findIndex(acc => acc.id == id)
    return ~i ? accounts.splice(i, 1)?.[0] : true
  }
}


const accounts = [
  //*   {id, customId, hash},
  {id: 42, customId: 'user@mail.com', hash: 'r&eUI89'},
]
