const interiorPages = [
  { name: 'OurCompanyInteriorPage' },
  { name: 'PartnershipsInteriorPage' },
  { name: 'AboutGamingInteriorPage' }
]

const landingPages = [
  { name: 'OurCompany',
    interiorPageUrl: '/keystone/our-company-interior-pages',
    defaults: {
      title: 'Our Company',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Partnerships',
    interiorPageUrl: '/keystone/partnerships-interior-pages',
    defaults: {
      title: 'Partnerships',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'AboutGaming',
    interiorPageUrl: '/keystone/about-gaming-interior-pages',
    defaults: {
      title: 'About Gaming',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Locations',
    label: 'Locations Page',
    interiorPageUrl: undefined,
    defaults: {
      title: 'Locations',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'ContactUs',
    label: 'Contact Us Page',
    interiorPageUrl: undefined,
    defaults: {
      title: 'Contact Us',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Faqs',
    label: 'FAQs Page',
    interiorPageUrl: undefined,
    defaults: {
      title: 'FAQs',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  }
]

const prefixMap = {
  OurCompanyInteriorPage: 'Our Company',
  PartnershipsInteriorPage: 'Partnerships',
  AboutGamingInteriorPage: 'About Gaming'
}

const landingPageMap = landingPages.reduce((map, page) => {
  map[page.name] = page.defaults.title
  return map
}, {})

const isLandingPage = (modelName) =>
  landingPages.some(page => page.name === modelName)

const getDisplayName = (modelName, name) =>
  isLandingPage(modelName)
    ? landingPageMap[modelName]
  : prefixMap[modelName]
    ? `${prefixMap[modelName]} - ${name}`
  : `${name}`

module.exports = {
  interiorPages,
  landingPages,
  getDisplayName
}
