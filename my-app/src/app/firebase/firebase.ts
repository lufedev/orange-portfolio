import firebase from 'firebase/compat/app'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCnv9JZbLmWUjWR3oR358c5qiX8Zgn5A-c',
  authDomain: 'orange-portfolio-2.firebaseapp.com',
  projectId: 'orange-portfolio-2',
  storageBucket: 'orange-portfolio-2.appspot.com',
  messagingSenderId: '213016075286',
  appId: '1:213016075286:web:3423757a8aae9a5c4c6937',
  measurementId: 'G-S890V52KZY'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const storage = firebase.storage()

export { storage, firebase as default }
