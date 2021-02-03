'use strict'

/**
 * Randomizes a random int between the minimum and maximum, inclusive to both
 * @param {Number} min The minimum number to randomize between. If not an int, rounded up to the nearest int
 * @param {Number} max The maximum number to randomize between. If not an int, rounded down to the nearest int
 * @returns {Number} Returns a random int between the minimum and maximum, inclusive to both
 */
module.exports = (min, max) => {
  // Rounds the minimum and maximum
  min = Math.ceil(min)
  max = Math.floor(max)
  // Returns a randomized int between the minimum and maximum
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
