const keystone = require('keystone')
const { List } = keystone
const Page = require('./Page')
const { image, requiredString, requiredRichText, notes } = require('./_fields')
const { landingPages } = require('./_page-data')

const createModel = ({ name, label, interiorPageUrl, defaults: { title, intro, sectionUrl } }) => {
  const Model = new List(`${name}LandingPage`, {
    inherits: Page,
    hidden: false,
    singleton: true,
    label: label || 'Landing Page',
    autokey: { path: 'slug', from: 'name', unique: true }
  })

  Model.add({ name: { type: String, default: title } })

  Model.add('Hero', {
    heroTitle: requiredString('Title', title),
    heroBackgroundImage: image('Background Image')
  })

  Model.add('Intro', {
    intro: requiredRichText('Intro', intro)
  })

  if (interiorPageUrl) {
    Model.add('Sections', {
      pageSectionsNote: notes(
        `The content for these sections is managed in the interior pages.`,
        `You can edit those <a href="${interiorPageUrl}">interior pages here</a>.`
      )
    })
  }

  Model.add('Next Section', {
    nextPageNotes: notes(`The content for the next section is managed in its landing page.`)
  })

  Model.register()
}

landingPages.forEach(createModel)
