import {buildAuthority} from './authorityBuilder.mjs'
import {buildAccountClerk} from './accountClerk.mjs'
import {accountStore} from './accountStore.mjs'
import {crypter} from './crypter.mjs'
import {buildSessionClerk} from './sessionClerk.mjs'
import {sessionStore} from './sessionStore.mjs'
import {generateToken} from './tokenGenerator.mjs'


const accountClerk = buildAccountClerk(accountStore, crypter)
const sessionClerk = buildSessionClerk(sessionStore, generateToken)


export const authority = buildAuthority(accountClerk, sessionClerk)
