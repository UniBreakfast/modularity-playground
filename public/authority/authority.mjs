import {buildAuthority} from './authorityBuilder.mjs'
import {buildAccountClerk} from './accountClerk.mjs'
import {buildAccountStore} from './accountStore.mjs'
import {crypter} from './crypter.mjs'
import {buildSessionClerk} from './sessionClerk.mjs'
import {buildSessionStore} from './sessionStore.mjs'
import {generateToken} from './tokenGenerator.mjs'


export const accounts = []
const accountStore = buildAccountStore({accounts})

export const sessions = []
const sessionStore = buildSessionStore({sessions})

const accountClerk = buildAccountClerk(accountStore, crypter)
const sessionClerk = buildSessionClerk(sessionStore, generateToken)


export const authority = buildAuthority(accountClerk, sessionClerk)
