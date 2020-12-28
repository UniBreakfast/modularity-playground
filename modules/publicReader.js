module.exports = async function readPublic() {
  const structure = await scanPublic()
  return read("public", structure)
}


const scanPublic = require('./publicScanner')
const {readFile} = require("fs").promises


async function read(path, struct) {
  return Object.fromEntries(await Promise.all(Object.entries(struct).map(async ([name, item]) => [
    name,
    await (item === true ? readFile(`${path}/${name}`) : read(`${path}/${name}`, item))
  ])))
}