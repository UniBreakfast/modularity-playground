module.exports = async function readPublic() {
  const structure = await scanPublic()
  return read("public", structure)
}


const scanPublic = require('./publicScanner')
const { readFile } = require("fs").promises


async function read(path, struct) {
  let entries = Object.entries(struct)

  entries = await Promise.all(entries.map(async ([name, item]) =>
    [name, await (item === true ? readFile(`${path}/${name}`)
      : read(`${path}/${name}`, item))]))

  return Object.fromEntries(entries)
}
