'use strict'

const translate = require('../translateClient.js')
const { prefix } = require('../config.json')
const randomIntInclusive = require('../randomIntInclusive')
const randomRainbowColor = require('../randomRainbowColor')
const Discord = require('discord.js')

module.exports = {
  name: 'translate',
  /**
   * Executes the command
   * @param {Message} message The message used to execute the command
   * @param {Array} args The arguments provided alongside the command
   * @returns {void} Returns nothing
   */
  execute: (message, args) => {
    // Checks to ensure there are arguments passed to this command
    if (args.length === 0) {
      message.channel.send(new Discord.MessageEmbed({
        color: randomRainbowColor(),
        fields: [
          {
            name: `${prefix}translate [Cycles] <Text>`,
            value: '\u200b'
          },
          {
            name: 'Cycles',
            value: 'The number of translations to do. May be increased by 1 if it has to do a final translation back into the original language. Defaults to 5 if not specified',
            inline: true
          },
          {
            name: 'Text',
            value: 'The text that will be translated. Can be in any language, as long as it\'s one of the 111 languages supported by Google Translate',
            inline: true
          }
        ]
      }))
      return
    }
    // Gets the cycles argument
    let cycles = parseInt(args[0])
    let text
    // If cycles has been provided
    if (!isNaN(cycles)) {
      // Gets the text argument
      text = message.content.slice(prefix.length).trim().slice('translate'.length + cycles.toString().length + 2)
    } else { // If cycles has not been provided, default to 5 cycles
      cycles = 5
      text = message.content.slice(prefix.length).trim().slice('translate'.length).trim()
    }
    if (cycles > 50) {
      message.channel.send(new Discord.MessageEmbed({
        color: randomRainbowColor(),
        fields: [{
          name: 'Error', value: `This command does not support over 50 cycles
Please also be courteous when selecting a high number of cycles, and do not do it frequently`
        }]
      }))
      return
    }
    // Gets the supported languages
    translate.getLanguages().then(async result => {
      // Extracts the languages from the results
      const langs = result[0]
      // Clones the text argument to a new variable translateText, to be used for translation
      let translateText = text
      // Attempts to detect the language of the text
      const detect = await translate.detect(text)
      const detectedLangCode = detect[0].language // for english, returns 'en'

      // If translate failed to detect a language, assume english. Otherwise, get the language details from the array of supported languages
      let previousLang
      if (detectedLangCode === null) {
        previousLang = {
          code: 'en',
          name: 'English'
        }
      } else {
        // For each language, check if its code lines up with the detected code
        langs.forEach((language, index) => {
          if (language.code === detectedLangCode) {
            previousLang = language
          }
        })
      }
      // Creates an embed
      const uxEmbed = new Discord.MessageEmbed({
        author: { name: 'Translate', iconURL: 'https://cdn.discordapp.com/attachments/716108846816297040/823295348474642492/1024px-Google_Translate_logo.png' },
        color: randomRainbowColor(),
        fields: [
          { name: 'Text', value: text },
          { name: 'Progress', value: `0 of ${cycles}`, inline: true },
          { name: 'Translating to', value: '\u200B', inline: true },
          { name: 'Translating from', value: '\u200B', inline: true },
          { name: 'Translate sequence', value: previousLang.name }
        ]
      })
      // Sends an update message
      message.channel.send(uxEmbed).then(async uxMessage => {
        // Saves the original language
        const firstLang = previousLang
        for (let i = 0; i < cycles; i++) {
          let target
          // Do while loop
          do {
          // Randomly selects a language
            target = langs[randomIntInclusive(0, langs.length - 1)]
          } while (target.code === previousLang.code) // While the target equals the previous language. Ensures that you don't end up translating from english to english, for example
          // Creates an options object for the translation
          const options = { from: previousLang.code, to: target.code }
          // Translates the text
          const translated = await translate.translate(translateText, options) // Uses google's Cloud Translate API to translate the text
          translateText = translated[0] // Gets the text string
          // Updates the UX message
          uxEmbed.fields = [
            { name: 'Text', value: translateText },
            { name: 'Progress', value: `${i + 1} of ${cycles}`, inline: true },
            { name: 'Translating to', value: target.name, inline: true },
            { name: 'Translating from', value: previousLang.name, inline: true },
            { name: 'Translate sequence', value: uxEmbed.fields[4].value += ` -> ${target.name}` }
          ]
          uxMessage.edit(uxEmbed)
          // Sets the previous language to the target language
          previousLang = target
        }
        // If the translated text is not in the language of the original message
        if (previousLang !== firstLang) {
        // Creates an options object translating to the language of the orignal message
          const options = { from: previousLang.code, to: firstLang.code }
          // Translates the text
          const translated = await translate.translate(translateText, options)
            .catch(console.error)
          translateText = translated[0]
        }
        message.channel.send(translateText)
      }, (err) => console.error(err)) // if error, send the error to the console
    }, (err) => console.error(err)) // Error handling
  }
}
