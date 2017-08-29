const algoliasearch = require('algoliasearch')
const config = require('../config/config')


const client = algoliasearch('1LOHEH518X', '5a6207da91846de9b11b2f583f7907b5')
const index = client.initIndex('suggestions')

const algolia = {}

algolia.getSimilarPropertyIds = (property) => {
  // const properties = await search(property) || []
  return search(property).then(properties => {
    return Object.values(properties).reduce((result, item) => {
      if (result != null) result.push(item['id'])
      return result
    }, [])
  })
}

const search = (property) => {
  property.stars = property['en.stars'][0]
  property.lat = property['en.latitude'][0]
  property.lng = property['en.longitude'][0]
  return new Promise((fulfill, reject) => {
    index.search({
      filters: `type: Property AND locale:en AND info.stars=${property.stars}`,
      aroundLatLng: `${property.lat}, ${property.lng}`,
      distinct: true
    }, (err, content) => {
      if (err) reject(err)
      if (content && content.hits) fulfill(content.hits)
    })
  })
}

module.exports = algolia