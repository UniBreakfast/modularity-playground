module.exports = async function readPublic() {
  const structure = await scanPublic()

}


const scanPublic = require('./modules/publicScanner')
