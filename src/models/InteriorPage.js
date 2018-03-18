const keystone = require('keystone')
const Page = require('./Page')
const { richText, string, repeatableFields } = require('./_fields')
const { interiorPages } = require('./_page-data')
const { List } = keystone
const { Types } = keystone.Field

const pageTypes = {
  RICH_TEXT: 'Rich Text',
  VIDEO: 'Video',
  LISTING: 'Listings'
}

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

  Model.add({
    pageType: {
      type: Types.Select,
      options: Object.keys(pageTypes).map(key => pageTypes[key]),
      default: pageTypes.RICH_TEXT,
      initial: true,
      required: true
    }
  })

  Model.add(...sections.richText())
  Model.add(...sections.videos())
  Model.add(...sections.listings({ maxSize: 10 }))

  Model.add(...relatedPages())

  Model.register()
}

const addPageTypeDependency = (pageType) =>
  obj => obj.heading
    ? { ...obj, dependsOn: obj.dependsOn || { pageType } }
    : Object.keys(obj).reduce((newObj, key) => ({
      ...newObj,
      [key]: {
        ...obj[key],
        dependsOn: obj[key].dependsOn || { pageType }
      }
    }), {})

const sections = {

  richText: () => [
    { heading: 'Rich Text Section' }, {
      richTextContent: richText('Content')
    }
  ].map(addPageTypeDependency(pageTypes.RICH_TEXT)),

  listings: ({ maxSize }) => repeatableFields({
    prefix: 'listings',
    labels: {
      singular: 'Listing',
      plural: 'Listings'
    },
    maxSize,
    fields: {
      image: string('Image'),
      title: string('Title'),
      subtitle: {
        label: 'Subtitle',
        type: String,
        collapse: true
      },
      content: richText('Content')
    }
  }).map(addPageTypeDependency(pageTypes.LISTING)),

  videos: () => [
    { heading: 'Video Section' }, {
      videosTitle: string('Title'),
      videosIntro: richText('Intro'),
      videoLinks: {
        label: 'Youtube Links',
        type: Types.TextArray,
        note: 'Please paste Youtube links here.'
      }
    }
  ].map(addPageTypeDependency(pageTypes.VIDEO))

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
