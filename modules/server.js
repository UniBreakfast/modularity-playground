const serverWrapper = module.exports = {
  prepare: async prepPublic => {
    console.time('preparations took')
    public = await prepPublic()
  },

  port: undefined,

  async run() {
    const server = createServer(handleRequest)
    server.listen(serverWrapper.port, reportStart)
  }
}


const { createServer } = require("http")

let public = {}

async function handleRequest(req, resp) {
  const { url } = req

  const handler = public[url]

  if (handler) handler(resp)
  else {
    resp.statusCode = 404
    resp.end(url+ ' not found')
    console.log(url+ ' not found')
  }
}

function reportStart() {
  console.timeEnd('preparations took')
  console.log(`Server started on http://localhost:${serverWrapper.port}`)
}
