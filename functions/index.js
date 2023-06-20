const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// https://console.firebase.google.com/project/pat-certificados/usage/details -> upgrade plan to blaze for enabling functions
// agregar admins: https://www.youtube.com/watch?v=VvcBqPua2DI&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ&index=19
exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add admin custom claim
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
  }).then(() => {
    return {
      message: `Success! ${data.email} has been made an admin.`
    }
  }).catch(err => {
    return err;
  });
});