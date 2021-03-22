'use strict'

const client = require('../client')
const { prefix } = require('../config.json')
const randomRainbowColor = require('../randomRainbowColor')
const Discord = require('discord.js')

module.exports = {
  name: 'changestatus',
  // When the command is executed
  execute: (message, args) => {
    // Error prevention
    if (args.length === 0) {
      // User feedback
      message.channel.send(new Discord.MessageEmbed({
        color: randomRainbowColor(),
        fields: [
          {
            name: `${prefix}changestatus [Type] <Text>`,
            value: '\u200b'
          },
          {
            name: 'Type',
            value: 'The status type you want. Bots can\'t have custom statuses, so you have to pick from one of the options listed below',
            inline: true
          },
          {
            name: 'Text',
            value: 'The text you want the status to have. There are some character limits and such, but no matter what nothing will break',
            inline: true
          },
          {
            name: 'Valid status types',
            value: `PLAYING
STREAMING
LISTENING
WATCHING
COMPETING
`
          }
        ]
      }))
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

      message.react('✅') // User feedback
      switch (statusType) { // One emoji to indicate which status type was detected
        case 'PLAYING':
          message.react('🎮')
          break
        case 'STREAMING':
          message.react('🎥')
          break
        case 'LISTENING':
          message.react('🎧')
          break
        case 'WATCHING':
          message.react('📺')
          break
        case 'COMPETING':
          message.react('🥊')
          break

        default:
          message.react('⁉') // It should be fully impossible for this code to run, but just in case
          break
      }
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
      message.react('✅')
      message.react('🎮') // Indicates that it defaulted to the PLAYING status type
    }

    client.user.setPresence(newStatus) // Sets the bots presence
  }
}
