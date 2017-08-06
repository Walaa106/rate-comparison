(async() => {

  const index = require('./source_1/index')

  //- Read all cities that we have local hotels.
  const cityIds = require('./source_1/city_ids.json')

  //- Read rates and availability in the search socket.
  for (const [key, cityId] of Object.entries(cityIds)) {
    if (cityId == 625) await index.fetchSocket(cityId)
  }

  process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error);
  })

})()