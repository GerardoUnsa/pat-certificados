import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import { getStorage } from  "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAgZOZPmGU4EggLdO-BzhewS4gGDKBPyLw",
    authDomain: "pat-certificados.firebaseapp.com",
    projectId: "pat-certificados",
    storageBucket: "pat-certificados.appspot.com",
    messagingSenderId: "242783449028",
    appId: "1:242783449028:web:9a860181016d03f58efe91",
    measurementId: "G-QMN4H8B0QE"
}

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
//export const googleProvider = new firebase.auth.GoogleAuthProvider()

export const db = fb.firestore()

export const storage = getStorage()