const pollMaster = require('../../modules/pollMaster')
const {polls, handle, broadcast, inform, informClient, informUser} = pollMaster


require('http').createServer((req, resp) => {

if (req.url == '/poll') handle(req, resp)

else if (req.url == '/broadcast') {
  resp.end()
  broadcast(req.headers.message)
}
else if (req.url == '/inform') {
  resp.end()
  informUser(req.headers.message, req.headers.name)
}
else if (req.url.match(/\/pollers?\.js/)) {
  resp.setHeader('content-type', 'application/javascript')
  require('fs').createReadStream('./public/poller'+req.url).pipe(resp)
}



else resp.end(/* html */`
<script>

import('../poller/pollers.js').then(({Poller}) => {

  const poller =
    new Poller(document.title = prompt('Enter your name:', 'guest'))

  poller.addEventListener('message', msg => {
    msg.detail.forEach(message =>
      document.body.innerHTML += '<p>' + message + '</p>')
  })

})


</script><link rel="icon" href="data:;base64,iVBORw0KGgo=">
`)

}).listen(process.env.PORT || 3000,
  () => console.log('Server started at http://localhost:3000'))


Object.assign(global, {polls, broadcast, informClient, informUser})
