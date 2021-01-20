import {authority, accounts, sessions} from '../authority/authority.mjs'
import {Form} from './Form.js'
import {Answers} from './Answers.js'
import {Strings} from './Strings.js'
import {Accounts} from './Accounts.js'
import {Sessions} from './Sessions.js'
import {Tabs} from '../tabs/Tabs.js'

import {fill} from './fill.js'


const tabs = window.tabs = new Tabs(document.querySelector('tabs'),
  {active: [0,1,2]})
const forms = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1,2], side: "left", className: 'sideway'})
const lines = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})
const tables = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})

tabs.split(27, 40, 37)
lines.split(75, 25)


const regForm = new Form('registration', forms.tabs[0], memo)
regForm
  .prepare('Register', ['Custom ID', 'Password'], 'Register', handleRegister)

const loginForm = new Form('log-in', forms.tabs[1], memo)
loginForm.prepare('Log In', ['Custom ID', 'Password'], 'Log In', handleLogin)

const checkForm = new Form('sess-check', forms.tabs[2], memo)
checkForm
  .prepare('Check Session', ['Session ID', 'Token'], 'Check', handleCheck)

tabs.tabgroup.querySelectorAll('input').forEach(input =>
  input.addEventListener('focus', () => lastInput = input))
let lastInput = document.querySelector('input')

const answers = new Answers(lines.tabs[0], insert, memo)
const strings = new Strings(lines.tabs[1], insert)


fill(authority, strings)


const accountTable = new Accounts(tables.tabs[0], () => accounts)
accountTable.listen(removeAccount, insert, memo)
const sessionTable = new Sessions(tables.tabs[1], () => sessions)
sessionTable.listen(removeSession, insert, memo)



function memo(str) {
  strings.add(str)
}

function insert(str) {
  lastInput.value = str
  lastInput.focus()
}

function handleRegister(...args) {
  answers.add('register', authority.register(...args))
  accountTable.render()
  regForm.form.reset()
  regForm.form.querySelector('input').focus()
}

function handleLogin(...args) {
  answers.add('login', authority.startSession(...args))
  sessionTable.render()
  loginForm.form.reset()
  loginForm.form.querySelector('input').focus()
}

function handleCheck(...args) {
  answers.add('check', authority.continueSession(+args[0], args[1]))
  checkForm.form.reset()
  checkForm.form.querySelector('input').focus()
}

function removeAccount(id) {
  accounts.splice(0, Infinity, ...accounts.filter(acc => acc.id != id))
  return true
}
function removeSession(id) {
  sessions.splice(0, Infinity, ...sessions.filter(sess => sess.id != id))
  return true
}
