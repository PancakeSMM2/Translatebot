'use strict'

const client = require('../client')
const commandHandler = require('../commandHandler')
const randomRainbowColor = require('../randomRainbowColor')
const { prefix } = require('../config.json')
const Discord = require('discord.js')

module.exports = {
  name: 'above',
  execute: (message, args) => {
    if (args.length === 0) {
      message.channel.send(new Discord.MessageEmbed({
        color: randomRainbowColor(),
        fields: [
          {
            name: `${prefix}messageabove [Messages Back] <Command> [Prefix]`,
            value: '\u200b'
          },
          {
            name: 'Messages Back',
            value: 'The number of messages to go back, defaulting to 1 if not provided',
            inline: true
          },
          {
            name: 'Command',
            value: 'Any of the bots commands, including messageabove (though there\'s no reason to do that)',
            inline: true
          },
          {
            name: 'Prefix',
            value: 'A prefix to add to the command, like a specific number of cycles to do for the translate command, or a type to specify for the changestatus command',
            inline: true
          },
          {
            name: 'Example',
            value: '\u200b'
          },
          {
            name: 'Message 1',
            value: 'A funny joke, that you want to share!'
          },
          {
            name: 'Message 2',
            value: 'A funny response!'
          },
          {
            name: 'Message 3',
            value: `${prefix}messageabove 2 changestatus listening`
          },
          {
            name: 'Outcome',
            value: `${prefix}changestatus listening A funny joke, that you want to share!`
          }
        ]
      }))
      return
    }

    // If the first argument provided is a number, save it to the messagesBack variable. Otherwise, set messagesBack to 1
    let messagesBackProvided
    let messagesBack
    if (!isNaN(parseInt(args[0]))) {
      messagesBack = args.shift()
      messagesBackProvided = true
    } else {
      messagesBack = 1
      messagesBackProvided = false
    }

    // Error prevention
    if (messagesBack > 100) {
      message.react('🚫')
      return
    }

    // Fetches the message above the message invoking the command
    message.channel.messages.fetch({ limit: messagesBack, before: message.id })
      .catch(console.error) // Error handling
      .then((fetched) => {
        const messageAbove = fetched.last() // Extracts the message from the returned collection

        const craftedMessage = messageAbove // A message to modify
        const suppliedCommand = args[0] // The command to attempt to execute

        if (!client.commands.has(suppliedCommand)) { // If the supplied command does not exist
          message.react('❔')
          return
        }

        // Gets the supplied arguments for the supplied command
        let suppliedArgs
        if (messagesBackProvided) {
          suppliedArgs = message.content.slice(prefix.length).trim().slice('messageAbove'.length + suppliedCommand.length + messagesBack.toString().length + 3).trim()
        } else {
          suppliedArgs = message.content.slice(prefix.length).trim().slice('messageAbove'.length + suppliedCommand.length + 2).trim()
        }

        // Sets the crafted messages content
        craftedMessage.content = `${prefix}${suppliedCommand} ${suppliedArgs} ${messageAbove.content}`

        // Sends the crafted message to the command handler
        commandHandler(craftedMessage)

        message.react('☑')
      })
  }
}
