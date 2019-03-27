'use strict';

var firebaseAdmin = require('firebase-admin');
var firebaseServiceAccount = require('../firebase.json');

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

module.exports = cb => {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
    databaseURL: 'https://furnituremaker-eaafa.firebaseio.com'
  });

  const firebaseDb = firebaseAdmin.database();
  strapi.notificationRef = firebaseDb.refFromURL('https://furnituremaker-eaafa.firebaseio.com/notifications');

  cb();
};
