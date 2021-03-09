'use strict'

const client = require('./client')
const config = require('./config.json')

module.exports = (text) => {
  const logServer = client.guilds.resolve(config.logServerID)

  if (!logServer) return
  if (!logServer.available) return
  const logChannel = logServer.channels.resolve(config.logChannelID)

  if (logChannel.isText()) {
    logChannel.send(text)
  }
  console.log(text)
}
