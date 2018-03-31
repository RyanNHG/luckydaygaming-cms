const keystone = require('keystone')
const { getNextLandingPage, prefixMap, firstParagraph, outro } = require('../../utils')

const getLandingPage = (listName) =>
  keystone.list(listName).model
    .findOne()
    .select('-_id -__v -nextPageNotes -pageSectionsNote -singleton__name')
    .lean()
    .exec()

const hasDetailPages = (listName) =>
  keystone.list(listName).model
    .count()
    .lean()
    .exec()
    .then(count => count > 0)

const getDetailPages = (listName) =>
  keystone.list(listName).model
    .find()
    .select('name intro slug -_id')
    .sort('sortOrder')
    .lean()
    .exec()

const getFirstDetailPage = (name) =>
  keystone.list(`${name}InteriorPage`).model
    .findOne()
    .select('name intro slug -_id')
    .sort('sortOrder')
    .lean()
    .exec()
    .then(item => ({
      ...item,
      url: prefixMap[name] + '/' + item.slug
    }))

const getNextPage = (name) =>
  hasDetailPages(`${name}LandingPage`)
    .then(hasDetailPages => hasDetailPages
      ? getFirstDetailPage(name)
      : getNextLandingPage(keystone, name)
    )

const section = ({ baseUrl }) => ({ name, slug, intro }) => ({
  title: name,
  description: intro,
  image: {
    url: `/images${baseUrl}/${slug}.jpg`,
    alt: `The image for ${name}.`
  },
  link: {
    label: 'Learn more',
    url: `${baseUrl}/${slug}`
  }
})

const transform = ([ landing, details, nextPage ]) => ({
  meta: {
    title: landing.name,
    description: firstParagraph(landing.intro)
  },
  hero: {
    title: landing.heroTitle,
    image: {
      url: `/images/${landing.slug}/hero.jpg`,
      alt: 'A row of colorful slot machines.'
    }
  },
  intro: landing.intro,
  sections: details.map(section({ baseUrl: `/${landing.slug}` })),
  outro: outro(nextPage)
})

module.exports = ({ name }) => (req, res, next) =>
  Promise.all([
    getLandingPage(`${name}LandingPage`),
    getDetailPages(`${name}InteriorPage`),
    getNextPage(name)
  ])
    .then(transform)
    .then(data => res.json(data))
    .catch(reason => next(reason))
