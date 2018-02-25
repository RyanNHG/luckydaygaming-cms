const keystone = require('keystone')
const { List } = keystone
const { requiredString, requiredRichText, image } = require('./_fields')

const Model = new List('Homepage', {
  singleton: true
})

Model.add({
  name: { type: String, required: true, default: 'Homepage' }
})

const section = (prefix, { altText, header, description, cta }) => ({
  [`${prefix}Image`]: image('Image'),
  [`${prefix}ImageAltText`]: requiredString('Image Alt Text', altText),
  [`${prefix}Header`]: requiredString('Header', header),
  [`${prefix}Description`]: requiredRichText('Description', description),
  [`${prefix}Cta`]: requiredString('Call to Action Label', cta)
})

Model.add(
  'Hero', {
    heroImage: image('Image'),
    heroImageAltText: requiredString(
      'Image Alt Text',
      'A slot machine violently explodes with luck.'
    ),
    heroHeader: requiredString(
      'Header',
      'Our Mission'
    ),
    heroIntro: requiredRichText(
      'Intro',
      '<p>Lucky Day Gaming has the highest quality of service and games in the video gaming industry. As a Licensed Terminal Operator, we strive to offer the best for our clients.</p>'
    ),
    heroCta: requiredString(
      'Call to Action Label',
      `Let's get lucky`
    )
  },
  'Partnerships Section', section('partnershipsSection', {
    altText: 'A trio of slot machines',
    header: 'Partnerships',
    description: '<p>We pride ourselves on delivering the best machines to our customers. Lucky Day Gaming works with and has maintained a long-standing relationship with with Bally, IGT™, WMS, and Spielo™.</p>',
    cta: 'Learn more'
  }),
  'About Gaming Section', section('aboutSection', {
    altText: 'A pie chart infographic.',
    header: 'About Gaming',
    description: '<p>In the Illinois video gaming market, compliance is key if you want to hold on to your gaming license. Ensuring you stay compliant means understanding a robust legal landscape AND keeping up with changes in the market.</p>',
    cta: 'Learn more'
  }),
  'Legal Notice Section', section('legalSection', {
    altText: 'A pile of gold.',
    header: 'Legal Notice',
    description: '<p>Lucky Day Gaming is a Terminal Operator licensed by the Illinois Gaming Board who strategically places slot machines and amusements in  establishments throughout Illinois.</p>',
    cta: 'Learn more'
  })
)

Model.register()
