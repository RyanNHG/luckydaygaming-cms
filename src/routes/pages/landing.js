const keystone = require('keystone')
const { next } = require('../../utils')

const pages = [
  'OurCompany',
  'Partnerships',
  'AboutGaming'
]

const getLandingPage = (listName) =>
  keystone.list(listName).model
    .findOne()
    .select('-_id -__v -nextPageNotes -pageSectionsNote -singleton__name')
    .lean()
    .exec()

const getDetailPages = (listName) =>
  keystone.list(listName).model
    .find()
    .select('name intro slug -_id')
    .sort('sortOrder')
    .lean()
    .exec()

const getNextLandingPage = (name) =>
  keystone.list(`${next(name, pages)}LandingPage`).model
    .findOne()
    .select('name intro slug -_id')
    .lean()
    .exec()

const firstParagraph = (html) =>
  html
    .split('<p>').join('')
    .split('</p>')[0]

const section = ({ baseUrl }) => ({ name, slug, intro }) => ({
  title: name,
  description: intro,
  image: undefined,
  link: {
    label: 'Learn more',
    url: `${baseUrl}/${slug}`
  }
})

const outro = ({ name, slug, intro }) => ({
  title: name,
  description: intro,
  link: {
    label: 'Learn more',
    url: `/${slug}`
  }
})

const transform = ([ landing, details, next ]) => ({
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
  outro: outro(next)
})

module.exports = ({ name }) => (req, res, next) =>
  Promise.all([
    getLandingPage(`${name}LandingPage`),
    getDetailPages(`${name}InteriorPage`),
    getNextLandingPage(name)
  ])
    .then(transform)
    .then(data => res.json(data))
    .catch(reason => next(reason))
