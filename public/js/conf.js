import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore,collection,getDocs,getDoc,serverTimestamp,addDoc,doc,updateDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, signOut, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBOJs8bQT1cc51sJarMvRJj8MCmSq8EIx8",
  authDomain: "write-your-blog.firebaseapp.com",
  projectId: "write-your-blog",
  storageBucket: "write-your-blog.appspot.com",
  messagingSenderId: "669654782515",
  appId: "1:669654782515:web:b870f890d7e7096ecb8946"
};

const app = initializeApp(firebaseConfig);

export const get_app = () => {
  return app
}

const db = getFirestore(app);
export const get_firestore = () => {
  return db
}







