import firebase from 'firebase/app'
import firestore from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyD5MN6zixjgPMxZpwxWiTla_biVteo4OjI",
    authDomain: "ninja-smoothies-f1c9c.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-f1c9c.firebaseio.com",
    projectId: "ninja-smoothies-f1c9c",
    storageBucket: "ninja-smoothies-f1c9c.appspot.com",
    messagingSenderId: "25408079156",
    appId: "1:25408079156:web:430b4a7cfe716f5a165161",
    measurementId: "G-RK3KK19L7Q"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
 

  export default firebaseApp.firestore()
