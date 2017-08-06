const _ = require("lodash")
const regulation = {}

/*
 ** Build an object with all stars categories
 ** output: {1: [], 2: [], 3: [] ..... }
 */
regulation.byStar = function(rate, result) {
  const propertyId = rate.hotel_id
  const propertyStar = await algolia.getPropertyStar(propertyId)
  const propObj = attachRateDetails(rate, propertyId)

  result[propertyStar] = result[propertyStar] || []
  if (propObj) result[propertyStar].push(propObj)
  return result
}

regulation.byBusinessModel = function() {

}


function attachRateDetails(rate, propertyId) {
  if (rate['total_promotion_rate']) {
    const propObj = {}
    _.forEach(['total_promotion_rate', 'total_rate', 'rooms_left', 'is_prepaid'], function(key) {
      if (rate[key]) propObj[key] = rate[key]
    })
    return propObj
  }
}

module.exports = regulation
