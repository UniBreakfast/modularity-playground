module.exports = async function scanPublic() {
  return scan('public')
}


const { readdir } = require("fs").promises


async function scan(path) {
  let info = await readdir(path).catch(({ code }) => code == 'ENOTDIR')
  return typeof info == 'boolean' ? info : Object.fromEntries(await
    Promise.all(info.map(async name => [name, await scan(path + '/' + name)])))
}
