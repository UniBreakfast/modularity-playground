export class Form {
  constructor (className, parent, outputFn) {
    this.render()
    this.form.className = className
    this.listen(outputFn)
    parent.append(this.form)
  }

  render() {
    this.form = document.createElement('form')
    this.form.action = "javascript:"
    this.form.innerHTML = /* html */`
      <h3></h3>
      <label> <input type="text"> </label>
      <label> <input type="text"> </label>
      <div>
        <button></button> <button type="reset">Reset</button>
      </div>
    `
  }

  listen(outputFn) {
    this.form.addEventListener('click', ({target, altKey}) => {
      if (altKey && target.tagName == 'INPUT') outputFn(target.value)
    })
  }

  prepare(title, labels, btnName, handler) {
    const [h3, label0, input0, label1, input1, button] =
      this.form.querySelectorAll('h3, label, input, button')
    h3.innerText = title
    label0.prepend(labels[0])
    label1.prepend(labels[1])
    button.innerText = btnName
    button.onclick = () => handler(input0.value, input1.value)
  }
}
