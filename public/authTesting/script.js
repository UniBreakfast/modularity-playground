import {authority, accounts, sessions} from '../authority/authority.mjs'
import {Accounts} from './Accounts.js'
import {Form} from './Form.js'
import {Tabs} from '../tabs/Tabs.js'


const tabs = new Tabs(document.querySelector('tabs'),
  {active: [0,1,2]})
const forms = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1,2], side: "left", className: 'sideway'})
const lines = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})
const tables = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})



const regForm = new Form('registration', forms.tabs[0])
regForm
  .prepare('Register', ['Custom ID', 'Password'], 'Register', handleRegister)

const loginForm = new Form('log-in', forms.tabs[1])
loginForm.prepare('Log In', ['Custom ID', 'Password'], 'Log In', handleLogin)

const checkForm = new Form('sess-check', forms.tabs[2])
checkForm
  .prepare('Check Session', ['Session ID', 'Token'], 'Check', handleCheck)


const accountTable = new Accounts(accounts, tables.tabs[0])


tabs.shiftSplit(0, 30)
tabs.shiftSplit(1, 63)
lines.shiftSplit(0, -100)


function handleRegister(...args) {
  authority.register(...args)
  accountTable.render()
  regForm.form.reset()
  regForm.form.querySelector('input').focus()
}

function handleLogin(...args) {
  authority.startSession(...args)
  sessionTable.render()
  loginForm.form.reset()
  loginForm.form.querySelector('input').focus()
}

function handleCheck(...args) {
  authority.checkSession(...args)
  checkForm.form.reset()
  checkForm.form.querySelector('input').focus()
}
