const keystone = require('keystone')
const { Types } = keystone.Field

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

module.exports = {
  image,
  string,
  requiredString,
  requiredRichText
}
