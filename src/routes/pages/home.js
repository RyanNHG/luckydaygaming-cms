const keystone = require('keystone')

const image = (url, alt) =>
  ({ url, alt })

const section = ({ item, prefix, image: imageUrl, url }) => ({
  image: image(imageUrl, item[`${prefix}ImageAltText`]),
  header: item[`${prefix}Header`],
  description: item[`${prefix}Description`],
  cta: {
    label: item[`${prefix}Cta`],
    url
  }
})

const transform = (item) => ({
  hero: {
    header: item.heroHeader,
    intro: item.heroIntro,
    cta: item.heroCta,
    image: image('/images/home/hero.jpg', item.heroImageAltText)
  },
  topSection: section({
    item,
    prefix: 'partnershipsSection',
    url: '/partnerships',
    image: '/images/home/slot-machines.png'
  }),
  middleSection: section({
    item,
    prefix: 'aboutSection',
    url: '/about-gaming',
    image: '/images/home/pie-chart.png'
  }),
  bottomSection: section({
    item,
    prefix: 'legalSection',
    image: '/images/home/gold-pile.png',
    url: '/faqs'
  })
})

const getHomepage = () =>
  keystone.list('Homepage').model
    .findOne()
    .lean()
    .exec()
    .then(transform)
    .catch(Promise.reject)

module.exports = (req, res, next) =>
  getHomepage()
    .then(data => res.json(data))
    .catch(reason => next(reason))
