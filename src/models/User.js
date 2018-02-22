const keystone = require('keystone')
const { Types } = keystone.Field

const User = new keystone.List('User', {
  label: 'Keystone Users'
})

User.add({
  name: {
    type: String,
    required: true,
    initial: true
  },
  email: {
    type: Types.Email,
    required: true,
    unique: true,
    initial: true
  },
  password: {
    type: Types.Password,
    required: true,
    initial: true
  }
})

User.schema.virtual('canAccessKeystone').get(function () {
  return true
})

User.register()
