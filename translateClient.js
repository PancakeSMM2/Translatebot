'use strict'

// Imports google's translate library
const { Translate } = require('@google-cloud/translate').v2
// Imports the keys
const keys = require('./Security/keys.json')

// Creates a new client
const projectId = keys.googleProjectId
const keyFilename = keys.googleKey
const translate = new Translate({ projectId, keyFilename })

// Exports the client
module.exports = translate
