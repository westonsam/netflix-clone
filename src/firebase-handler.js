import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDFHBa-0PjwwtjFDirT4NYRIotY3IZYQuE",
    authDomain: "netflix-clone-3afbb.firebaseapp.com",
    projectId: "netflix-clone-3afbb",
    storageBucket: "netflix-clone-3afbb.appspot.com",
    messagingSenderId: "64813829301",
    appId: "1:64813829301:web:fe5f43c86c6031df0442fc"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;