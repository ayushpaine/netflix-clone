// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAW_MKTIlFl6wgxk5plHrzswNfcnCK-9ho",
    authDomain: "netflix-clone-b41e4.firebaseapp.com",
    projectId: "netflix-clone-b41e4",
    storageBucket: "netflix-clone-b41e4.appspot.com",
    messagingSenderId: "317813830960",
    appId: "1:317813830960:web:c0b0f7bb3a37cb9b7544f5",
    measurementId: "G-H5QZ1962WB"
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }
