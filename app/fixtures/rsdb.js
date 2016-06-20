const firebase = require('firebase/app');
require('firebase/database');

const initRsdb = () => {
  if (!initRsdb) {
    const config = {
      apiKey: 'AIzaSyDtcLk4CEcD9TgoU1Wa3zrJwSSTZxaAwj8',
      authDomain: 'reactspeed.firebaseapp.com',
      databaseURL: 'https://reactspeed.firebaseio.com',
      storageBucket: 'project-2919339734930458575.appspot.com'
    };
    firebase.initializeApp(config);
    return firebase.database();
  }
  return initRsdb;
};

export default initRsdb;
