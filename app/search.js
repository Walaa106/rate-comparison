const axios = require("axios")
const moment = require("moment")
const config = require('../config/config')

const search = {}

/*
 * get ids: list of property ids'
 * return List of socket urls for each date
 */
search.getDailySockets = async ids => {
  let days = 0
  const searchRequests = []

  //- dates issue
  while (days < 7) {
    const checkinDate = moment().add(days, 'days').format('MM/DD/YYYY')
    days = days + 1
    const checkoutDate = moment().add(days, 'days').format('MM/DD/YYYY')
    const body = buildParams(ids, checkinDate, checkoutDate)
    const dayUrl = config.api.url + 'api/v3/search'
    searchRequests.push(postRequest(dayUrl, body))
  }
  return await getSocketUrls(searchRequests)
}

function buildParams(ids, checkinDate, checkoutDate) {

  return {
    attraction_id: ids.join(),
    attraction_type: 'property',
    checkin_date: checkinDate,
    checkout_date: checkoutDate,
    adults: 2
  }
}

function postRequest(url, body) {
  //headers: {'User-Agent': 'Chrome/59.0.3071.115'},
  return axios.post(url, body)
}

/*
 ** Input: @array list of axios promis requests
 ** Output: Socket url
 */
function getSocketUrls(requests) {
  return axios.all(requests).then(axios.spread((...theArgs) => {
    return theArgs.map(element => {
      // substrin purpose: to get firebase reference part of socket url to read data from.
      return element.data.socket_url.substring(config.databaseURL.length)
    });
  })).catch(function(error) {
    console.log('Get socket url from API error:', error);
  })
}

module.exports = search
