module.exports = async function prepPublic() {
  const structure = await scanPublic()
  const bufferTree = await readPublic(structure)
  const publicHandlers = buildPublic(bufferTree, determineType)
  return publicHandlers
}

const scanPublic = require('./publicScanner')
const readPublic = require('./publicReader')
const buildPublic = require('./publicBuilder')
const determineType = require('./typeDict')
