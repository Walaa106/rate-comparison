const firebase = require('./firebase')
const config = require('../config/config')
const elasticsearch = require('./elasticsearch')
const fs = require('fs')
const rate = {}

/*
 * @ref: 7 days socket refernce.
 * Cach
 * returns: nothing
 */
rate.fetchAndCache = refs => {
  for (let refParams of refs) {
    firebase.fetch(refParams, function(propertiesRates) {
      const models = prepare(propertiesRates, refParams)
      elasticsearch.bulkCreate(models)
    })
  }
}

const prepare = (propertiesRates, refParams) => {
  const dates = extractDate(refParams)
  const resp = []
  if (propertiesRates != null) {
    Object.values(propertiesRates).map(propertyRate => {
      propertyRate.checkin_date = dates[1]
      propertyRate.checkout_date = dates[2]
      const esModel = constructESModel(propertyRate)
      resp.push(esModel.method)
      resp.push(esModel.doc)
    })
  }
  return resp
}

function constructESModel(data) {
  const method = {
    create: {
      _index: config.analytics.index,
      _type: config.analytics.type
    }
  }
  const doc = {
    doc: data
  }
  return { method, doc }
}

const extractDate = refParams => {
  const start = refParams.indexOf('Desktop') + 7
  const end = refParams.indexOf('adults_2')
  return refParams.substring(start, end).split('/')
}

module.exports = rate


// let data = JSON.stringify(models);
//       fs.writeFile('body.json', data, models, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//       });