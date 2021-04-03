'use strict'

const fs = require('fs')
const client = require('./client.js')
const log = require('./log')

module.exports = () => {
  log('Purging...')
  fs.readFile('./purgeChannels.json', (err, data) => {
    // Error handling
    if (err) {
      throw err
    }
    // Converts the data
    const purgeChannels = JSON.parse(data.toString())

    // For each guild in purgeChannels.json
    Object.entries(purgeChannels).forEach((purgeGuild) => {
      log('Found purge guidl')
      // Get the guild
      const guild = client.guilds.resolve(purgeGuild[0])

      // If the guild is available
      if (guild.available) {
        // For each channel in purgeChannels.json
        Object.entries(purgeGuild[1]).forEach(async purgeChannel => {
          log('Found purge channel')
          // If the channel is set to be purged
          if (purgeChannel[1]) {
            // Get the channel
            const channel = guild.channels.resolve(purgeChannel[0])

            // If the channel is a text channel
            if (channel.isText()) {
              let isMessages
              do {
                // Fetch messages, and then delete each of them
                const purgeMessages = await channel.messages.fetch({ limit: 100 }, false, true)
                isMessages = !!purgeMessages.first()
                log(isMessages)
                log(purgeMessages.size)
                purgeMessages.each(async (message) => {
                  await message.delete({ reason: `Routine purge of <#${message.channel.id}>` })
                })
              } while (isMessages) // While there are still messages in the channel
            }
          }
        })
      }
    })
    log('Purged!')
  })
}
