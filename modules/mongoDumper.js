module.exports = function prepMongoDumper(dumpCollection) {

  return {save, load, list, discard, wipe}


  async function save(ref, subj, name) {
    const filter = {subj, name}
    if (!subj) filter.subj = {$exists: false}
    if (!name) filter.name = {$exists: false}

    await dumpCollection.updateOne(filter, {$set: {content: ref}},
      {upsert: true})
  }

  async function load(ref, subj, name) {
    const filter = {subj, name}
    if (!subj) filter.subj = {$exists: false}
    if (!name) filter.name = {$exists: false}

    const {content} = (await dumpCollection.findOne(filter)) || {}
    if (!content) throw new ReferenceError('dump not found')

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
      const dumps =
        await dumpCollection.find({subj, content: {$exists: true}}).toArray()
      const names = dumps.map(dump => dump.name).sort()

      const list = []
      if (names.includes(undefined)) list.push(undefined)
      list.push(...names.filter(Boolean))
      return list
    } else {
      const list = {}
      const dumps =
        await dumpCollection.find({content: {$exists: true}}).toArray()
      let hasGeneric, hasUnnamed = [], subjects = {}

      dumps.forEach(dump => {
        if (!dump.subj) hasGeneric = true
        else if (!dump.name) hasUnnamed.push(dump.subj)
        else if (!subjects[dump.subj]?.includes(dump.name))
          subjects[dump.subj] = [...subjects[dump.subj] || [], dump.name]
      })

      if (hasGeneric) list[''] = undefined
      hasUnnamed.sort().forEach(subj => list[subj] = [undefined])
      Object.entries(subjects).sort((a, b) => a.subj < b.subj ? -1 : 1)
        .forEach(([subj, names]) =>
          list[subj] = [...list[subj] || [], ...names.sort()])
      return list
    }
  }

  async function discard(subj, name) {
    const filter = {subj, name}
    if (!subj) filter.subj = {$exists: false}
    if (!name) filter.name = {$exists: false}

    await dumpCollection.deleteOne(filter)
  }

  async function wipe(subj) {
    const filter = {subj}
    if (!subj) filter.subj = {$exists: false}

    await dumpCollection.deleteMany(filter)
  }

}
