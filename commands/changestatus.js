'use strict'

const client = require('../client')
const { prefix } = require('../config.json')

module.exports = {
  name: 'changestatus',
  // When the command is executed
  execute: (message, args) => {
    // Gets the name of the status
    const statusName = message.content.slice(prefix.length + module.exports.name.length).trim().replace(`${args[0]}`, '').trim()
    // Gets the type of the status
    const statusType = args.shift().toUpperCase()
    // The list of legal status types
    const legalStatusTypes = [
      'PLAYING',
      'STREAMING',
      'LISTENING',
      'WATCHING',
      'COMPETING'
    ]
    // Creates a utility variable
    let isStatusTypeLegal = false

    // For each legal status type
    legalStatusTypes.forEach((value) => {
      // If the proposed status type equals any of the legal status types
      if (statusType === value) {
        // Set isStatusTypeLegal to true
        isStatusTypeLegal = true
      }
    })

    // If the status type is legal
    if (isStatusTypeLegal) {
      // Creates a new object to use to set the bots presence
      const newStatus = {
        activity: {
          type: statusType,
          name: statusName
        }
      }
      client.user.setPresence(newStatus) // Sets the bots presence
    }
  }
}
