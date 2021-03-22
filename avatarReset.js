'use strict'

const client = require('./client')
const log = require('./log')

module.exports = () => {
  // Sets the bots avatar to avatar.png
  client.user.setAvatar('./avatar.png')
    .then(user => log('Avatar reset'))
    .catch(console.error)
}
