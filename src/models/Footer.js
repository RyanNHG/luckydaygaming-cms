const keystone = require('keystone')
const { List } = keystone
const { string, requiredString, image } = require('./_fields')

const Model = new List('Footer', {
  singleton: true
})

Model.add({
  name: { type: String, required: true, default: 'Footer' }
})

const socialLink = (label, default_) => ({
  type: String,
  label,
  default: default_,
  note: '<strong>Note:</strong> To hide the social icon, leave this field blank.'
})

Model.add(
  'Logo', {
    footerLogo: image('Logo'),
    footerLogoAltText: requiredString(
      'Logo Alt Text',
      'The Lucky Day Gaming Logo'
    )
  },
  'Copyright', {
    copyright: requiredString('Copyright', '© 2018 by Lucky Day, LLC. All rights reserved.')
  },
  'Contact Information', {
    contactHeader: requiredString('Header', 'New Business Inquiry'),
    phonePrefix: requiredString('Phone Prefix', 'P:'),
    phoneNumber: string('Phone Number', '312.439.0088'),
    emailPrefix: requiredString('Email Prefix', 'E:'),
    emailAddress: string('Email Address', 'luckydayllc@gmail.com')
  },
  'Social Links', {
    socialHeader: requiredString('Header', 'Stay Connected'),
    facebookUrl: socialLink('Facebook URL', 'https://www.facebook.com'),
    instagramUrl: socialLink('Instagram URL', 'https://www.instagram.com'),
    youtubeUrl: socialLink('Youtube URL', 'https://www.youtube.com'),
    twitterUrl: socialLink('Twitter URL', 'https://www.twitter.com')
  }
)

Model.register()
