import firebase from 'firebase'
var config = {
    apiKey: "AIzaSyAVrzB4C0p7wxP42WdQvTZynMFrSsIGZTw",
    authDomain: "treasurehunt-cfac1.firebaseapp.com",
    databaseURL: "https://treasurehunt-cfac1.firebaseio.com",
    projectId: "treasurehunt-cfac1",
    storageBucket: "treasurehunt-cfac1.appspot.com",
    messagingSenderId: "416955421305"
};
var fire = firebase.initializeApp(config);
export default fire;
