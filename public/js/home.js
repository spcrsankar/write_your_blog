import { get_app, get_firestore } from './conf.js'
import { getAuth, signOut, onAuthStateChanged, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import { collection,getDocs,getDoc,serverTimestamp,addDoc,where,query, orderBy } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
const app = get_app();
const auth = getAuth(app);
const firestore = get_firestore();
auth.provider = new GoogleAuthProvider();
const colRef = collection(firestore, 'blogs');

let blogPosts = []
let user_details = null




//logout
document.querySelector('#signout-btn').addEventListener('click', (e) => {
  signOut(auth)
  .then(() => {
    console.log('signed out')
    window.location.href = "index.html";
  })  
});


//check if user logged in 
function userLoggedIn(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user signed in onAuthStateChanged')
      user_details = user

      getBlogPosts();

    } else {
      window.location.href = "index.html";

    }
  });
}

//get all the blogs posts from firestore and call display
async function getBlogPosts(){
  const q = query(colRef, orderBy("created_at", "desc"));
  console.log('query')
  console.log(q)
  const querySnapshot = await getDocs(q);
  blogPosts = []  
  querySnapshot.docs.forEach((doc) => {
    blogPosts.push({...doc.data(), created_at:formateDate(doc.data().created_at.seconds), id:doc.id})
    console.log('one doc')
    formateDate()
    console.log({...doc.data(),created_at:formateDate(doc.data().created_at.seconds),id:doc.id});
  });

  displayBlogPosts()
}

//to show all posts
document.querySelector("#show-all-btn").addEventListener('click', async(e) => {
  e.preventDefault();
  getBlogPosts()
  document.querySelector("#show-all-btn").classList.add('active')
  document.querySelector("#show-my-btn").classList.remove('active')
});

// Function to display blog posts with user and date
function displayBlogPosts() {
  const blogContainer = document.getElementById('blog-container');
  blogContainer.innerHTML = '';

  blogPosts.forEach((post, index) => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('blog-post'); 
      postDiv.innerHTML = `
          <h3>${post.title}</h3>
          <span>Posted by ${post.created_by_name} on ${post.created_at}</span>
          <p>${post.content}</p>
          
      `;
      blogContainer.appendChild(postDiv);

  });
}


// Functions to add a new blog post
async function addBlogPost(title, content) {
  console.log('add blog post')
  
  let post = {
    title,
    content,
    created_at : serverTimestamp(),
    created_by_name:user_details.displayName,
    created_by:user_details.uid,
    created_by_email:user_details.email,
    created_by_photo:user_details.photoURL
  }
  let new_doc = await addDoc(colRef, post)
  console.log(new_doc)
  getBlogPosts();
}

document.querySelector('#add-blog-button').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('add blog button clicked')
 
  const titleInput = document.getElementById('post-title');
  const contentTextarea = document.getElementById('post-content');

  const title = titleInput.value;
  const content = contentTextarea.value;

  addBlogPost(title, content);
});


//to show current users posts
document.querySelector("#show-my-btn").addEventListener('click', async(e) => {
  e.preventDefault();
  document.querySelector("#show-all-btn").classList.remove('active')
  document.querySelector("#show-my-btn").classList.add('active')
  const q = query(colRef, where("created_by", "==", user_details.uid));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs[0])
  blogPosts = querySnapshot.docs.map((doc) => {
    return {...doc.data(), created_at:formateDate(doc.data().created_at.seconds), id:doc.id}
  });
  console.log(blogPosts)
  displayBlogPosts()
});



function formateDate(timestamp){
  //seconds to milliseconds
  timestamp *= 1000;
  
  const date = new Date(timestamp);

  // Extract date components (year, month, day, etc.)
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month since it's zero-based
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  // Format the date as a string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(formattedDate); 
  return formattedDate
}


//check if user logged in or not if not redirect to login page else get blog posts
userLoggedIn()


