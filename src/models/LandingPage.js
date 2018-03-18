const keystone = require('keystone')
const { List } = keystone
const { image, requiredString, requiredRichText, notes } = require('./_fields')
const Page = require('./Page')
const { landingPages: pages } = require('./_page-data')

const createModel = ({ name, label, defaults: { title, intro, sectionUrl } }) => {
  const Model = new List(`${name}LandingPage`, {
    inherits: Page,
    hidden: false,
    singleton: true,
    label: label || 'Landing Page',
    autokey: { path: 'slug', from: 'name', unique: true }
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
