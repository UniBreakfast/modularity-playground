const handleDelay = 1000
const handleTimeout = 28*1000
const requestTimeout = 1*60*1000

const polls = []


class Poll {
  constructor () {
    polls.push(this)
  }

  update(props) {
    Object.assign(this, props)
  }

  keep(...messages) {
    if (!messages.length) return
    if (this.messages) this.messages.push(...messages)
    else this.messages = messages
  }

  send(...messages) {
    respond(this.resp, messages)
    delete this.resp
    this.waitForRequest()
  }

  sendTo(resp) {
    respond(resp, this.messages)
    delete this.messages
    this.waitForRequest()
  }

  waitForRequest() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      polls.splice(polls.indexOf(this), 1)
    }, requestTimeout)
  }

  waitForUpdate(resp) {
    this.resp = resp
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.send()
    }, handleTimeout)
  }
}


module.exports = {handle, broadcast, inform, informClient, informUser}


function respond(way, msg) {
  way.end(JSON.stringify(msg))
}

function extract({headers}) {
  return {id: headers['poll-id'], name: headers['poll-name']}
}

async function handle(req, resp) {
  await sleep(handleDelay)
  const props = extract(req)
  let poll = polls.find(poll => poll.id == props.id) || new Poll
  poll.update(props)

  if (poll.messages) poll.sendTo(resp)
  else poll.waitForUpdate(resp)
}

function message(...messages) {
  return function messageTo(poll) {
    if (!poll) return
    if (poll.resp) poll.send(...messages)
    else poll.keep(...messages)
  }
}

function broadcast(msg, skipId) {
  if (skipId) polls.filter(poll => poll.id != skipId).forEach(message(msg))
  else polls.forEach(message(msg))
}

function inform(msg, predicate, ...props) {
  polls.filter(predicate, props).forEach(message(msg))
}

function informUser(msg, ...names) {
  inform(msg, poll => names.includes(poll.name))
}
function informClient(msg, ...ids) {
  inform(msg, poll => ids.includes(poll.id))
}

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
