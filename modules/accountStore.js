module.exports = function buildAccountStore({accounts=[], lastId=0,
  markFn=()=>{}}={}) {

  if (accounts.length) lastId = Math.max(...accounts.map(acc => acc.id))

  const accountStore = {insert, find, leak, steal}

  return accountStore


  function insert({customId, hash}) {
    if (!find({customId})) {
      const accountId = generateId()
      accounts.push({id: accountId, customId, hash})
      markFn()
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
    return ~i ? (markFn(), accounts.splice(i, 1)[0]) : true
  }
}


const accounts = [
  //*   {id, customId, hash},
  {id: 42, customId: 'user@mail.com', hash: 'r&eUI89'},
]
