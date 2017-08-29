const es = require('elasticsearch')
const config = require('../config/config')
const fs = require('fs')

const elasticsearch = {}

elasticsearch.get = (page, perPage) => {
  const client = new es.Client({
    host: config.elastic.host
  })
  return new Promise((fulfill, reject) => {
    client.search({
      "index": config.elastic.index,
      "type": config.elastic.type,
      "from": (page - 1),
      "size": perPage,
      "body": {
        "fields": ["en.name", "en.id", "en.stars", "en.longitude", "en.latitude"],
        "query": {
          "match": {
            "en.supplier_id": "1"
          }
        }
      }
    }, (err, resp) => {
      if (resp && resp.hits) fulfill(resp.hits)
      if (err) reject(err)
    })
  })
}

elasticsearch.bulkCreate = body => {
  const client = new es.Client({
      host: config.analytics.host
    })
  return new Promise((fulfill, reject) => {
    client.bulk({
      "body": body
    }, (err, resp) => {
      if (resp && !resp.errors) fulfill(resp.items)
      // console.log(err);
      // else reject(resp.errors)
    })
  })
}

function initIndex(client, name) {
  return client.indices.create({
    index: name
  })
}


function query(data) {
  return {
    index: config.elastic.index,
    type: config.elastic.type,
    size: 2000,
    body: data
  }
}

module.exports = elasticsearch