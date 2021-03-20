'use strict'

const client = require('./client')

module.exports = () => {
  // Sets the bots avatar to avatar.png
  client.user.setAvatar('./avatar.png')
    .then(user => console.log('Avatar reset'))
    .catch(console.error)
}
