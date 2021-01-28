const handleDelay = 1000
const handleTimeout = 28*1000
const requestTimeout = 1*60*1000

const polls = []


require('http').createServer((req, resp) => {

if (req.url == '/poll') handle(req, resp)

else if (req.url == '/broadcast') broadcast(req.headers.message)
else if (req.url == '/inform') informUser(req.headers.message, req.headers.name)

else resp.end(/* html */`
<script>

const requestDelay = 1000


class Poller extends EventTarget {
  constructor (name) {
    super()
    Object.assign(this, {id: generateId(), name})
    this.listen()
  }

  async listen() {
    while (true) {
      const answers = await request(this.id, this.name)
      if (answers?.length)
        this.dispatchEvent(new CustomEvent('message', {detail: answers}))
    }
  }
}

const poller = new Poller(document.title = prompt('Enter your name:', 'guest'))



poller.addEventListener('message', msg => {
  msg.detail.forEach(message =>
    document.body.innerHTML += '<p>' + message + '</p>')
})


async function request(id, name) {
  await sleep(requestDelay)

  try {
    const response = await fetch('/poll',
      {method: 'GET', headers: {'poll-id': id, 'poll-name': name}})
    if (response.ok) return response.json()
  } catch {}
}

function generateId() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  const {random} = Math

  let token = ''
  for (let i = 0; i < 13; ++i)
    token += (i+1)%7 ? chars[random() * 62 | 0] : '-'
  return token
}

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}

</script><link rel="icon" href="data:;base64,iVBORw0KGgo=">
`)

}).listen(process.env.PORT || 3000,
  () => console.log('Server started at http://localhost:3000'))


Object.assign(global, {polls, broadcast, informClient, informUser})


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
    this.resp.end(prepare(messages))
    delete this.resp
    this.waitForRequest()
  }

  sendTo(resp) {
    resp.end(prepare(this.messages))
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

function prepare(obj) {
  return JSON.stringify(obj)
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
