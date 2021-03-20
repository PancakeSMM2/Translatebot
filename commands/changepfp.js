'use strict'

const client = require('../client')

module.exports = {
  name: 'changepfp',
  execute: (message, args) => {
    if (message.attachments.first()) {
      console.log(message.attachments.first())
      client.user.setAvatar(message.attachments.first().url)
        .catch(console.error)

      message.react('👍')
        .catch(console.error)
    } else {
      message.react('🚫')
        .catch(console.error)
      message.react('📸')
        .catch(console.error)
    }
  }
}
