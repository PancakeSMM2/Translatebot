'use strict'

const purgeChannels = require('../purgeChannels')

module.exports = {
  name: 'triggerpurge',
  ownerOnly: true,
  execute: (message, args) => {
    purgeChannels()
  }
}
