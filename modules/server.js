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


const { createServer } = require("./httpity")

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
  const root = `http://localhost:${serverWrapper.port}`
  return function () {
    console.timeEnd('preparations took')
    console.log([`Server started at ${root}`,...pagePaths].join('\n'+root))
  }
}
