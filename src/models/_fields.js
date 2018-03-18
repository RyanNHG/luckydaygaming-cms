const keystone = require('keystone')
const { Types } = keystone.Field
const { range } = require('../utils')

const _string = (config) => ({
  type: String,
  ...config
})

const string = (label, default_) =>
  _string({
    label,
    default: default_
  })

const requiredString = (label, default_) =>
  _string({
    required: true,
    label,
    default: default_
  })

const richText = (label, default_) => ({
  type: Types.Html,
  wysiwyg: true,
  label,
  default: default_
})

const requiredRichText = (label, default_) => ({
  type: Types.Html,
  wysiwyg: true,
  required: true,
  label,
  default: default_
})

const image = (label) => ({
  type: Types.CloudinaryImage,
  label
})

const notes = (default_) => ({
  type: String,
  label: 'Note:',
  required: true,
  noedit: true,
  default: default_
})

const hidden = (value) => ({
  type: String,
  required: true,
  hidden: true,
  default: value
})

const repeatFields = (initialObject, { maxSize, dependsOn, heading }) =>
  range(0, maxSize - 1)
    .reduce((objectList, number) => [
      ...objectList,
      (heading
          ? { heading: heading(number), dependsOn: dependsOn(number) }
          : undefined),
      Object.keys(initialObject)
          .reduce((obj, key) => ({
            ...obj,
            [key + '__' + number]: { ...initialObject[key], dependsOn: dependsOn(number) }
          }), {})
    ], [])

const prefixWith = (prefix, obj) =>
  Object.keys(obj).reduce((labelledObj, key) => ({
    ...labelledObj,
    [prefix + key]: obj[key]
  }), {})

const repeatableFields = ({ maxSize, fields, prefix, labels: { singular, plural } }) => [
  { heading: plural }, {
    [`${prefix}Count`]: {
      type: Types.Select,
      options: range(0, maxSize).map(num => `${num}`)
    }
  },
  ...repeatFields(prefixWith(prefix + '__', fields), {
    maxSize,
    dependsOn: (num) => ({ [`${prefix}Count`]: range(num + 1, maxSize).filter(a => a).map(num => `${num}`) }),
    heading: (num) => `${singular} ${num + 1}`
  })
]

const listifyFields = (obj, { prefix }) =>
  Object.keys(obj)
    .filter(key => key.indexOf(prefix + '__') === 0)
    .map(key => ({ parts: key.split('__'), value: obj[key] }))
      .reduce((list, { parts: [ _, fieldName, index ], value }) => {
        list[index] = list[index] || {}
        list[index][fieldName] = value
        return list
      }, [])

module.exports = {
  image,
  string,
  requiredString,
  richText,
  requiredRichText,
  notes,
  hidden,
  repeatableFields,
  listifyFields
}
