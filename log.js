'use strict'

const client = require('./client')
const config = require('./config.json')

module.exports = (text) => {
  let logServer = client.guilds.resolve(config.logServerID)

  if (logServer) {
    logServer = logServer.available ? logServer : null
  }
  const logChannel = logServer ? logServer.channels.resolve(config.logChannelID) : null

  if (logChannel !== null) {
    if (logChannel.isText()) {
      logChannel.send(text)
    }
  }
  console.log(text)
}
