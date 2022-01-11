const firebase = require('firebase-admin');
const serviceFile = require('./serviceFile.json');

firebase.initializeApp({
    credential: firebase.credential.cert(serviceFile)
});

const database = firebase.firestore();
const auth = firebase.auth();

module.exports = { database, auth };