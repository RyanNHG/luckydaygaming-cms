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

module.exports = {
  debug,
  sluggify
}
