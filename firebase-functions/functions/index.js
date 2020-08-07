const config = require('./firebase-api');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

const serviceAccount = require('./admin.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://screams-social-app.firebaseio.com",
});

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/screams', (req, res) => {
  admin
    .firestore()
    .collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt
        });
      });
      return res.json(screams);
    })
    .catch(err => console.error(err));
});

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    // createdAt: admin.firestore.Timestamp.fromDate(new Date()) firebase date
    createdAt: new Date().toISOString()
  };

  admin.firestore()
    .collection('screams')
    .add(newScream)
    .then(doc => {
      res.json({ message: `document ${doc.id} created successfully!` });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
      console.error(err);
    });
});

// Signup route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  // TODO valdiate data

  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      return res.status(201).json({ message: `user ${data.user.uid} signed up successfully`});
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code, message: err.message });
    })
});

exports.api = functions.https.onRequest(app);