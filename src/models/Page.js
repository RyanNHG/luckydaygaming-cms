const keystone = require('keystone')
const { List } = keystone
const { getDisplayName } = require('./_page-data')

const Model = new List('Page', {
  hidden: true,
  autokey: { path: 'slug', from: 'name', unique: true },
  map: { name: 'relationshipPickerName' }
})

Model.add({
  name: { type: String, required: true, initial: true },
  relationshipPickerName: {
    label: 'Name',
    type: String,
    watch: true,
    hidden: true,
    value: function () {
      return this.__t
        ? getDisplayName(this.__t, this.name)
        : this.name
    }
  }
})

try {
  Model.register()
} catch (ignore) {

}

module.exports = Model
