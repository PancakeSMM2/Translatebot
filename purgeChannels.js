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
        Object.entries(purgeGuild[1]).forEach(async purgeChannel => {
          // If the channel is set to be purged
          if (purgeChannel[1]) {
            // Get the channel
            const channel = guild.channels.resolve(purgeChannel[0])

            // If the channel is a text channel
            if (channel.isText()) {
              let isMessages
              let lastMessage
              do {
                // Fetch messages, excluding messages that have already been fetched
                const purgeMessages = lastMessage !== undefined ? await channel.messages.fetch({ limit: 100, before: lastMessage.id }, false, true) : await channel.messages.fetch({ limit: 100 }, false, true)
                isMessages = !!purgeMessages.first() // Sets isMessages based off of whether any messages were fetched
                lastMessage = purgeMessages.last() // Stores the furthest back message
                channel.bulkDelete(purgeMessages)
              } while (isMessages) // While there are still messages in the channel
            }
          }
        })
      }
    })
  })
}
