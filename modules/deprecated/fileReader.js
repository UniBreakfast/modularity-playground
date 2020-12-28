module.exports = async function readFile(path) {
  const text = await fsp.readFile('./public/'+path, 'utf8')
  return text
}


const fsp = require('fs').promises
