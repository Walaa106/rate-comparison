(async() => {
  const _ = require('lodash')
  const rate = require('./app/rate')
  const search = require('./app/search')
  const concerns = require('./app/concerns')
  const elasticsearch = require('./app/elasticsearch')

  //- Fetching from elasticsearch
  let page = 1, perPage = 1000, total = 6000;
  let condition = (page * perPage) < total

  while (condition) {
    const localProperties = await elasticsearch.get(page, perPage)
    const distictIds = await concerns.aggregateSimilar(localProperties.hits)
    // - get request from firebase
    const dailyRefs = await search.getDailySockets(distictIds)
    rate.fetchAndCache(dailyRefs)

    // - pagination configs
    page = page + 1
    if (Math.sign(localProperties.total - perPage)  == -1) break
    total = localProperties.total
    condition = (page * ( total - perPage)) < total
  }

  process.exit(1)

})()

//- 1 minute and 8 seconds!
