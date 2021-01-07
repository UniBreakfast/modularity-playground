export const authority = {register, startSession, continueSession}

const accountClerk = {add(){}, check(){}, isFree(){}}

const sessionClerk = {add(){}, check(){}}

function register(customId, password) {
  if (!users.find(user => user.customId === customId)) {
    users.push({customId, password})
    return customId
  }
}

function startSession(customId, password) {

}

function continueSession(token, id) {

}
