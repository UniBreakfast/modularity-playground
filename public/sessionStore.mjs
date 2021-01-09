export const sessionStore = {insert, find}


const sessions = [
  //* {id, accountId, token},
  //* {id: 23,  accountId: 42,
  //*   token: 'DYqTV3-8zlkUc-Vkmpy4-gnCXId-fLyBJU-wmnXhu'},
]


function insert({accountId, token}) {
  const sessionId = generateId()
  sessions.push({id: sessionId, accountId, token})
  return sessionId
}

function find({id, token}) {
  const session = sessions.find(sess => sess.id == id && sess.token == token)
  return session
}


let lastId = 0

function generateId() {
  return ++lastId
}
