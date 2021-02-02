module.exports = class PollMaster {

  constructor (extractFn, respondFn,
    {handleDelay=1000, handleTimeout=4*60*1000, requestTimeout=1*60*1000}) {

    this.polls = []

    const Poll =
      formPollClass(this.polls, respondFn, handleTimeout, requestTimeout)

    this.handle = async (req, resp) => {
      await sleep(handleDelay)
      const props = extractFn(req)
      const poll = this.polls.find(poll => poll.id == props.id) || new Poll
      poll.update(props)

      if (poll.messages) poll.sendTo(resp)
      else poll.waitForUpdate(resp)
    }
  }

  broadcast = (msg, skipId) => (!skipId ? this.polls :
    this.polls.filter(poll => poll.id != skipId)).forEach(message(msg))

  inform = (msg, predicate, ...props) =>
    this.polls.filter(predicate, props).forEach(message(msg))

  informUser = (msg, ...names) =>
    this.inform(msg, poll => names.includes(poll.name))

  informClient = (msg, ...ids) =>
    this.inform(msg, poll => ids.includes(poll.id))
}


function formPollClass(polls, respondFn, handleTimeout, requestTimeout) {

  return class Poll {
    constructor () {
      polls.push(this)
    }

    update(props) {
      Object.assign(this, props)
    }

    keep(...messages) {
      if (!messages.length) return
      if (this.messages) this.messages.push(...messages)
      else this.messages = messages
    }

    send(...messages) {
      respondFn(this.resp, messages)
      delete this.resp
      this.waitForRequest()
    }

    sendTo(resp) {
      respondFn(resp, this.messages)
      delete this.messages
      this.waitForRequest()
    }

    waitForRequest() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        polls.splice(polls.indexOf(this), 1)
      }, requestTimeout)
    }

    waitForUpdate(resp) {
      this.resp = resp
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.send()
      }, handleTimeout)
    }
  }

}


function message(...messages){
  return function messageTo(poll) {
    if (!poll) return
    if (poll.resp) poll.send(...messages)
    else poll.keep(...messages)
  }
}

function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
