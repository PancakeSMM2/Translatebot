'use strict'

const client = require('../client')
const { prefix } = require('../config.json')

module.exports = {
  name: 'changestatus',
  execute: (message, args) => {
    const statusName = message.content.slice(prefix.length + module.exports.name.length).trim().replace(`${args[0]} ${args[1]}`, '').trim()
    const newStatus = {
      activity: {
        type: args.shift().toUpperCase(),
        name: statusName
      }
    }
    client.user.setPresence(newStatus)
  }
}
