module.exports = {save, load, list, discard, wipe}


const {writeFile, readFile, mkdir, readdir, stat, rm, rmdir} =
  require('fs/promises')


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

async function list(subj) {
  if (subj) {
    const list = []
    if (await stat(`jsonDumps/${subj}.json`).catch(()=>{})) list.push(undefined)
    const names = await readdir('jsonDumps/'+subj).catch(()=>{})
    if (names) list.push(...names)
    return list
  } else {
    const list = {}
    if (await stat('dump.json').catch(()=>{})) list[''] = undefined
    const subjects = await readdir('jsonDumps')
    for (let subj of subjects) {
      if (subj.endsWith('.json')) {
        list[subj = subj.slice(0, -5)] = [undefined].concat(list[subj] || [])
      } else {
        const names = await readdir('jsonDumps/'+subj).catch(()=>{})
        if (names) list[subj] = (list[subj] || []).concat(names)
      }
    }
    return list
  }
}

async function discard(subj, name) {
  const path = name ? `jsonDumps/${subj}/${name}.json` : subj ?
    `jsonDumps/${subj}.json` : 'dump.json'
  await rm(path).catch(()=>{})
}

async function wipe(subj) {
  if (subj) {
    await rmdir("jsonDumps/"+subj, {recursive: true}).catch(()=>{})
    await rm(`jsonDumps/${subj}.json`).catch(()=>{})
  } else {
    await rmdir('jsonDumps', {recursive: true}).catch(()=>{})
    await rm('dump.json').catch(()=>{})
  }
}
