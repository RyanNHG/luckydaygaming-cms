const keystone = require('keystone')

const getHeader = () =>
  keystone.list('Header').model
    .findOne()
    .lean()
    .exec()

const getFooter = () =>
  keystone.list('Footer').model
    .findOne()
    .lean()
    .exec()

const pages = [
  { prefix: 'OurCompany', hasChildren: true },
  { prefix: 'Partnerships', hasChildren: true },
  { prefix: 'AboutGaming', hasChildren: true },
  { prefix: 'Locations', hasChildren: false },
  { prefix: 'ContactUs', hasChildren: false },
  { prefix: 'Faqs', hasChildren: false }
]

const getLinkLabel = ({ prefix }) =>
  keystone.list(`${prefix}LandingPage`).model
    .findOne()
    .select('name slug')
    .lean()
    .exec()
    .then(({ name, slug }) => ({
      label: name,
      url: `/${slug}`
    }))

const getChildLinkLabels = ({ prefix, baseUrl }) =>
  keystone.list(`${prefix}InteriorPage`).model
    .find()
    .select('name slug')
    .sort('sortOrder')
    .lean()
    .exec()
    .then(children => children.map(({ name, slug }) => ({
      label: name,
      url: `${baseUrl}/${slug}`
    })))

const getLinkLabelAndChildLinkLabels = ({ prefix }) =>
  getLinkLabel({ prefix })
    .then(link =>
      getChildLinkLabels({ prefix, baseUrl: link.url })
        .then(children => ({
          ...link,
          children
        }))
    )

const getAnyLinkLabels = ({ prefix, hasChildren }) =>
  (hasChildren)
    ? getLinkLabelAndChildLinkLabels({ prefix })
    : getLinkLabel({ prefix })

const leftLinks = [ '/our-company', '/partnerships', '/about-gaming' ]

const isLeftLink = ({ url }) =>
  leftLinks.indexOf(url) !== -1

const isRightLink = (link) =>
  !isLeftLink(link)

const removeChildren = ({ label, url }) =>
  ({ label, url })

const contactLinks = ({
  phonePrefix, phoneNumber,
  emailPrefix, emailAddress
}) => [
  {
    prefix: phonePrefix,
    label: phoneNumber,
    url: `tel:${phoneNumber}`
  },
  {
    prefix: emailPrefix,
    label: emailAddress,
    url: `mailto:${emailAddress}`
  }
]

const isDefined = a => a

const socialLinks = ({
  facebookUrl,
  instagramUrl,
  youtubeUrl,
  twitterUrl
}) => [
  facebookUrl
    ? { label: 'Facebook', icon: 'icon__facebook', url: facebookUrl }
    : undefined,
  instagramUrl
    ? { label: 'Instagram', icon: 'icon__instagram', url: instagramUrl }
    : undefined,
  youtubeUrl
    ? { label: 'Youtube', icon: 'icon__youtube', url: youtubeUrl }
    : undefined,
  twitterUrl
    ? { label: 'Twitter', icon: 'icon__twitter', url: twitterUrl }
    : undefined
].filter(isDefined)

const transform = ([ header, footer, ...links ]) => ({
  header: {
    brand: {
      logo: {
        url: '/images/brand-logo.png',
        alt: header.brandLogoAltText
      },
      text: {
        url: '/images/brand-text.svg',
        alt: header.secondaryLogoImageAltText
      }
    },
    links: {
      left: links.filter(isLeftLink),
      right: links.filter(isRightLink)
    },
    menuLabel: header.menuLabel
  },
  footer: {
    logo: {
      url: '/images/brand-logo.png',
      alt: footer.footerLogoAltText
    },
    copyright: footer.copyright,
    links: links.map(removeChildren),
    contact: {
      header: footer.contactHeader,
      links: contactLinks(footer)
    },
    social: {
      header: footer.socialHeader,
      links: socialLinks(footer)
    }
  }
})

module.exports = (req, res, next) =>
  Promise.all([
    getHeader(),
    getFooter(),
    ...pages.map(getAnyLinkLabels)
  ])
    .then(transform)
    .then(data => res.json(data))
    .catch(reason => next(reason))
