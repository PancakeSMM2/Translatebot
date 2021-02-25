'use strict'

const Discord = require('discord.js')
const config = require('./config.json')

module.exports = new Discord.Client({ presence: { activity: { name: config.presenceText, type: config.presenceType } } })
