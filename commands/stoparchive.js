'use strict'

let channels = require('../archivalChannels.json')
const fs = require('fs')
const Discord = require('discord.js')
const client = require('../client')
const randomRainbowColor = require('../randomRainbowColor')
const log = require('../log')

module.exports = {
  name: 'stoparchive',
  /**
   * Executes the command
   * @param {Discord.Message} message The message used to execute the command
   * @param {Array} args An array of every argument provided alongside the command
   */
  execute: (message, args) => {
    switch (args.length) {
      case 0:
        args.unshift(message.channel.id)
      // eslint-disable-next-line no-fallthrough
      default:
        delete channels[args[0]]
        fs.writeFileSync('./archivalChannels.json', JSON.stringify(channels))

        // Delete the cache of archivalChannels.json
        delete require.cache[require.resolve('../archivalChannels.json')]
        // Refresh the cache
        channels = require('../archivalChannels.json')

        // eslint-disable-next-line no-case-declarations
        const sourceChannel = client.channels.resolve(args[0])
        if (!sourceChannel) return
        else if (!sourceChannel.isText()) return

        sourceChannel.send(new Discord.MessageEmbed({
          author: { name: 'Archival', iconURL: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.emoji.co.uk%2Ffiles%2Ftwitter-emojis%2Fobjects-twitter%2F11033-scroll.png&f=1&nofb=1' },
          color: randomRainbowColor(),
          fields: [
            {
              name: '🚨 STOPPING ARCHIVAL 🚨',
              value: 'Messages sent in this channel are no longer being archived. To resume archival use the archive command. This message has been pinned to help ensure its prominence.'
            }
          ]
        })).then(reply => {
          // Pin the reply
          try {
            reply.pin({ reason: 'Reply to stoparchive command' })
          } catch (err) {
            log(err)
          }
        })
    }
  }
}
