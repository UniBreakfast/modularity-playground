export const authority = {register, startSession, continueSession}


import {accountClerk} from './accountClerk.mjs'
import {sessionClerk} from './sessionClerk.mjs'


function register(customId, password) {
  if (accountClerk.isFree(customId)) {
    const accountId = accountClerk.add(customId, password)
    if (accountId) return accountId
  }
}

function startSession(customId, password) {
  const accountId = accountClerk.check(customId, password)
  if (accountId) {
    const {sessionId, token} = sessionClerk.add(accountId)
    return {sessionId, token}
  }
}

function continueSession(id, token) {
  const accountId = sessionClerk.check(id, token)
  if (accountId) {
    const customId = accountClerk.whoIs(accountId)
    return {accountId, customId}
  }
}
