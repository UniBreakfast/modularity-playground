import {authority, accounts, sessions} from '../authority/authority.mjs'
import {Form} from './Form.js'
import { Answers } from './Answers.js'
import { Strings } from './Strings.js'
import {Accounts} from './Accounts.js'
import {Sessions} from './Sessions.js'
import {Tabs} from '../tabs/Tabs.js'


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


const regForm = new Form('registration', forms.tabs[0])
regForm
  .prepare('Register', ['Custom ID', 'Password'], 'Register', handleRegister)

const loginForm = new Form('log-in', forms.tabs[1])
loginForm.prepare('Log In', ['Custom ID', 'Password'], 'Log In', handleLogin)

const checkForm = new Form('sess-check', forms.tabs[2])
checkForm
  .prepare('Check Session', ['Session ID', 'Token'], 'Check', handleCheck)

tabs.tabgroup.querySelectorAll('input').forEach(input =>
  input.addEventListener('focus', () => lastInput = input))
let lastInput = document.querySelector('input')

const answers = new Answers(lines.tabs[0], str => strings.add(str))
const strings = new Strings(lines.tabs[1], str => {
  lastInput.value = str
  lastInput.focus()
})

strings.add('abc')

const accountTable =
  new Accounts(accounts, tables.tabs[0], str => strings.add(str))
const sessionTable =
  new Sessions(sessions, tables.tabs[1], str => strings.add(str))


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
