import * as firebase from "firebase"

// const APP_ID = '4be3b34a';
// const APP_KEY = 'e82c68364b5d4bd764671579a769cd1f';
// const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`; //temp literal for js and html mix
var firebaseConfig = {
    apiKey: "AIzaSyDCobGROsycKnXaDMOW21Vwyp_ioUEIMRg",
    authDomain: "reactinveon.firebaseapp.com",
    databaseURL: "https://reactinveon.firebaseio.com/",
    projectId: "reactinveon",
    storageBucket: "reactinveon.appspot.com",
    messagingSenderId: "686591342305",
    appId: "1:686591342305:web:3c6d89c5dae8d0a9f0a9a0",
    measurementId: "G-2NZFE4GRV0"
  };
  
 export default firebase.initializeApp(firebaseConfig);
 