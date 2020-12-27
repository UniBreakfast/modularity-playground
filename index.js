const { readdir } = require("fs").promises
const { createServer } = require('http')
try { require('./config') } catch {}

createServer(async (req, resp) => {
  resp.end((await readdir('.')).join('\n'))
}).listen(process.env.PORT)
