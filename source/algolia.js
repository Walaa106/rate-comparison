const Promise = require("promise")
const algoliasearch = require('algoliasearch')
const config = require('../config/config')


const client = algoliasearch('1LOHEH518X', '5a6207da91846de9b11b2f583f7907b5')
const index = client.initIndex('suggestions')

const algolia = {}

algolia.getPropertyStar = function (propertyId) {
  return new Promise(function(fulfill, reject) {
    index.search({
      filters: 'type:Property AND id = ' + propertyId
    }, function(err, content) {
      if (err) reject(err);
      const property = content.hits
      if (property && property[0]) fulfill(property[0].info.stars)
      fulfill(0)
    })
  })
}

module.exports = algolia