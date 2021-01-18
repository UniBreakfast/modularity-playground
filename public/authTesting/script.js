const tabs = new Tabs(document.querySelector('tabs'),
  {active: [0,1,2]})
const forms = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1,2], side: "left", className: 'sideway'})
const lines = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})
const tables = new Tabs(document.querySelector('tab>tabs'),
  {active: [0,1], side: "right", className: 'sideway'})

tabs.shiftSplit(0, 30)
tabs.shiftSplit(1, 63)
lines.shiftSplit(0, -100)
