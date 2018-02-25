const keystone = require('keystone')
const { List } = keystone
const { requiredString, image } = require('./_fields')

const Model = new List('Header', {
  singleton: true
})

Model.add({
  name: { type: String, required: true, default: 'Header' }
})

Model.add(
  'Brand', {
    brandLogo: image('Logo'),
    brandLogoAltText: requiredString(
      'Logo Alt Text',
      'The Lucky Day Gaming Logo'
    ),
    secondaryLogoImage: image('Secondary Logo'),
    secondaryLogoImageAltText: requiredString(
      'Secondary Logo Alt Text',
      'Lucky Day LLC'
    )
  },
  'Menu', {
    menuLabel: requiredString('Menu Label', 'Menu')
  }
)

Model.register()
