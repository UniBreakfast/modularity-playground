const serverWrapper = module.exports = {
  use: (scanner, reader) => [scan, read] = [scanner, reader],

  port: undefined,

  async run() {
    if (scan && read) public = await read(await scan())
    const server = createServer(handleRequest)
    server.listen(this.port, reportStart)
  }
}


const { createServer } = require("http")

let scan, read, public = {}

async function handleRequest(req, resp) {
  const path = req.url.slice(1) || 'index.html'

  try {
    const file = path.split('/').reduce((dir, sub) => dir[sub] || {}, public)
    if (file instanceof Buffer) resp.end(file)
    else throw path+' not found'
  } catch (err) {
    console.log(err)
    resp.statusCode = 404
    resp.end(path+ ' not found')
  }
}

function reportStart() {
  console.log(`Server started on http://localhost:${serverWrapper.port}`)
}
