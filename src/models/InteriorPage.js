const keystone = require('keystone')
const Page = require('./Page')
const { range } = require('../utils')
const { richText, string, repeatFields } = require('./_fields')
const { interiorPages } = require('./_page-data')
const { List } = keystone
const { Types } = keystone.Field

const createModel = ({ name }) => {
  const Model = new List(name, {
    inherits: Page,
    hidden: false,
    label: 'Interior Pages',
    sortable: true,
    autokey: { path: 'slug', from: 'name', unique: true },
    map: { name: 'name' }
  })

  Model.add('Intro Section', {
    intro: richText('Excerpt')
  })

  Model.add(...sections.listings({ maxSize: 10 }))

  Model.add(...relatedPages())

  Model.register()
}

const sections = {

  richText: () => [
    'Rich Text Section', {
      richTextContent: richText('Content')
    }
  ],

  listings: ({ maxSize }) => [
    'Listings', {
      listingCount: {
        type: Types.Select,
        options: range(0, maxSize).map(num => `${num}`)
      }
    },
    ...repeatFields({
      listingImage: string('Image'),
      listingTitle: string('Title'),
      listingSubtitle: {
        label: 'Subtitle',
        type: String,
        collapse: true
      },
      listingContent: richText('Content')
    }, {
      maxSize,
      dependsOn: (num) => ({ listingCount: range(num + 1, maxSize).filter(a => a).map(num => `${num}`) }),
      heading: (num) => `Listing ${num + 1}`
    })
  ]

}

const relatedPages = () => [
  'Related Pages', {
    relatedTitle: string('Title', 'How We Can Help'),
    relatedPages: {
      type: Types.Relationship,
      ref: 'Page',
      many: true,
      note: '<strong>Note:</strong> Only the first three pages will be displayed.'
    }
  }
]

interiorPages.forEach(createModel)
