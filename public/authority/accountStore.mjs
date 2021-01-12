export function buildAccountStore({accounts=[], lastId=0}={}) {

  const accountStore = {insert, find}

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
}


const accounts = [
  //*   {id, customId, hash},
  {id: 42, customId: 'user@mail.com', hash: 'r&eUI89'},
]
