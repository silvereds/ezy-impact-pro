// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBuxlK86ZSG43R-5ZIP0Iu5q9uRLDYRVHg',
  authDomain: 'ezy-impact-pro.firebaseapp.com',
  projectId: 'ezy-impact-pro',
  storageBucket: 'ezy-impact-pro.appspot.com',
  messagingSenderId: '35653554564',
  appId: '1:35653554564:web:6867bac46bec0308ac4dd1',
  measurementId: 'G-CZH68ESWKJ'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
const db = getFirestore(app)
export default db
