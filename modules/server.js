const serverWrapper = module.exports = {
  prepare: async (prepPublic, prepAPI) => {
    console.time('preparations took')
    {[public, api] = await Promise.all([prepPublic(), prepAPI()])}
  },

  port: undefined,

  async run() {
    const server = createServer(handleRequest)
    server.listen(serverWrapper.port, reportStart)
  }
}


const { createServer } = require("http")

let public = {}, api = {}

async function handleRequest(req, resp) {
  const { url } = req

  const handler = api[url] || public[url]

  if (handler) handler(req, resp)
  else {
    resp.statusCode = 404
    resp.end(url+' not found')
    console.log(url+' not found')
  }
}

function reportStart() {
  console.timeEnd('preparations took')
  console.log(`Server started on http://localhost:${serverWrapper.port}`)
}
