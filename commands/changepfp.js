'use strict'

const client = require('../client')
const log = require('../log')

module.exports = {
  name: 'changepfp',
  execute: (message, args) => {
    if (message.attachments.first()) {
      client.user.setAvatar(message.attachments.first().url)
        .catch(console.error)

      message.react('✅')
        .catch(console.error)
    } else {
      message.react('🚫')
        .catch(console.error)
      message.react('📸')
        .catch(console.error)
    }
  }
}
