module.exports = function prepAPI(params) {
  return {
    '/updates': (req, resp) => {
      let id = req.headers['poll-id']

      if (!id) {
        id = generateToken()
        resp.setHeader('poll-id', id)
      }

      let poller = pollers[id]
      if (!poller) pollers[id] = poller = { resp, updates: [],
        timer: setTimeout(() => {
          resp.end('{"updates": []}')
          delete poller.resp
          poller.timer = setTimeout(() => delete poller[id], 600000)
        }, 60000*4) }
      else {
        clearTimeout(poller.timer)
        if (poller.updates.length) {
          resp.end(JSON.stringify({updates: poller.updates.splice(0)}))
          poller.timer = setTimeout(() => delete poller[id], 600000)
        } else {
          poller.resp = resp
          poller.timer = setTimeout(() => {
            resp.end('{"updates": []}')
            delete poller.resp
            poller.timer = setTimeout(() => delete poller[id], 600000)
          }, 60000*4)
        }
      }
    }
  }
}

const pollers = {}


Object.assign(global, {update, pollers})


function update(msg, pollId) {
  if (pollId) {
    const poller = pollers[pollId]
    if (poller) {
      if (poller.resp) {
        poller.resp.end(JSON.stringify({updates: [msg]}))
        delete poller.resp
        poller.timer = setTimeout(() => delete poller[id], 600000)
      } else {
        poller.updates.push(msg)
      }
    }
  } else {
    for (const id in pollers) {
      const poller = pollers[id]
      if (poller) {
        if (poller.resp) {
          poller.resp.end(JSON.stringify({updates: [msg]}))
          delete poller.resp
          poller.timer = setTimeout(() => delete poller[id], 600000)
        } else {
          poller.updates.push(msg)
        }
      }
    }
  }
}


function generateToken() {
  let token = ''
  for (let i = 0; i < 13; ++i)
    token += (i+1)%7 ? chars[random() * 62 | 0] : '-'
  return token
}
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const {random} = Math
