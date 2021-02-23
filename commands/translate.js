'use strict'

const translate = require('../translateClient.js')
const { prefix } = require('../config.json')
const randomIntInclusive = require('../randomIntInclusive')

module.exports = {
  name: 'translate',
  /**
   * Executes the command
   * @param {Message} message The message used to execute the command
   * @param {Array} args The arguments provided alongside the command
   * @returns {void} Returns nothing
   */
  execute: (message, args) => {
    // Shows the typing indicator, to show the command is being processed
    message.channel.startTyping()

    // Gets the cycles argument
    const cycles = parseInt(args.shift())
    // If cycles is not a number, cease the command
    if (typeof cycles !== 'number') {
      message.channel.send(`Proper syntax for the ${prefix}Translate command is as follows:
      ${prefix}Translate <Cycles> <Text>
      Cycles is the total number of translations to do
      Text is the text to translate`)
      message.channel.stopTyping()
      return
    }
    if (cycles > 50) {
      message.channel.send(`${prefix}Translate does not support greater than 50 cycles
Please also be mindful when selecting a high number of cycles, and do not do it frequently`)
      message.channel.stopTyping()
      return
    }
    // Gets the text argument
    const text = message.content.toLowerCase().slice(prefix.length).trim().replace(`translate ${cycles} `, '')
    // Sends an update message
    message.channel.send(`Translating "${text}" into...`)
    // Gets the supported languages
    translate.getLanguages().then(async (result) => {
      // Extracts the languages from the results
      const langs = result[0]
      // Clones the text argument to a new variable translateText, to be used for translation
      let translateText = text
      // Attempts to detect the language of the text
      const detect = await translate.detect(text)
      const detectedLang = await detect[0].language
      let previousLang = detectedLang !== null ? detectedLang : 'en'
      for (let i = 0; i < cycles; i++) {
        let target
        // Do while loop
        do {
          // Randomly selects a language
          target = langs[randomIntInclusive(0, langs.length - 1)]
        } while (target.code === previousLang) // While the target equals the previous language. Ensures that you don't end up translating from english to english, for example
        // Creates an options object for the translation
        const options = { from: previousLang, to: target.code }
        // Translates the text
        const translated = await translate.translate(translateText, options) // Uses google's Translate API to translate the text
        translateText = translated[0] // Gets the text string
        // Sets the previous language to the target language
        previousLang = target.code
      }
      // If the translated text is not in english
      if (previousLang !== 'en') {
        // Creates an options object translating to english
        const options = { from: previousLang, to: 'en' }
        // Translates the text
        const translated = await translate.translate(translateText, options)
        translateText = translated[0]
      }
      message.channel.send(translateText)
      // After the command is fulfilled, stop showing the typing indicator
      message.channel.stopTyping()
    }, (err) => console.error(err), message.channel.stopTyping()) // if error, send the error to the console and stop typing
  }
}
