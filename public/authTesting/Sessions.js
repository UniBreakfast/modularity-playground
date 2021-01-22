export class Sessions {
  constructor (parent, getArrFn) {
    this.getData = getArrFn
    this.render()
    parent.append(this.table)
  }

  render() {
    if (!this.table || !this.tbody) {
      this.table = document.createElement('table')
      this.table.className = 'sessions'
      this.table.innerHTML = /* html */`
        <caption> <h3>Sessions</h3> </caption>
        <thead>
          <tr>
            <th>id</th>
            <th>token</th>
            <th>accountId</th>
          </tr>
        </thead>
        <tbody> </tbody>
      `
      this.tbody = this.table.tBodies[0]
    }
    this.tbody.innerHTML = this.getData().map(({id, token, accountId}) => `
      <tr data-id="${id}">
        <td>${id}</td>
        <td class="string">${token}</td>
        <td>${accountId}</td>
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
