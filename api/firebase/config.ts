// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDkdJELCpiiuUU5OsVBRaX5foQgBNmyXoo',
  authDomain: 'new-facebook-ace12.firebaseapp.com',
  projectId: 'new-facebook-ace12',
  storageBucket: 'new-facebook-ace12.appspot.com',
  messagingSenderId: '382028371434',
  appId: '1:382028371434:web:88baec42c83c0ef03e0e93',
  measurementId: 'G-ZPC15XSNJQ',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

const projectStorage = getStorage(app)
const db = getFirestore(app)

export { projectStorage }
export { db }
