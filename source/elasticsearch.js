const es = require('elasticsearch')
const config = require('../config/config')

const elasticsearch = {}

function getQuery(cityId) {
  return {
    "match": {
      "en.city_id": cityId
    }
  }
}

elasticsearch.getProperties = (cityId) => {
  let res = {}
  const client = new es.Client({
    host: config.elastic.host
  })

  return client.search({
    index: 'properties',
    type: 'property',
    fields: ["en.name", "en.id"],
    query: getQuery(cityId)
  }).then((body) => {
    const hits = body.hits.hits
    return hits
  }, function(error) {
    console.trace(error.message)
    return error.message
  })
}

module.exports = elasticsearch
