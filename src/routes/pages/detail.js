const keystone = require('keystone')
const { getNextLandingPage, prefixMap, unsuffix, outro } = require('../../utils')

const errors = {
  notFound: (listName, slug) =>
    `Could not find ${listName} "${slug}".`
}

const getDetailPage = ({ listName, slug }) =>
  keystone.list(listName).model
    .findOne({ slug })
    .select('-_id -relationshipPickerName -__v -__t -sortOrder')
    .sort('sortOrder')
    .populate('relatedPages', 'slug __t name -_id')
    .lean()
    .exec()
    .then(item => item || Promise.reject(errors.notFound(listName, slug)))
    .then(unsuffix('listings'))

const nextDetailPage = ({ name, slug }) =>
  keystone.list(`${name}InteriorPage`).model
    .findOne({ slug })
    .select('sortOrder')
    .lean()
    .exec()
    .then(({ sortOrder }) =>
      keystone.list(`${name}InteriorPage`).model
        .findOne({ sortOrder: sortOrder + 1 })
        .select('name intro slug -_id')
        .lean()
        .exec()
        .then(item => item
          ? ({
            ...item,
            url: prefixMap[name] + '/' + item.slug
          })
          : undefined
        )
    )

const getNextPage = ({ name, slug }) =>
  nextDetailPage({ name, slug })
    .then(nextDetailPage => nextDetailPage || getNextLandingPage(keystone, name))

const removeEmpty = (obj) =>
  Object.keys(obj)
    .filter(key => obj[key])
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {})

const urlMap = {
  OurCompanyLandingPage: (slug) => `/our-company`,
  PartnershipsLandingPage: (slug) => `/partnerships`,
  AboutGamingLandingPage: (slug) => `/about-gaming`,
  LocationsLandingPage: (slug) => '/locations',
  ContactUsLandingPage: (slug) => `/contact-us`,
  FaqsLandingPage: (slug) => `/faqs`,
  OurCompanyInteriorPage: (slug) => `/our-company/${slug}`,
  PartnershipsInteriorPage: (slug) => `/partnerships/${slug}`,
  AboutGamingInteriorPage: (slug) => `/about-gaming/${slug}`
}

const transformRelatedPage = ({ slug, __t, name }) => ({
  name,
  url: urlMap[__t](slug)
})

const transform = ([ page, nextPage ]) => ({
  title: page.name,
  type: page.pageType,
  excerpt: page.intro,
  richText: page.pageType === 'Rich Text'
    ? page.richTextContent
    : undefined,
  listings: page.pageType === 'Listings'
    ? page.listings.map(removeEmpty)
    : undefined,
  related: {
    title: page.relatedTitle,
    pages: page.relatedPages.map(transformRelatedPage)
  },
  outro: outro(nextPage)
})

module.exports = ({ name }) => ({ params: { slug } }, res, next) =>
  Promise.all([
    getDetailPage({ listName: `${name}InteriorPage`, slug }),
    getNextPage({ name, slug })
  ])
    .then(transform)
    .then(data => res.json(data))
    .catch(next)
