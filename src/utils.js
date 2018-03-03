const sluggify = (words) =>
  words
    .toLowerCase()
    .split(' ')
    .map(word => word.trim())
    .join('-')

const debug = (thing) => {
  console.log(thing)
  return thing
}

const suffix = (obj, prop) => {
  let initial = { ...obj }
  delete initial[prop]

  return obj[prop].reduce((newObj, item, index) => {
    newObj[prop + index] = item
    return newObj
  }, initial)
}

const alpha = (a, b) =>
  (a < b)
    ? -1
  : (a > b)
    ? 1
    : 0

const startsWith = (item) => (thing) =>
  thing.indexOf(item) === 0

const unsuffix = (prop) => (obj) => {
  let initial = { ...obj }

  Object.keys(obj)
    .filter(startsWith(prop))
    .forEach(key => {
      delete initial[key]
    })

  const list = Object.keys(obj)
    .sort(alpha)
    .reduce((list, key) =>
      (startsWith(prop)(key))
        ? list.concat(obj[key])
        : list
    , [])

  return { ...initial, [prop]: list }
}

const next = (item, list) =>
  list
    .map((item, index) => ({ item, index }))
    .filter(({ item: _item }) => _item === item)
    .map(({ index }) => (index + 1) % list.length)
    .reduce((_, index) => list[index], undefined)

module.exports = {
  debug,
  sluggify,
  suffix,
  unsuffix,
  next
}
