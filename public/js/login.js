import { get_app } from './conf.js'
import { getAuth, signOut, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const app = get_app();
const auth = getAuth(app);

let user_details = null

function userLoggedIn(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user signed in onAuthStateChanged')
      const uid = user.uid;
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      user_details = user
      window.location.href = "home.html";
    } else {
    }
  });
}

//check user already logged in
userLoggedIn()

// handle all button clicks
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click',  async (e) => {
  e.preventDefault();
  console.log('login button clciked')
  try{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = await signInWithEmailAndPassword(auth, email, password)
  }
  catch(e){
    console.log(e)
    alert("please check the email and password")
  }
});

const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click',  async (e) => {
  e.preventDefault();
  console.log('signup button clciked')
  try{
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const result = await createUserWithEmailAndPassword(auth, email, password)
  }
  catch(e){
    console.log(e)
    alert(e.message)
  }
});

const googleButton = document.getElementById('google-login');
googleButton.addEventListener('click',  async (e) => {
  e.preventDefault();
  console.log('google button clciked')
  auth.provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, auth.provider)
});