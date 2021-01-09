export const accountStore = {insert, find}


const accounts = [
  //* {id, customId, hash},
  //* {id: 42, customId: 'user@mail.com', hash: 'r&eUI89'},
]


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


let lastId = 0

function generateId() {
  return ++lastId
}
