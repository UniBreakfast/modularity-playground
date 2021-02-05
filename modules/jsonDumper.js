module.exports = {save, load}


const {writeFile, readFile, mkdir} = require('fs/promises')


async function save(ref, subj, name) {
  const content = JSON.stringify(ref, '', 2)
  let path = 'dump.json'
  if (name) {
    const folder = 'jsonDumps/'+subj
    await mkdir(folder, {recursive: true}).catch(()=>{})
    path = `${folder}/${name}.json`
  } else if (subj) {
    const folder = 'jsonDumps'
    await mkdir(folder).catch(()=>{})
    path = `${folder}/${subj}.json`
  }
  await writeFile(path, content)
}

async function load(ref, subj, name) {
  const path = name ? `jsonDumps/${subj}/${name}.json` : subj ?
    `jsonDumps/${subj}.json` : 'dump.json'
  const content = JSON.parse(await readFile(path))
  if (Array.isArray(ref) && Array.isArray(content))
    ref.splice(0, Infinity, ...content)
  else if (ref.__proto__ == content.__proto__) {
    Object.keys(ref)
      .forEach(key => { if (!content.hasOwnProperty(key)) delete ref[key] })
    Object.assign(ref, content)
  } else throw new TypeError('Content type mismatch')
}
