const tabs1 = new Tabs(document.querySelector('body>tabs'), {
  active: 3,
  side: 'top',
  id: 'level1',
})
const tabs2 = new Tabs(document.querySelector('tab>tabs'), {
  active: 1,
  side: 'left',
  id: 'level2',
})
const tabs3 = new Tabs(document.querySelector('tab>tabs'), {
  active: [2, 3, 4],
  side: 'bottom',
  id: 'level3',
})
