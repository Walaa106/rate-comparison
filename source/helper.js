const _ = require('lodash');

const helper = {}
const rateKeys = ['total_promotion_rate', 'total_rate', 'rooms_left']

helper.calculateMean = function(classifiedProperties) {
  _.forEach(classifiedProperties, (properties, star) => {
    const isNotZeroStar = (star != 0)
    if (isNotZeroStar) {
      let sum = calculateSum(properties)
      //- AVG
      return _.transform(sum, function(result, sum, key) {
        result[key] = Math.floor(sum/properties.length)
      }, {})
    }
  })
}

function calculateSum(properties) {
  return _.reduce(properties, (previous, current) => {
    if (current && previous) {
      _.forEach(rateKeys, (key) => {
        if (current[key] && previous[key]) current[key] += previous[key]
      })
    }
    return current
  })
}

module.exports = helper
