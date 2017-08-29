const algolia = require('./algolia')
const concerns = {}

//- Sart collecting nearby properties for local hotels.
concerns.aggregateSimilar = async localProperties => {
    const distictIds = []
    for (let [key, property] of Object.entries(localProperties)) {
      const ids = await algolia.getSimilarPropertyIds(property.fields)
      for (let [index, id] of Object.entries(ids)) {
          distictIds.push(id);
        }
    }
    return distictIds;
  }
  //- 42 seconds!

// const date = concerns.extractDate(refParams)
// property[date] = concerns.findRateByPropertyId(dailyPropertyRate, this.id)
// market[date] = concerns.calculateMean(dailyPropertyRate)

module.exports = concerns
