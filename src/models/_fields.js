const keystone = require('keystone')
const { Types } = keystone.Field
const { range, debugWithLabel } = require('../utils')

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
          ? { heading: heading(number), dependsOn: debugWithLabel(heading(number), dependsOn(number)) }
          : {}),
      Object.keys(initialObject)
          .reduce((obj, key) => ({
            ...obj,
            [key + number]: { ...initialObject[key], dependsOn: debugWithLabel(key, dependsOn(number)) }
          }), {})
    ], [])

module.exports = {
  image,
  string,
  requiredString,
  richText,
  requiredRichText,
  notes,
  hidden,
  repeatFields
}
