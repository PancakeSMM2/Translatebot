'use strict'

// Imports file system, discord.js, the config, and the keys
const fs = require('fs')
const Discord = require('discord.js')
const config = require('./config.json')
const keys = require('./Security/keys.json')
// Creates a new client
const client = require('./client.js')
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
  // If the message starts with the prefix AND does not come from a bot
  // eslint-disable-next-line valid-typeof
  if (message.content.startsWith(config.prefix) && !message.author.bot) {
    // Gets the command arguments (as an array) and the command itself (as a string)
    const args = message.content.slice(config.prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()

    // If the attempted command is a command the bot has
    if (client.commands.has(commandName)) {
      // Get the command
      const command = client.commands.get(commandName)
      // Do safety checks
      if (command.DMonly && message.channel.type !== 'dm') {
        message.channel.send('That command can be used in DMs only.')
        return
      } else if (command.guildOnly && message.channel.type !== 'text') {
        message.channel.send('That command can be used in guild channels only.')
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
    }
  }

  // imagesOnly enforcer
  fs.readFile('./imagesOnly.json', (err, data) => {
    // Error handling
    if (err) {
      throw err
    }

    // Parses the data to an object
    const imagesOnly = JSON.parse(data.toString())

    // If imagesOnly.guildId exists
    if (imagesOnly[message.guild.id]) {
      // If imagesOnly.guildId.messageId is true, and if the message has no attachments
      if (imagesOnly[message.guild.id][message.channel.id] && !message.attachments.first() && !message.embeds.length) {
        // Deletes the message
        message.delete({ reason: 'Imageless message sent in image-only channel' })
      }
    }
  })
})

client.login(keys.discordToken)
