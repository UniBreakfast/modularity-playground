export const accountClerk = {add, check, isFree, whoIs}


import {accountStore} from './accountStore.mjs'
import {cryptoClerk} from './cryptoClerk.mjs'



function add(customId, password) {
  const hash = cryptoClerk.hash(password)
  const accountId = accountStore.insert({customId, hash})
  if (accountId) return accountId
}

function check(customId, password) {
  const account = accountStore.find({customId})
  if (account) {
    const hash = account.hash
    if (cryptoClerk.verify(password, hash)) return account.id
  }
}

function isFree(customId) {
  const account = accountStore.find({customId})
  return !account
}

function whoIs(accountId) {
  const account = accountStore.find({id: accountId})
  if (account) return account.customId
}
