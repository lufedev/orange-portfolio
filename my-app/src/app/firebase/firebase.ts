import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBT3eaadZKwSw4q_99gq9msoxNFCJc9Sc4',
  authDomain: 'orange-portfolio-b7f67.firebaseapp.com',
  projectId: 'orange-portfolio-b7f67',
  storageBucket: 'orange-portfolio-b7f67.appspot.com',
  messagingSenderId: '158939880663',
  appId: '1:158939880663:web:249b949421dbc4d234a492',
  measurementId: 'G-TF6TH73JJH'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage()

export { storage, firebase as default }
