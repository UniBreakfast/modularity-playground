module.exports = function buildSessionStore({sessions=[], lastId=0,
  markFn=()=>{}}={}) {

  const sessionStore = {insert, find, leak, steal}

  return sessionStore


  function insert({accountId, token}) {
    const sessionId = generateId()
    sessions.push({id: sessionId, accountId, token})
    markFn()
    return sessionId
  }

  function find({id, token}) {
    const session = sessions.find(sess => sess.id == id && sess.token == token)
    return session
  }


  function generateId() {
    return ++lastId
  }


  function leak() {
    return sessions
  }

  function steal(id) {
    const i = sessions.findIndex(sess => sess.id == id)
    return ~i ? (markFn(), sessions.splice(i, 1)[0]) : true
  }
}


const sessions = [
  //*   {id, accountId, token},
  {id: 23,  accountId: 42, token: 'DYqTV3-8zlkUc-Vkmpy4-gnCXId-fLyBJU-wmnXhu'},
]
