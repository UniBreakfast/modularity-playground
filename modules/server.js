const serverWrapper = module.exports = {
  prepare: async (prepPublic, prepAPI) => {
    console.time('preparations took')
    {[public, api] = await Promise.all([prepPublic(), prepAPI()])}
  },

  port: undefined,

  async run(...pagePaths) {
    const server = createServer(handleRequest)
    server.listen(serverWrapper.port, reportStart(...pagePaths))
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

function reportStart(...pagePaths) {
  return function () {
    console.timeEnd('preparations took')
    console.log(`Server started on http://localhost:${serverWrapper.port}\n` +
      pagePaths.map(path => `http://localhost:${serverWrapper.port+path}`)
        .join('\n'))
  }
}
