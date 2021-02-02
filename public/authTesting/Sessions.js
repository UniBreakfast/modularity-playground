export class Sessions {
  constructor (parent, getArrFn) {
    this.getData = getArrFn
    this.render()
    this.update()
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
  }

  async update() {
    const sessions = await this.getData()
    this.tbody.innerHTML = sessions.map(({id, token, accountId}) => `
      <tr data-id="${id}">
        <td>${id}</td>
        <td class="string">${token}</td>
        <td>${accountId}</td>
      </tr>
    `).join('')
  }

  listen(delOneFn, outputFn, altOutputFn) {
    this.tbody.addEventListener('click', async ({target, altKey, shiftKey}) => {
      if (shiftKey) {
        const row = target.closest('tr')
        const id = row.dataset.id
        const deleted = await delOneFn(id)
        if (deleted) row.remove()
      } else if (target.classList.contains('string'))
        (altKey ? altOutputFn : outputFn)(target.innerText)
  })
  }
}
