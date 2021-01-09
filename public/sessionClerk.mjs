export const sessionClerk = {add, check}


import {sessionStore} from './sessionStore.mjs'
import {generateToken} from './tokenGenerator.mjs'


function add(accountId) {
  const token = generateToken()
  const sessionId = sessionStore.insert({accountId, token})
  return {sessionId, token}
}

function check(id, token) {
  const session = sessionStore.find({id, token})
  if (session) return session.accountId
}
