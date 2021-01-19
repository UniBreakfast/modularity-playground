export class Answers {
  constructor (parent, outputFn) {
    this.render()
    this.assignHandlers(outputFn)
    parent.append(this.ul)
  }

  render() {
    this.ul = document.createElement('ul')
    this.ul.className = 'answers'
  }

  assignHandlers(outputFn) {
    this.ul.addEventListener('click', ({target, altKey, shiftKey}) => {
      if (target != this.ul) {
        if (altKey && target.classList.contains('string'))
          outputFn(target.innerText)
        else if (shiftKey) target.closest('li').remove()
      }
    })
  }

  add(cat, answer) {
    const li = document.createElement('li')
    li.innerHTML = answers[cat](answer)
    this.ul.append(li)
  }
}

const answers = {
  register(answer) {
    if (answer) {
      return `
        Successfully registered with account ID
        <span class="string">${answer}</span>
      `
    } else return `Failed to register for some reason`
  },
  login(answer) {
    if (answer) {
      return `
        Logged in successfully with session ID
        <span class="string">${answer.sessionId}</span>
        and token
        <span class="string">${answer.token}</span>
      `
    } else return `Log in failed for some reason`
  },
  check(answer) {
    if (answer) {
      return `
        Session confirmed for accound ID
        <span class="string">${answer.accountId}</span>
        with custom ID
        <span class="string">${answer.customId}</span>
      `
    } else return `Couldn't confirm the session in question`
  }
}
