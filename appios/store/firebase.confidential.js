import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDdIxnMrAh96FkCVKQr4F9MMzYHRcTaSDM",
  authDomain: "funcommunity-7aa4a.firebaseapp.com",
  databaseURL: "https://funcommunity-7aa4a.firebaseio.com",
  projectId: "funcommunity-7aa4a",
  storageBucket: "funcommunity-7aa4a.appspot.com",
  messagingSenderId: "222878652248"
};
const app =  firebase.initializeApp(config);

export const auth = firebase.auth();

const database = app.database();

export const birthdayRef = database.ref('birthday');

export const expenditureRef = database.ref('expendature');

export const totalAmountRef = database.ref('totalAmount');

export const eventsRef = database.ref('events');

export const storageRef = firebase.storage();
