const functions = require('firebase-functions');
const admin = require('firebase-admin');
var firebase = require("firebase");

const express = require('express');
const engines = require('consolidate');

// var serviceAccount = require('../servicesKey.json');

var config = {
    credential: admin.credential.applicationDefault(),
    apiKey: "AIzaSyDuDRGtm9kq55JrNIYFv6BotGdDuStZTw4",
    authDomain: "test-4cdf0.firebaseapp.com",
    databaseURL: "https://test-4cdf0.firebaseio.com",
    projectId: "test-4cdf0",
    storageBucket: "test-4cdf0.appspot.com",
    messagingSenderId: "281387649529"
  };

var firebaseApp = admin.initializeApp(config);

function getDocs(){
    const db = admin.firestore();
    var ref = db.collection('docs').doc('text');
    return ref.onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${docSnapshot}`);
        // ...
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
}

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');


app.get('/time',(request,response) => {
    //response.set('Cache-Control','public, max-age=300, s-maxage=600');
    // getDocs().then(docs => {
        var data = admin.firestore().collection('docs').get();
        //response.render('index',data);
        response.render('index',{data});
        console.log(data);
    // });
    
    // getDocs();
    
});

exports.app = functions.https.onRequest(app);

