const serverWrapper = module.exports = {
  use: reader => read = reader,

  port: undefined,

  run() {
    const server = createServer(handleRequest)
    server.listen(this.port, reportStart)
  }
}


const { createServer } = require("http")

let read = () => 'I can\'t read'


async function handleRequest(req, resp) {
  const url = req.url.slice(1) || 'index.html'

  try {
    const text = await read(url)
    resp.end(text)
  } catch (err) {
    console.log(err)
    resp.statusCode = 404
    resp.end('not found')
  }
}

function reportStart() {
  console.log(`Server started on http://localhost:${serverWrapper.port}`)
}
