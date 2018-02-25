const keystone = require('keystone')
const singleton = require('keystone-singleton')
const { sluggify } = require('./utils')

// Plugins
singleton.init({ keystone })

// Configuration
const config = {
  name: 'Lucky Day Gaming',
  secret: process.env.COOKIE_SECRET || 'secret',
  mongo: process.env.MONGO_URI || 'mongodb://localhost/lucky-day-gaming',
  autoUpdate: true,
  port: process.env.PORT || 3000,
  cloudinaryUrl: process.env.CLOUDINARY_URL || 'cloudinary://api_key:api_secret@cloud_name'
}

keystone.init({
  'name': config.name,
  'brand': config.name,
  'mongo': config.mongo,
  'session store': 'connect-mongo',
  'session store options': { cookie: { maxAge: 36000000 } },
  'auth': true,
  'user model': 'User',
  'cookie secret': config.secret,
  'auto update': config.autoUpdate,
  'port': config.port,
  'cloudinary config': config.cloudinaryUrl,
  'cloudinary prefix': sluggify(config.name),
  'cloudinary folders': true,
  'cloudinary secure': true
})

// Models
keystone.import('models')
keystone.set('nav', require('./models/_nav'))

// Routes
keystone.set('routes', require('./routes'))

// Start KeystoneJS
keystone.start()
