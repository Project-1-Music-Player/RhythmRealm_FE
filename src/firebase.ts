import { initializeApp } from 'firebase/app'
import { getAuth, signInAnonymously, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyClRQZPhQa0DhmL8-vbqbrUGCY_4qHB7-s",
    authDomain: "rr-auth-467b4.firebaseapp.com",
    projectId: "rr-auth-467b4",
    storageBucket: "rr-auth-467b4.appspot.com",
    messagingSenderId: "1090069978845",
    appId: "1:1090069978845:web:f69c9f5aceac27eec20534",
    measurementId: "G-NXKVTQR1ZQ"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()

export { auth, googleProvider, signInAnonymously, signInWithPopup, signOut }