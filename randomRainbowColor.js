'use strict'

const randomIntInclusive = require('./randomIntInclusive')

module.exports = () => {
  const rainbowColors = [
    0xe60000, // Red
    0xd98d00, // Orange
    0xffff00, // Yellow
    0x00e308, // Green
    0x0057d1, // Blue
    0x5f02e0, // Indigo
    0x9200d6 //  Violet
  ]

  const randomInt = randomIntInclusive(0, 6)

  return rainbowColors[randomInt]
}
