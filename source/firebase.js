const Q = require("q")
const moment = require('moment')
const request = require("request")
const config = require('../config/config')

const firebase = {}

function getSocketURL(cityId) {
  const deferred = Q.defer();
  const checkin_date = moment().format('MM/DD/YYYY')
  const checkout_date = moment().add(7, 'days').format('MM/DD/YYYY')
  const url = config.apiSearch + '?attraction_id=' + cityId + '&attraction_type=city&checkin_date=' + checkin_date + '&checkout_date=' + checkout_date + '&adults=2'
  request({
    url: url,
    method: 'GET',
    headers: {
      'User-Agent': 'request'
    }
  }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      deferred.resolve(info.socket_url)
    } else deferred.reject(error)
  })
  return deferred.promise
}

module.exports = firebase
