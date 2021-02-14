const interval = 5000


module.exports = async function rememberUsers({save, load}) {
  const accounts = [], sessions = []
  await load(accounts, 'accounts').catch(()=>{})
  await load(sessions, 'sessions').catch(()=>{})

  let accountsMarkedToSave, sessionsMarkedToSave

  setInterval(() => {
    if (accountsMarkedToSave) {
      save(accounts, 'accounts')
      accountsMarkedToSave = false
    }
    if (sessionsMarkedToSave) {
      save(sessions, 'sessions')
      sessionsMarkedToSave = false
    }
  }, interval);

  return {
    accounts: {accounts, markFn() {accountsMarkedToSave = true}},
    sessions: {sessions, markFn() {sessionsMarkedToSave = true}},
  }
}
