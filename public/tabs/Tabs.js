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

  goTo(index) {
    this.tabbuttons.forEach((btn, i) => {
      btn.disabled = i==index
      btn.removeAttribute('active')
    })
    this.tabs.forEach((tab, i) => tab.hidden = i!=index)
  }

  goToo(index) {
    const tab = this.tabs[index]
    if (!tab.hidden) return
    tab.hidden = false

    const disabledBtn = this.tabbuttons.find(btn => btn.disabled)
    if (disabledBtn) {
      disabledBtn.setAttribute('active', '')
      disabledBtn.disabled = false
    }
    this.tabbuttons[index].setAttribute('active', '')
  }

  leave(index) {
    const tab = this.tabs[index]
    if (tab.hidden || this.tabbuttons.find(btn => btn.disabled)) return

    const activeBtns = this.tabbuttons.filter(btn => btn.hasAttribute('active'))
    if (activeBtns.length == 2) {
      this.goTo(this.tabbuttons.findIndex((btn, i) =>
        i!=index && btn.hasAttribute('active')))
    }
    else {
      tab.hidden = true
      this.tabbuttons[index].removeAttribute('active')
    }
  }

  assignHandlers() {
    const [tabbuttons] = this.tabgroup.children
    tabbuttons.addEventListener('click', ({target, ctrlKey}) => {
      if (target == tabbuttons) return
      const index = this.tabbuttons.indexOf(target)
      if (ctrlKey)
        this.tabs[index].hidden ? this.goToo(index) : this.leave(index)
      else this.goTo(index)
      target.blur()
    })
  }
}
