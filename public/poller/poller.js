const requestDelay = 1000


export class Poller extends EventTarget {
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

/* const poller = new Poller(document.title = prompt('Enter your name:', 'guest'))



poller.addEventListener('message', msg => {
  msg.detail.forEach(message =>
    document.body.innerHTML += '<p>' + message + '</p>')
}) */


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
