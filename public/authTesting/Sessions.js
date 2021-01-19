export class Sessions {
  constructor (arr, parent) {
    Object.assign(this, {arr})
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
    this.tbody.innerHTML = this.arr.map(({id, token, accountId}) => `
      <tr>
        <td>${id}</td>
        <td class="string">${token}</td>
        <td>${accountId}</td>
      </tr>
    `).join('')
  }
}
