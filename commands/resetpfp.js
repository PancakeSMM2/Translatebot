'use strict'

const avatarReset = require('../avatarReset')

module.exports = {
  name: 'resetpfp',
  execute: (message, args) => {
    avatarReset()

    message.react('👍')
      .catch(console.error)
  }
}
