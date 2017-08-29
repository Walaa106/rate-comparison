const admin = require("firebase-admin")
const config = require('../config/config')
const serviceAccount = require("../config/yamsaferstaging-firebase.json")


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL
})

const EOF = {
  EOF: "EOF"
}

const firebase = {}

//- This is forEach city
firebase.fetch = (refParms, callback) => {
  const db = admin.database()
  const ref = db.ref(refParms)
  ref.once("value", snapshot => {
    callback(snapshot.val())
  })
}

module.exports = firebase