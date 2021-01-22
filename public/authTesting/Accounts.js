export class Accounts {
  constructor (parent, getArrFn) {
    this.getData = getArrFn
    this.render()
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
    this.tbody.innerHTML = this.getData().map(({id, customId, hash}) => `
      <tr data-id="${id}">
        <td>${id}</td>
        <td class="string">${customId}</td>
        <td class="string">${hash}</td>
      </tr>
    `).join('')
  }

  listen(delOneFn, outputFn, altOutputFn) {
    this.tbody.addEventListener('click', ({target, altKey, shiftKey}) => {
      if (shiftKey) {
        const row = target.closest('tr')
        const id = row.dataset.id
        const deleted = delOneFn(id)
        if (deleted) row.remove()
      } else if (target.classList.contains('string'))
        (altKey ? altOutputFn : outputFn)(target.innerText)
    })
  }
}
