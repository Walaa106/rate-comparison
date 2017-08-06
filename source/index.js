
const admin = require("firebase-admin")
const config = require('../config/config')
const serviceAccount = require("../config/yamsaferstaging-firebase.json")

const helper = require('./helper')
const algolia = require('./algolia')
const firebase = require('./firebase')
const regulation = require('./regulation')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
})

const index = {}

//- This is forEach city
index.fetchSocket = async(cityId) => {
  const socketURL = await firebase.getSocketURL(cityId)
  //- Get part of socket url to read data from.
  const refParms = socketURL.substring(config.databaseURL.length)
  const db = admin.database()
  const ref = db.ref(refParms)
  //- Categorize hotels by stars.
  const response = {}

  await ref.once("value", async(snapshot) => {
    const rates = snapshot.val()
    //- calssify properties by star
    for (const [key, rate] of Object.entries(rates)) {
      if (rate.hotel_id) await regulation.byStar(rate, response)
    }

    helper.calculateMean(response)
    return response
  })
}


module.exports = index
