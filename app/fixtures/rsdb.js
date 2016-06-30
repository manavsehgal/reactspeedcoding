const firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

const config = {
  apiKey: 'AIzaSyDtcLk4CEcD9TgoU1Wa3zrJwSSTZxaAwj8',
  authDomain: 'reactspeed.firebaseapp.com',
  databaseURL: 'https://reactspeed.firebaseio.com',
  storageBucket: 'project-2919339734930458575.appspot.com'
};

firebase.initializeApp(config);

export const firebaseApp = firebase;
export const rsdb = firebaseApp.database();
