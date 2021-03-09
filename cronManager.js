'use strict'

const Cron = require('cron')
const statusReset = require('./statusReset.js')
const purgeChannels = require('./purgeChannels.js')

/**
 * To add a new cronjob
 * Add new property for the cronjob
 * Add a new method that initiates the cronjob
 */
const cronManager = {
  startAll: () => {
    Object.entries(cronManager).forEach(pair => {
      if (typeof pair[1] === 'function' && pair[0] !== 'startAll') {
        pair[1]()
        console.log(`Ran ${pair[0]}`)
      }
    })
  },
  statusReset: Cron.job('0 0 0 * * */1', statusReset, console.log('cronjob \'statusReset\''), false, 'America/Chicago'),
  statusResetInit: () => {
    cronManager.statusReset.start()
  },
  purgeChannels: Cron.job('0 0 0 * * */1', purgeChannels, console.log('cronjob \'purgeChannels\''), false, 'America/Chicago'),
  purgeChannelsInit: () => {
    cronManager.purgeChannels.start()
  }
}

module.exports = cronManager
