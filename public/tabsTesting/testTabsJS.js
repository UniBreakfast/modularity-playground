const tabs1 = new Tabs(['tab a', 'tab b', 'tab c', 'tab d', 'tab e', ], {
  active: 3,
  side: 'top',
  id: 'level1',
})
document.body.append(tabs1.tabgroup)

const tabs2 = new Tabs(['tab 1.', 'tab 2.', 'tab 3.', 'tab 4.', 'tab 5.', ], {
  active: 1,
  side: 'left',
  id: 'level2',
})
tabs1.tabs[3].append(tabs2.tabgroup)

const tabs3 = new Tabs(['tab a', 'tab b', 'tab c', 'tab d', 'tab e', ], {
  active: 2,
  side: 'bottom',
  id: 'level3',
})
tabs2.tabs[1].append(tabs3.tabgroup)

tabs3.tabs[2].append('Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste soluta saepe minima? Dolor porro vel adipisci odit nisi, ab veritatis.')
