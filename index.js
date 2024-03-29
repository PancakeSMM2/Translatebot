'use strict'

// Imports
const fs = require('fs')
const Discord = require('discord.js')
const commandHandler = require('./commandHandler')
const statusReset = require('./statusReset.js')
const avatarReset = require('./avatarReset')
const config = require('./config.json')
const keys = require('./Security/keys.json')
const log = require('./log.js')
const channels = require('./archivalChannels.json')
// Creates a new client
const client = require('./client.js')
// const randomRainbowColor = require('./randomRainbowColor.js')
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
  const cronManager = require('./cronManager.js')
  cronManager.startAll()
  statusReset()
  avatarReset()
  log('Ready')
})

client.on('message', (message) => {
  // If the message starts with the prefix AND does not come from a bot
  if (message.content.startsWith(config.prefix) && !message.author.bot) {
    commandHandler(message)
  }

  // If the message is sent in a guild
  if (message.channel.type === 'text') {
    // Archival
    if (channels[message.channel.id]) {
      const embed = new Discord.MessageEmbed()
        .setDescription(message.content)
        .setColor(client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).displayHexColor)
        .setTimestamp(message.createdTimestamp)

      if (client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname) embed.setAuthor(client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).nickname, message.author.displayAvatarURL(), message.url)
      else embed.setAuthor(message.author.username, message.author.displayAvatarURL(), message.url)

      if (message.attachments.first()) embed.setImage(message.attachments.first().proxyURL)

      client.channels.cache.get(channels[message.channel.id]).send(embed)
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
        if (imagesOnly[message.guild.id][message.channel.id] && !message.attachments.first() && !message.embeds.length && message.content !== `${config.prefix}imagesonly`) {
        // Deletes the message
          message.delete({ reason: 'Imageless message sent in image-only channel' })
        }
      }
    })
  }
})

client.login(keys.discordToken)
