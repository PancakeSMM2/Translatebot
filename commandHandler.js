'use strict'

const Discord = require('discord.js')
const config = require('./config.json')
const client = require('./client')
const randomRainbowColor = require('./randomRainbowColor')

/**
 * Attempts to execute a command provided within a message
 * @param {Discord.Message} message The message to handle
 * @returns Returns nothing
 */
module.exports = (message) => {
  // Gets the command arguments (as an array) and the command itself (as a string)
  const args = message.content.slice(config.prefix.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  // If the attempted command is a command the bot has
  if (client.commands.has(commandName)) {
    // Get the command
    const command = client.commands.get(commandName)
    // Do safety checks
    if (command.DMonly && message.channel.type !== 'dm') {
      message.channel.send(new Discord.MessageEmbed({
        fields: [
          { name: 'Error', value: 'That command is DM-only', color: randomRainbowColor() }
        ]
      }))
      return
    } else if (command.guildOnly && message.channel.type !== 'text') {
      message.channel.send(new Discord.MessageEmbed({
        fields: [
          { name: 'Error', value: 'That command is for guild channels only', color: randomRainbowColor() }
        ]
      }))
      return
    } else if (command.ownerOnly && message.author.id !== config.ownerID) {
      message.channel.send(new Discord.MessageEmbed({
        fields: [
          { name: 'Error', value: 'That command can only be used by the owner. Sorry, I just got scared about security', color: randomRainbowColor() }
        ]
      }))
      return
    }
    // Try to execute the command, and catch any errors
    try {
      command.execute(message, args)
    } catch (error) {
      // Logs the error to the console, and tells the user about the error.
      console.error(error)
      message.reply(`There was an error executing that command. Please let one of the devs know, something has likely just gone quite wrong.
      ${error}`)
    }
  } else { // If that command does not exist
    message.react('❓')
  }
}
