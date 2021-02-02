const PollMaster = require('./polls')


module.exports = new PollMaster(extract, respond, {handleTimeout: 28*1000})


function extract({headers}) {
  return {id: headers['poll-id'], name: headers['poll-name']}
}

function respond(way, msg) {
  way.end(JSON.stringify(msg))
}
