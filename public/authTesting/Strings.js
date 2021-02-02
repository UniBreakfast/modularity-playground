export class Strings {
  constructor (parent, outputFn) {
    this.render()
    this.assignHandlers(outputFn)
    parent.append(this.ul)
  }

  render() {
    this.ul = document.createElement('ul')
    this.ul.className = 'strings'
  }

  assignHandlers(outputFn) {
    this.ul.addEventListener('click', ({target, altKey, shiftKey}) => {
      if (target != this.ul) {
        if (shiftKey) target.closest('li').remove()
        else outputFn(target.innerText)
      }
    })
  }

  add(str) {
    if (!str || [...this.ul.children].some(li => li.innerText == str)) return
    const li = document.createElement('li')
    li.innerHTML = `<span class="string">${str}</span>`
    this.ul.append(li)
  }
}
