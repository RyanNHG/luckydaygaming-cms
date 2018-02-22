const keystone = require('keystone')
const singleton = require('keystone-singleton')

// Plugins
singleton.init({ keystone })

// Configuration
const config = {
  name: 'Lucky Day Gaming',
  secret: process.env.COOKIE_SECRET || 'secret',
  mongo: process.env.MONGO_URI || 'mongodb://localhost/lucky-day-gaming',
  autoUpdate: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000
}

keystone.init({
  'name': config.name,
  'brand': config.name,
  'mongo': config.mongo,
  'auth': true,
  'user model': 'User',
  'cookie secret': config.secret,
  'auto update': config.autoUpdate,
  'port': config.port
})

// Models
keystone.import('models')

// Routes
keystone.set('routes', require('./routes'))

// Start KeystoneJS
keystone.start()
