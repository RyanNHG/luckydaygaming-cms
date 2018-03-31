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

const debugWithLabel = (label, thing) => {
  console.log(label, thing)
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

const getIndexOfKey = (key) =>
  parseInt(key.split('__')[2])

const getFieldKey = (key) =>
  key.split('__')[1]

const unsuffix = (prefix) => (obj) => {
  const { newObj, list } = Object.keys(obj)
    .reduce(({ newObj, list }, key) => {
      const startsWithPrefix = key.indexOf(prefix) === 0

      if (key !== prefix + 'Count') {
        if (startsWithPrefix) {
          const index = getIndexOfKey(key)
          const innerKey = getFieldKey(key)
          list[index] = list[index] || {}
          list[index][innerKey] = obj[key]
        } else {
          newObj[key] = obj[key]
        }
      }

      return { newObj, list }
    }, { newObj: {}, list: [] })

  return { ...newObj, [prefix]: list }
}

const next = (item, list) =>
  list
    .map((item, index) => ({ item, index }))
    .filter(({ item: _item }) => _item === item)
    .map(({ index }) => (index + 1) % list.length)
    .reduce((_, index) => list[index], undefined)

const range = (start, end) => {
  let list = []
  for (var i = start; i <= end; i++) list[i] = i
  return list
}

const firstParagraph = (html) =>
  html
    ? html
        .split('<p>').join('')
        .split('</p>')[0]
    : undefined

const prefixMap = {
  OurCompany: '/our-company',
  Partnerships: '/partnerships',
  AboutGaming: '/about-gaming'
}

const pages = [
  'OurCompany',
  'Partnerships',
  'AboutGaming'
]

const getNextLandingPage = (keystone, name) =>
  keystone.list(`${next(name, pages)}LandingPage`).model
    .findOne()
    .select('name intro slug -_id')
    .lean()
    .exec()
    .then(item => ({
      ...item,
      url: '/' + item.slug
    }))

const outro = ({ name, url, intro }) => ({
  title: name,
  description: intro,
  link: {
    label: 'Learn more',
    url
  }
})

module.exports = {
  debug,
  debugWithLabel,
  sluggify,
  suffix,
  unsuffix,
  next,
  range,
  getNextLandingPage,
  prefixMap,
  firstParagraph,
  outro
}
