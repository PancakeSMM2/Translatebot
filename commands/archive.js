'use strict'

let channels = require('../archivalChannels.json')
const Discord = require('discord.js')
const fs = require('fs')
const randomRainbowColor = require('../randomRainbowColor')

module.exports = {
  name: 'archive',
  /**
   * Executes the command
   * @param {Discord.Message} message The message used to execute the command
   * @param {Array} args An array of every argument provided alongside the command
   */
  execute: (message, args) => {
    // Do different things based on the number of args provided
    switch (args.length) {
      // If one argument is provided
      case 1:
        // Assume that the source channel is the channel the command is being sent in, and provide its channel id as the first argument
        args.unshift(message.channel.id)
      // eslint-disable-next-line no-fallthrough
      case 2:
        // If args[0] and args[1] are both numbers
        if (!isNaN(args[0]) && !isNaN(args[1])) {
          // Assign the output channel to the source channel
          channels[args[0]] = args[1]

          // Write the new value of channels to archivalChannels.json
          fs.writeFile('./archivalChannels.json', JSON.stringify(channels), null, (err) => {
            if (err) throw err // Error handling
          })

          // Delete the cache of archivalChannels.json
          delete require.cache[require.resolve('../archivalChannels.json')]
          // Refresh the cache
          channels = require('../archivalChannels.json')

          // Reply with an embed
          message.channel.send(new Discord.MessageEmbed({
            author: { name: 'Archival' }, // Possible to-do: add author icon
            color: randomRainbowColor(), // Set the color to a random rainbow color
            fields: [ // Set the fields
              {
                name: '🚨 ARCHIVING MESSAGES STARTING NOW 🚨',
                value: 'All messages sent from this point onwards will be archived and stored in a separate channel, possibly not in this server. To stop this archiving use the stoparchival command. This messsage has been pinned to help ensure its prominence.'
              }
            ]
          })).then(reply => {
            // Once the message has been sent, pin it
            reply.pin({ reason: 'Reply to archive command' })
          })
        }
        break
      default:
        // If the command has an improper number of arguments, respond with a couple of reactions
        message.react('❓')
        message.react('🆔')
        break
    }
  }
}
