'use strict'

const Discord = require('discord.js')
const randomRainbowColor = require('../randomRainbowColor')
const { prefix } = require('../config.json')

module.exports = {
  name: 'pride',
  execute: (message, args) => {
    // If no args are provided, give a syntax embed
    if (args.length === 0) {
      message.channel.send(new Discord.MessageEmbed({
        author: { iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png', name: 'Pride' },
        color: randomRainbowColor(),
        fields: [
          {
            name: `${prefix}pride <Flag>`,
            value: '\u200b'
          },
          {
            name: 'Flag',
            value: 'One of the supported pride flags, as listed below. I tried to add each flag we have as an emote or as a plaid. If you want a flag added to this, lemme know!',
            inline: true
          },
          {
            name: '\u200b',
            value: '\u200b',
            inline: true
          },
          {
            name: 'Supported Flags',
            value: `Gay
Lesbian
Bisexual / Bi
Pansexual / Pan
Asexual / Ace
Transgender / Trans
Nonbinary / Nonbi
Genderfluid
Aromantic / Aro
Aspergers / Aspie`
          }
        ]
      }))
      return
    }

    switch (args[0].toLowerCase()) {
      case 'gay':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823663803702968320/Rainbow.png' }
        }))
        break
      case 'lesbian':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823663988104626247/640px-Lesbian_Pride_Flag_2019.png' }
        }))
        break
      case 'bisexual':
      case 'bi':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823665074925338644/BLHYUZifUJVVQaEAN6nZufycAAAA7ElEQVR4nO3QwRGCAAAEsRMU6L9iSti3M0kJ2QAAAAAAAAAAAAAAAAAAAAAAAAD0EnYl7AfY.png' }
        }))
        break
      case 'pansexual':
      case 'pan':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823666382020411442/nMR9hJ2EhQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRU.png' }
        }))
        break
      case 'asexual':
      case 'ace':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823666508486934528/FSLixSyIhGwAAAAAAAAAAAAAAwL99CfsRdhIUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVKUFCVFSVFSlBQlRUlRUpQUJUVJUVK.png' }
        }))
        break
      case 'transgender':
      case 'trans':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823667011094577222/qI59NEJAAAAAAAAAMB2ngC8qZlebzLVTwAAAABJRU5ErkJggg.png' }
        }))
        break
      case 'nonbinary':
      case 'nonbi':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823667198752325672/HQiIhMwAAAAAAAAAAAAAAQDzZ5sU2b7a5szkpJWknJSTclJOykk5KSflpJyUk3JSTspJOSkn5aSclJNyUk7KSTkpJWknJSTclJOy.png' }
        }))
        break
      case 'genderfluid':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823667739331002478/images.png' }
        }))
        break
      case 'aromantic':
      case 'aro':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/538819764634517504/823683280846061578/unknown.jpeg' }
        }))
        break
      case 'aspergers':
      case 'aspie':
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          image: { url: 'https://cdn.discordapp.com/attachments/743231450014285954/805857615409315860/JaK7FFlMaaUQqwSUUVBYpIoIgEikigiASKSKCIBIpIoIgEikigiASKSKCIBIpIoIgEikigiASKSKCIBIpIoIgEikiCBiAImoAg2A.png' }
        }))
        break

      default:
        message.channel.send(new Discord.MessageEmbed({
          author: { name: 'Pride', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823648970215522304/image.png' },
          color: randomRainbowColor(),
          fields: [
            {
              name: '\u200b',
              value: 'Sorry, I don\'t have that pride flag uploaded. Send it to me and I\'ll add it as soon as I can. Have this flag in the meantime'
            }
          ],
          image: { url: 'https://cdn.discordapp.com/attachments/716108846816297040/823668797248372766/Z.png' }
        }))
        break
    }
  }
}
