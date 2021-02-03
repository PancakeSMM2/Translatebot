'use strict'

// Imports file system, discord.js, the config, and the keys
const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')
const keys = require('./Security/keys.json')
// Creates a new client
const client = new Discord.Client({ presence: { activity: { name: config.presenceText, type: config.presenceType } } })
client.commands = new Discord.Collection()

// Loads the commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
// For every command file
for (const file of commandFiles) {
  // Imports the command file, and adds it to the client.commands collection
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Ready')
})

client.on('message', (message) => {
  // If the message starts with the prefix AND does not come from a bot AND is sent in a DM channel
  // eslint-disable-next-line valid-typeof
  if (message.content.startsWith(config.prefix) && !message.author.bot && message.channel.type === 'dm') {
    // Gets the command arguments (as an array) and the command itself (as a string)
    const args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    // If the attempted command is a command the bot has
    if (client.commands.has(command)) {
      // Try to execute the command, and catch any errors
      try {
        client.commands.get(command).execute(message, args)
      } catch (error) {
        // Logs the error to the console, and tells the user about the error.
        console.error(error)
        message.reply(`There was an error executing that command. Please let one of the devs know, something has likely just gone quite wrong.
        ${error}`)
      }
    }
  }
})

client.login(keys.discordToken)
