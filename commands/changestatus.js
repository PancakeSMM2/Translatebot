'use strict'

const client = require('../client')
const { prefix } = require('../config.json')

module.exports = {
  name: 'changestatus',
  // When the command is executed
  execute: (message, args) => {
    // Error prevention
    if (args.length === 0) {
      // User feedback
      message.channel.send(`List of valid types is the following:
PLAYING
STREAMING
LISTENING
WATCHING
COMPETING`)
      return
    }

    // Gets the proposed type of the status
    const statusType = args[0].toUpperCase()
    // The list of legal status types
    const legalStatusTypes = [
      'PLAYING',
      'STREAMING',
      'LISTENING',
      'WATCHING',
      'COMPETING'
    ]
    // Creates a utility variable
    let statusTypeLegal = false

    // For each legal status type
    legalStatusTypes.forEach((value) => {
      // If the proposed status type equals any of the legal status types
      if (statusType === value) {
        // Set isStatusTypeLegal to true
        statusTypeLegal = true
      }
    })

    // Creats a newStatus object to use to set the bots presence
    let newStatus = {}

    // If the status type is legal
    if (statusTypeLegal) {
      // Gets the name of the status
      const statusName = message.content.slice(prefix.length + module.exports.name.length).trim().replace(args[0], '').trim()

      // Sets the newStatus object
      newStatus = {
        activity: {
          type: statusType,
          name: statusName
        }
      }

      message.channel.send(`Setting ${statusType} status of name '${statusName}'`) // User feedback
    } else {
      // If the status type is not legal
      // Gets the name of the status
      const statusName = message.content.slice(prefix.length + module.exports.name.length).trim()

      // Sets the newStatus object
      newStatus = {
        activity: {
          type: 'PLAYING',
          name: statusName
        }
      }
      // User feedback
      message.channel.send(`No valid status type specified, defaulting to PLAYING
Setting PLAYING status of name '${statusName}'
(Valid status types include playing, streaming, listening, watching, and competing`)
    }

    client.user.setPresence(newStatus) // Sets the bots presence
  }
}
