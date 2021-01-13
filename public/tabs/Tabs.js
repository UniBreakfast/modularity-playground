class Tabs {
  constructor (tabs=[], {active=0, side='top', id, classes, className}={}) {
    if (Array.isArray(tabs)) {
      this.titles = tabs
    } else if (tabs instanceof HTMLElement) {
      this.tabs = tabs
      this.titles = [...tabs.children].map(({title}, i) => title || 'tab '+i)
    }
    this.active = active
    this.side = side
    if (id) this.id = id
    if (classes) this.classes = classes
    if (className) this.className = className

    this.render()
    this.assignHandlers()
  }

  render() {
    const tabgroup = document.createElement('tabgroup')
    tabgroup.setAttribute('side', this.side)
    tabgroup.innerHTML = `
      <tabbuttons>
        ${ this.titles.map(title => `<button>${title}</button>`).join('') }
      </tabbuttons>
      ${ this.tabs ? '' : `
      <tabs>
        ${ `<tab hidden></tab>`.repeat(this.titles.length) }
      </tabs>
      `}
    `
    if (this.tabs) {
      this.tabs.replaceWith(tabgroup)
      tabgroup.append(this.tabs)
    }
    if (this.id) tabgroup.id = this.id
    if (this.className) {
      tabgroup.className = this.className
      delete this.className
    }
    if (this.classes) {
      tabgroup.classList.add(...this.classes)
      delete this.classes
    }
    const tabbuttons = [...tabgroup.children[0].children]
    tabbuttons[this.active].disabled = true
    const tabs = [...tabgroup.children[1].children]
    tabs.forEach(tab => tab.removeAttribute('title'))
    tabs[this.active].hidden = false
    tabs.forEach((tab, i) => tab.hidden = this.active != i)

    Object.assign(this, {tabgroup, tabbuttons, tabs})
  }

  goto(index) {
    this.tabbuttons.forEach((btn, i) =>
      i==index ? btn.disabled = true : btn.removeAttribute('disabled'))
    this.tabs.forEach((tab, i) =>
      i==index ? tab.removeAttribute('hidden') : tab.hidden = true)
  }

  assignHandlers() {
    const [tabbuttons] = this.tabgroup.children
    tabbuttons.addEventListener('click', ({target}) => {
      if (target != tabbuttons) this.goto(this.tabbuttons.indexOf(target))
    })
  }
}
