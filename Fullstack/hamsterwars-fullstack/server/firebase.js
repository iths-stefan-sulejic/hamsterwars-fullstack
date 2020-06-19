var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hamsterwars-ss.firebaseio.com"
});

let db = admin.firestore();

module.exports = {db}