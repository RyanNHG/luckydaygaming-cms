const keystone = require('keystone')
const { List } = keystone
const { image, requiredString, requiredRichText, notes } = require('./_fields')

const pages = [
  { name: 'OurCompany',
    defaults: {
      title: 'Our Company',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Partnerships',
    defaults: {
      title: 'Partnerships',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'AboutGaming',
    defaults: {
      title: 'About Gaming',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Locations',
    label: 'Locations Page',
    defaults: {
      title: 'Locations',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'ContactUs',
    label: 'Contact Us Page',
    defaults: {
      title: 'Contact Us',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  },
  { name: 'Faqs',
    label: 'FAQs Page',
    defaults: {
      title: 'FAQs',
      intro: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with Bally, IGT, WMS, and Spielo.</p>'
    }
  }
]

const createModel = ({ name, label, defaults: { title, intro, sectionUrl } }) => {
  const Model = new List(`${name}LandingPage`, {
    singleton: true,
    label: label || 'Landing Page',
    autokey: { path: 'slug', from: 'name', unique: true }
  })

  Model.add({
    name: { type: String, required: true, default: title }
  })

  Model.add('Hero', {
    heroTitle: requiredString('Title', title),
    heroBackgroundImage: image('Background Image')
  })

  Model.add('Intro', {
    intro: requiredRichText('Intro', intro)
  })

  Model.add('Sections', {
    pageSectionsNote: notes(`The content for these sections is managed in the interior pages.`)
  })

  Model.add('Next Section', {
    nextPageNotes: notes(`The content for the next section is managed in its landing page.`)
  })

  Model.register()
}

pages.forEach(createModel)
