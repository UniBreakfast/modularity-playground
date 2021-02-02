
import {formPollerClass} from './poller.js'


export const Poller = formPollerClass(generateId, request)


async function request(id, {name}) {
  await sleep(requestDelay)

  try {
    const response = await fetch('/api/poll',
      {method: 'GET', headers: {'poll-id': id, 'poll-name': name}})
    if (response.ok) return response.json()
  } catch {}
}
const requestDelay = 1000


function generateId() {
  let token = ''
  for (let i = 0; i < 13; ++i)
    token += (i+1)%7 ? chars[random() * 62 | 0] : '-'
  return token
}
const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const {random} = Math


function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
