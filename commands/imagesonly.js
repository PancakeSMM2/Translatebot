'use strict'

const fs = require('fs')

module.exports = {
  name: 'imagesonly',
  guildOnly: true,
  /**
   * Executes the command
   * @param {Message} message The message used to execute the command
   * @param {Array} args The arguments provided alongside the command
   */
  execute: (message, args) => {
    // Read the imagesOnly.json file
    fs.readFile('./imagesOnly.json', (err, data) => {
      // Error handling
      if (err) {
        throw err
      }
      // Parses the read data
      const serverConfig = JSON.parse(data.toString())
      // Shortcut variables
      const channelId = message.channel.id
      const guildId = message.guild.id

      // If serverConfig.guildId does not exist
      if (!serverConfig[guildId]) {
        // Sets serverConfig.guildId to an empty object
        serverConfig[guildId] = {}
      }
      // If serverConfig.guildId.channelId either is false or does not exist
      if (!serverConfig[guildId][channelId]) {
        // If serverConfig.guildId exists
        if (serverConfig[guildId]) {
          // Set serverConfig.guildId.channelId to true
          serverConfig[guildId][channelId] = true
        } else {
          // Else, create an empty setup object
          const setupObject = {}
          // Set setupObject.channelId to true
          setupObject[channelId] = true
          // Set serverConfig.guildId to the setup object
          serverConfig[guildId] = setupObject
        }
      } else {
        // If serverConfig.guildId.channelId is true, set it to false
        serverConfig[guildId][channelId] = false
      }
      // Write the changes to the serverConfig object to imagesOnly.json
      fs.writeFile('./imagesOnly.json', JSON.stringify(serverConfig), (err) => {
        // Error handling
        if (err) {
          throw err
        }
        // If serverConfig.guildId.channelId is true
        if (serverConfig[guildId][channelId]) {
          // Indicates that the channel is now image-only
          message.react('🚫')
            .catch(console.error)
          message.react('💬')
            .catch(console.error)
        } else {
          // Indicates that the channel is no longer image-only
          message.react('✅')
            .catch(console.error)
          message.react('💬')
            .catch(console.error)
        }
      })
    })
  }
}
