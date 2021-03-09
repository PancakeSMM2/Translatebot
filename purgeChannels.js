'use strict'

const fs = require('fs')
const client = require('./client.js')

module.exports = () => {
  fs.readFile('./purgeChannels.json', (err, data) => {
    // Error handling
    if (err) {
      throw err
    }
    // Converts the data
    const purgeChannels = JSON.parse(data.toString())

    // For each guild in purgeChannels.json
    Object.entries(purgeChannels).forEach((purgeGuild) => {
      // Get the guild
      const guild = client.guilds.resolve(purgeGuild[0])

      // If the guild is available
      if (guild.available) {
        // For each channel in purgeChannels.json
        Object.entries(purgeGuild[1]).forEach((purgeChannel) => {
          // If the channel is set to be purged
          if (purgeChannel[1]) {
            // Get the channel
            const channel = guild.channels.resolve(purgeChannel[0])

            // If the channel is a text channel
            if (channel.isText()) {
              let isMessages
              do {
                // Fetch messages, and then delete each of them
                channel.messages.fetch().then((purgeMessages) => {
                  isMessages = !!purgeMessages.first()
                  purgeMessages.each((message) => {
                    message.delete({ reason: `Routine purge of <#${message.channel.id}>` })
                  })
                })
              } while (isMessages) // While there are still messages in the channel
            }
          }
        })
      }
    })
  })
}
