preparePublic = module.exports = function buildPublic(bufferTree, getType) {
  const publicHandlers = {}
  buildHandlers(publicHandlers, bufferTree, getType)
  fillAliases(publicHandlers)
  return publicHandlers
}


function buildHandlers(handlers, bufferTree, getType, path='') {
  for (const name in bufferTree) {
    const value = bufferTree[name]
    const curPath = path+'/'+name
    if (Buffer.isBuffer(value)) {
      const type = getType(name)
      handlers[curPath] = type ? (req, resp) => {
        resp.setHeader('Content-type', type)
        resp.end(value)
      } : (req, resp) => resp.end(value)
    }
    else buildHandlers(handlers, value, getType, curPath)
  }
}

function fillAliases(handlers) {
  Object.entries(handlers).forEach(([path, handler]) => {
    if (path.endsWith('.html')) {
      const pathWithoutExt = path.slice(0, -5)
      if (!handlers[pathWithoutExt]) handlers[pathWithoutExt] = handler
      if (pathWithoutExt.endsWith('/index')) {
        const folderPath = pathWithoutExt.slice(0, -6)
        if (folderPath) handlers[folderPath] = handler
        handlers[folderPath+'/'] = handler
      }
    }
  })
}
