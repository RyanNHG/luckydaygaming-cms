const keystone = require('keystone')
const { List } = keystone

const pages = [
  { name: 'OurCompanyInteriorPage' },
  { name: 'PartnershipsInteriorPage' },
  { name: 'AboutGamingInteriorPage' }
]

const createModel = ({ name }) => {
  const Model = new List(name, {
    label: 'Interior Pages',
    sortable: true,
    autokey: { path: 'slug', from: 'name', unique: true }
  })

  Model.add({
    name: { type: String, required: true, initial: true }
  })

  Model.register()
}

pages.forEach(createModel)
