const keystone = require('keystone')
const { List } = keystone

const pages = [
  { name: 'OurCompanyLandingPage',
    defaults: {
      name: 'Our Company'
    }
  },
  { name: 'PartnershipsLandingPage',
    defaults: {
      name: 'Partnerships'
    }
  },
  { name: 'AboutGamingLandingPage',
    defaults: {
      name: 'About Gaming'
    }
  },
  { name: 'LocationsLandingPage',
    label: 'Locations Page',
    defaults: {
      name: 'Locations'
    }
  },
  { name: 'ContactUsLandingPage',
    label: 'Contact Us Page',
    defaults: {
      name: 'Contact Us'
    }
  },
  { name: 'FaqsLandingPage',
    label: 'FAQs Page',
    defaults: {
      name: 'FAQs'
    }
  }
]

const createModel = ({ name, label, defaults }) => {
  const Model = new List(name, {
    singleton: true,
    label: label || 'Landing Page',
    autokey: { path: 'slug', from: 'name', unique: true }
  })

  Model.add({
    name: { type: String, required: true, default: defaults.name }
  })

  Model.register()
}

pages.forEach(createModel)
