export class Accounts {
  constructor (arr, parent, outputFn, altOutputFn) {
    Object.assign(this, {arr})
    this.render()
    this.listen(outputFn, altOutputFn)
    parent.append(this.table)
  }

  render() {
    if (!this.table || !this.tbody) {
      this.table = document.createElement('table')
      this.table.className = 'accounts'
      this.table.innerHTML = /* html */`
        <caption> <h3>Accounts</h3> </caption>
        <thead>
          <tr>
            <th>id</th>
            <th>customId</th>
            <th>hash</th>
          </tr>
        </thead>
        <tbody> </tbody>
      `
      this.tbody = this.table.tBodies[0]
    }
    this.tbody.innerHTML = this.arr.map(({id, customId, hash}) => `
      <tr>
        <td>${id}</td>
        <td class="string">${customId}</td>
        <td class="string">${hash}</td>
      </tr>
    `).join('')
  }

  listen(outputFn, altOutputFn) {
    this.tbody.addEventListener('click', ({target, altKey, shiftKey}) => {
      if (shiftKey) {
        const row = target.closest('tr')
        const index = row.rowIndex - 1
        this.arr.splice(index, 1)
        row.remove()
      } else if (target.classList.contains('string'))
        (altKey ? altOutputFn : outputFn)(target.innerText)
    })
  }
}
