const config = require('./firebase-api');
const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {
  getAllScreams,
  postOneScream,
  getScream
} = require('./handlers/screams');

const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser 
} = require('./handlers/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
// TODO:
// delete a scream
// like a scream
// unlike a scream
// comment on scream

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);



exports.api = functions.https.onRequest(app);