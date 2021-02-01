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


let accountTable, sessionTable

setTimeout(() => {
  fill(request, strings).then(async () => {
    accountTable = new Accounts(tables.tabs[0], getAccounts)
    accountTable.listen(removeAccount, insert, memo)
    sessionTable = new Sessions(tables.tabs[1], getSessions)
    sessionTable.listen(removeSession, insert, memo)
  })
}, 1000);


function memo(str) {
  strings.add(str)
}

function insert(str) {
  lastInput.value = str
  lastInput.focus()
}

async function getAccounts() {
  return request('/api/accs')
}

async function getSessions() {
  return request('/api/sess')
}

async function handleRegister(...args) {
  regForm.form.reset()
  regForm.form.querySelector('input').focus()
  answers.add('register', await request('/api/reg', args))
  await accountTable.update()
}

async function handleLogin(...args) {
  loginForm.form.reset()
  loginForm.form.querySelector('input').focus()
  answers.add('login', await request('/api/login', args))
  await sessionTable.update()
}

async function handleCheck(...args) {
  checkForm.form.reset()
  checkForm.form.querySelector('input').focus()
  args[0] = +args[0]
  answers.add('check', await request('/api/chkin', args))
}

async function removeAccount(id) {
  return request('/api/rmacc', {id}).catch(() => false)
}

async function removeSession(id) {
  return request('/api/rmses', {id}).catch(() => false)
}

async function request(endPoint, query) {
  const options = query ? [{method: 'POST', body: JSON.stringify(query)}] : []
  const answer = await fetch(endPoint, ...options)
  if (answer.ok) return answer.json().catch(() => false)
}
