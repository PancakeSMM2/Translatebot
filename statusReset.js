'use strict'

const client = require('./client')
const fs = require('fs')

module.exports = () => {
  fs.readFile('./config.json', (err, data) => {
    if (err) {
      throw err
    }

    const config = JSON.parse(data.toString())

    client.user.setPresence({
      activity: {
        type: config.presenceType,
        name: config.presenceText
      }
    })
  })
}
